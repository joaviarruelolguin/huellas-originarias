import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular';
import type { Period } from '../../models/models';

/**
 * Línea de tiempo con pasos discretos (momentos históricos).
 * No permite avanzar los años que uno quiera: solo los períodos predefinidos.
 */
@Component({
  selector: 'app-timeline',
  templateUrl: 'timeline.component.html',
  styleUrls: ['timeline.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon],
})
export class TimelineComponent {
  @Input() periods: Period[] = [];
  @Input() currentIndex = 0;
  @Output() periodChange = new EventEmitter<number>();

  get current(): Period | undefined {
    return this.periods[this.currentIndex];
  }

  goTo(index: number): void {
    if (index >= 0 && index < this.periods.length) {
      this.periodChange.emit(index);
    }
  }

  next(): void {
    this.goTo(this.currentIndex + 1);
  }

  prev(): void {
    this.goTo(this.currentIndex - 1);
  }
}
