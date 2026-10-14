import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular';
import type { Community } from '../../models/models';

/**
 * Leyenda de comunidades presentes en el período activo.
 * Muestra el color y el nombre de cada una.
 */
@Component({
  selector: 'app-legend',
  templateUrl: 'legend.component.html',
  styleUrls: ['legend.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon],
})
export class LegendComponent {
  @Input() communities: Community[] = [];

  readonly open = signal(false);

  toggle(): void {
    this.open.update((v) => !v);
  }
}
