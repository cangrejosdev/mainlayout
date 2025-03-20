// pages/about/about.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 transition-colors duration-300">
      <h1 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">Acerca de</h1>
      <p class="text-gray-600 dark:text-gray-300 mb-4">
        Esta aplicación de ejemplo fue creada con Angular 19 y Tailwind CSS para demostrar las últimas características
        y sintaxis moderna de Angular, incluyendo:
      </p>

      <div class="space-y-4 mb-6">
        <div class="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Componentes Standalone</h2>
          <p class="text-gray-600 dark:text-gray-300">
            Todos los componentes son standalone, aprovechando la última arquitectura recomendada de Angular.
          </p>
        </div>

        <div class="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Control de flujo</h2>
          <p class="text-gray-600 dark:text-gray-300">
            Utilizando las nuevas directivas de control de flujo en lugar de las directivas estructurales tradicionales.
          </p>
        </div>

        <div class="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Signals y efectos</h2>
          <p class="text-gray-600 dark:text-gray-300">
            Implementación del nuevo sistema reactivo de Angular con signals para gestionar el estado de la aplicación.
          </p>
        </div>

        <div class="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Tailwind CSS con modo oscuro</h2>
          <p class="text-gray-600 dark:text-gray-300">
            Diseño completamente responsivo con soporte para modo oscuro utilizando Tailwind CSS.
          </p>
        </div>
      </div>

     `
    })
export class AboutComponent {

}
