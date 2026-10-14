import { Component, OnDestroy, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonFab, IonFabButton, IonIcon, ModalController } from '@ionic/angular';
import { MapComponent } from '../../components/map/map.component';
import { TimelineComponent } from '../../components/timeline/timeline.component';
import { CommunityModalComponent } from '../../components/community-modal/community-modal.component';
import { WelcomeComponent } from '../../components/welcome/welcome.component';
import { LegendComponent } from '../../components/legend/legend.component';
import { COMMUNITIES } from '../../data/communities';
import { PERIODS } from '../../data/periods';
import type { Community } from '../../models/models';

/**
 * Pantalla principal: bienvenida → mapa de Argentina con las manchas
 * de las comunidades, línea de tiempo de momentos históricos,
 * modal de detalle y geolocalización.
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon,
    MapComponent,
    TimelineComponent,
    CommunityModalComponent,
    WelcomeComponent,
    LegendComponent,
  ],
})
export class HomePage implements OnDestroy {
  private readonly modalCtrl = inject(ModalController);

  @ViewChild(MapComponent)
  mapComponent?: MapComponent;

  readonly communities = COMMUNITIES;
  readonly periods = PERIODS;
  readonly currentIndex = signal(0);
  readonly showWelcome = signal(true);
  /** IDs de comunidades seleccionadas en el filtro. */
  readonly selectedIds = signal<string[]>([]);

  private modal: HTMLIonModalElement | null = null;

  get currentPeriod() {
    return this.periods[this.currentIndex()];
  }

  /** Comunidades con datos en el período activo Y seleccionadas en el filtro. */
  get activeCommunities() {
    const periodId = this.currentPeriod.id;
    const selected = this.selectedIds();
    return this.communities.filter((c) => c.periods[periodId] && selected.includes(c.id));
  }

  enter(): void {
    this.showWelcome.set(false);
  }

  onPeriodChange(index: number): void {
    this.currentIndex.set(index);
  }

  async onTerritoryClick(community: Community): Promise<void> {
    this.modal = await this.modalCtrl.create({
      component: CommunityModalComponent,
      componentProps: {
        community,
        period: this.currentPeriod,
        activePeriodId: this.currentPeriod.id,
      },
    });
    await this.modal.present();
  }

  onSelectionChange(ids: string[]): void {
    this.selectedIds.set(ids);
  }

  locate(): void {
    this.mapComponent?.locate();
  }

  ngOnDestroy(): void {
    void this.modal?.dismiss();
    this.modal = null;
  }
}
