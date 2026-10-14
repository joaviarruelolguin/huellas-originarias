import { Component, EventEmitter, Input, Output, signal, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular';
import type { Community } from '../../models/models';

/**
 * Panel de filtros: permite mostrar/ocultar comunidades en el mapa.
 * Emite los IDs seleccionados al padre. El padre controla la inicialización.
 */
@Component({
  selector: 'app-legend',
  templateUrl: 'legend.component.html',
  styleUrls: ['legend.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon],
})
export class LegendComponent implements OnChanges {
  @Input() communities: Community[] = [];
  @Input() initialSelection: string[] = [];
  @Output() selectionChange = new EventEmitter<string[]>();

  readonly open = signal(false);
  readonly selected = signal<string[]>([]);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialSelection'] && changes['initialSelection'].currentValue) {
      this.selected.set([...changes['initialSelection'].currentValue]);
    }
  }

  toggle(): void {
    this.open.update((v) => !v);
  }

  isSelected(id: string): boolean {
    return this.selected().includes(id);
  }

  toggleCommunity(id: string): void {
    const current = this.selected();
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id];
    this.selected.set(next);
    this.selectionChange.emit([...next]);
  }

  selectAll(): void {
    const all = this.communities.map((c) => c.id);
    this.selected.set([...all]);
    this.selectionChange.emit([...all]);
  }

  clearAll(): void {
    this.selected.set([]);
    this.selectionChange.emit([]);
  }

  private arraysEqual(a: string[], b: string[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((v, i) => v === b[i]);
  }
}