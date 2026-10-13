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
import type { Feature, FeatureCollection } from 'geojson';
import type { Community } from '../../models/models';

/**
 * Mapa de Argentina con las manchas de territorio de las comunidades
 * para el período activo, más la geolocalización del usuario.
 */
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
      zoomControl: false,
      minZoom: 3,
      // Limitar el mapa a Argentina (con un margen)
      maxBounds: [
        [-58, -78],
        [-19, -50],
      ],
      maxBoundsViscosity: 1.0,
    });
    this.map.setView([-38.5, -63.5], 5);

    // Esri World Street Map (base) + capa de etiquetas
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 20,
        attribution:
          'Tiles &copy; <a href="https://www.esri.com/">Esri</a> &mdash; Esri, HERE, Garmin, (c) OpenStreetMap contributors, and the GIS user community',
      }
    ).addTo(this.map);

    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}?f=png',
      { maxZoom: 20, attribution: '' }
    ).addTo(this.map);

    L.control.zoom({ position: 'bottomright' }).addTo(this.map);

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
        const data = c.periods[this.activePeriod];
        return {
          ...data.territory,
          properties: { ...(data.territory.properties ?? {}), communityId: c.id },
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
