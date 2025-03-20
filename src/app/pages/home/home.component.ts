
// pages/home/home.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 transition-colors duration-300">
      <h1 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">Bienvenido a nuestra aplicación</h1>
      <p class="text-gray-600 dark:text-gray-300 mb-4">
        Esta es una aplicación de ejemplo creada con Angular 19 y Tailwind CSS.
        Incluye un modo oscuro responsivo, una barra de navegación y un sidebar funcional.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        @for (i of [1, 2, 3]; track i) {
          <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-300">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Característica {{ i }}</h2>
            <p class="text-gray-600 dark:text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
            </p>
          </div>
        }
      </div>
    </div>
  `
})
export class HomeComponent {}
