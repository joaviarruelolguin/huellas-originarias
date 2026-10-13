import { provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { PreloadAllModules, RouteReuseStrategy, provideRouter, withPreloading } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  arrowBack,
  book,
  calendar,
  chevronBack,
  chevronForward,
  close,
  colorPalette,
  documentText,
  earth,
  flag,
  image,
  informationCircle,
  layers,
  leaf,
  locate,
  map,
  navigate,
  pause,
  people,
  play,
  time,
} from 'ionicons/icons';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

// Ionic 9: los íconos deben registrarse explícitamente
addIcons({
  arrowBack,
  book,
  calendar,
  chevronBack,
  chevronForward,
  close,
  colorPalette,
  documentText,
  earth,
  flag,
  image,
  informationCircle,
  layers,
  leaf,
  locate,
  map,
  navigate,
  pause,
  people,
  play,
  time,
});

bootstrapApplication(AppComponent, {
  providers: [
    // Zoneless: sin zone.js, con señales (@signals)
    provideZonelessChangeDetection(),
    // Ionic 9 (API standalone, look iOS en vez de Material)
    provideIonicAngular({ mode: 'ios' }),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
}).catch((err) => console.error(err));
