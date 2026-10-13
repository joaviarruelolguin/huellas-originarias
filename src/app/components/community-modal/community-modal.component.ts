import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonToolbar,
  ModalController,
} from '@ionic/angular';
import type { Community, Period } from '../../models/models';

/**
 * Modal con la ficha de una comunidad en un momento histórico.
 * Se abre al tocar una mancha del mapa.
 */
@Component({
  selector: 'app-community-modal',
  templateUrl: 'community-modal.component.html',
  styleUrls: ['community-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonToolbar],
})
export class CommunityModalComponent {
  @Input() community?: Community;
  @Input() period?: Period;
  @Input() activePeriodId = '';

  private readonly modalCtrl = inject(ModalController);

  get data() {
    return this.community?.periods[this.activePeriodId];
  }

  dismiss(): void {
    void this.modalCtrl.dismiss();
  }
}
