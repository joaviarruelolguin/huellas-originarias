import { Component, EventEmitter, Output } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular';

/** Pantalla de bienvenida antes de entrar al mapa. */
@Component({
  selector: 'app-welcome',
  templateUrl: 'welcome.component.html',
  styleUrls: ['welcome.component.scss'],
  standalone: true,
  imports: [IonButton, IonIcon],
})
export class WelcomeComponent {
  @Output() enter = new EventEmitter<void>();

  start(): void {
    this.enter.emit();
  }
}
