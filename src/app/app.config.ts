// app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';



export const appConfig: ApplicationConfig = {
  providers: [

    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch()),
    provideZoneChangeDetection(),
    provideAnimationsAsync(),]

};
