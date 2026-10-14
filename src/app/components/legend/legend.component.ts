import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular';
import type { Community } from '../../models/models';

/**
 * Panel de filtros: permite mostrar/ocultar comunidades en el mapa.
 * Emite los IDs seleccionados al padre.
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
  @Output() selectionChange = new EventEmitter<string[]>();

  readonly open = signal(false);
  readonly selected = signal<string[]>([]);

  ngOnChanges(): void {
    // Al cambiar de período, si hay comunidades nuevas, se seleccionan todas por defecto
    if (this.communities.length > 0) {
      const allIds = this.communities.map((c) => c.id);
      if (!this.arraysEqual(this.selected(), allIds)) {
        this.selected.set([...allIds]);
        this.selectionChange.emit([...allIds]);
      }
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