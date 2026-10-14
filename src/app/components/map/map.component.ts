import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as L from 'leaflet';
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import type { Community } from '../../models/models';
import { smoothRing } from '../../utils/geo';

/**
 * Mapa de Argentina con las manchas de territorio de las comunidades
 * para el período activo, más la geolocalización del usuario.
 *
 * Usa como capa base el SVG "Argentina location map.svg" de Wikimedia
 * Commons (dominio público / GFDL / CC-BA-SA), en proyección
 * equirectangular con estiramiento N/S del 115%.
 */

// Límites geográficos del mapa base (Wikimedia Commons):
// N 21.0°S, S 56.5°S, W 76.5°W, E 52.5°W
const MAP_BOUNDS = L.latLngBounds(
  [-56.5, -76.5], // sudoeste
  [-21.0, -52.5] // noreste
);

// Proyección equirectangular con estiramiento N/S del 115% (igual que el SVG).
const StretchedLonLat = L.extend({}, L.Projection.LonLat, {
  project: function (latlng: L.LatLng) {
    return new L.Point(latlng.lng, -latlng.lat * 1.15);
  },
  unproject: function (point: L.Point) {
    return new L.LatLng(-point.y / 1.15, point.x);
  },
});

// CRS personalizado basado en CRS.Simple, con la proyección estirada.
const ArgentinaCRS = L.extend({}, L.CRS.Simple, {
  projection: StretchedLonLat,
  transformation: new L.Transformation(1, 0, 1, 0),
});

@Component({
  selector: 'app-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.scss'],
  standalone: true,
})
export class MapComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() communities: Community[] = [];
  @Input() activePeriod = '';
  @Output() territoryClick = new EventEmitter<Community>();

  @ViewChild('mapCanvas', { static: true }) canvasEl!: ElementRef<HTMLElement>;

  private map: L.Map | null = null;
  private territories: L.GeoJSON | null = null;
  private resizeObserver?: ResizeObserver;

  ngAfterViewInit(): void {
    this.map = L.map(this.canvasEl.nativeElement, {
      crs: ArgentinaCRS,
      zoomControl: false,
      minZoom: 3,
      maxZoom: 12,
      // Limitar el desplazamiento al territorio del mapa base
      maxBounds: L.latLngBounds(
        [-60, -80],
        [-18, -50]
      ),
      maxBoundsViscosity: 1.0,
      attributionControl: false, // sin el badge "Leaflet" por defecto
    });

    // Atribución propia (el mapa base es CC BY-SA: hay que atribuir al autor)
    L.control.attribution({ prefix: false }).addTo(this.map);

    // Capa base: SVG vectorial de Argentina (nítido a cualquier zoom)
    L.imageOverlay('assets/maps/argentina-location-map.svg', MAP_BOUNDS, {
      opacity: 1,
      interactive: false,
      attribution: 'Mapa: NordNordWest / Wikimedia Commons (CC BY-SA 3.0)',
    }).addTo(this.map);

    L.control.zoom({ position: 'bottomright' }).addTo(this.map);

    // Encajar la vista a todo el territorio
    this.map.fitBounds(MAP_BOUNDS, { padding: [30, 30] });

    this.renderTerritories();

    // Ionic anima la entrada de la página: forzamos recálculo de tamaño
    setTimeout(() => this.invalidateSize(), 0);
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.invalidateSize());
      this.resizeObserver.observe(this.canvasEl.nativeElement);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['communities'] || changes['activePeriod']) && this.map) {
      this.renderTerritories();
    }
  }

  /** Geolocalización del navegador (en el APK se reemplaza por @capacitor/geolocation). */
  locate(): void {
    this.map?.locate({ setView: true, maxZoom: 16 });
  }

  private renderTerritories(): void {
    if (!this.map) {
      return;
    }
    if (this.territories) {
      this.map.removeLayer(this.territories);
      this.territories = null;
    }

    const features: Feature[] = this.communities
      .filter((c) => c.periods[this.activePeriod])
      .map((c) => {
        const geom = c.periods[this.activePeriod].territory.geometry;
        let geometry: Geometry;
        if (geom.type === 'Polygon') {
          geometry = {
            type: 'Polygon',
            coordinates: geom.coordinates.map((ring) => smoothRing(ring, 3)),
          };
        } else if (geom.type === 'MultiPolygon') {
          geometry = {
            type: 'MultiPolygon',
            coordinates: geom.coordinates.map((poly) =>
              poly.map((ring) => smoothRing(ring, 3))
            ),
          };
        } else {
          geometry = geom;
        }
        return {
          type: 'Feature',
          properties: { communityId: c.id },
          geometry,
        } as Feature;
      });

    if (features.length === 0) {
      return;
    }

    const collection: FeatureCollection = { type: 'FeatureCollection', features };

    this.territories = L.geoJSON(collection, {
      style: (feature) => {
        const c = this.communities.find((x) => x.id === feature?.properties?.['communityId']);
        return {
          fillColor: c?.color ?? '#888',
          fillOpacity: 0.45,
          color: c?.color ?? '#888',
          weight: 2,
          opacity: 0.9,
        };
      },
      onEachFeature: (feature, layer) => {
        layer.on('click', () => {
          const id = (feature.properties as Record<string, string>)?.['communityId'];
          const c = this.communities.find((x) => x.id === id);
          if (c) {
            this.territoryClick.emit(c);
          }
        });
      },
    }).addTo(this.map);
  }

  private invalidateSize(): void {
    this.map?.invalidateSize({ pan: false });
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.map?.remove();
    this.map = null;
  }
}
