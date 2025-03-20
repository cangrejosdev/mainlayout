// pages/profile/profile.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  template: `
    <div class="space-y-6">
      <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition-colors duration-300">
        <div class="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <div class="p-6">
          <div class="flex flex-col md:flex-row items-center md:items-start">
            <div class="w-24 h-24 rounded-full bg-white dark:bg-gray-700 border-4 border-white dark:border-gray-700 -mt-12 overflow-hidden mb-4 md:mb-0">
              <div class="w-full h-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                <span class="text-gray-700 dark:text-gray-200 font-bold text-xl">JD</span>
              </div>
            </div>
            <div class="md:ml-4 text-center md:text-left">
              <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Juan Doe</h1>
              <p class="text-gray-600 dark:text-gray-300">Frontend Developer</p>
              <div class="flex justify-center md:justify-start space-x-2 mt-2">
                <span class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded">Angular</span>
                <span class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded">Tailwind</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 transition-colors duration-300">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">Información Personal</h2>
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Nombre Completo</label>
                <p class="text-gray-800 dark:text-white">Juan Doe</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</label>
                <p class="text-gray-800 dark:text-white">juan.doeexample.com</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Teléfono</label>
                <p class="text-gray-800 dark:text-white">+34 612 345 678</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Ubicación</label>
                <p class="text-gray-800 dark:text-white">Madrid, España</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 transition-colors duration-300">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">Cuenta</h2>
          <div class="space-y-4">
            <a href="#" class="block w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-center">
              Editar Perfil
            </a>
            <a href="#" class="block w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-center">
              Cambiar Contraseña
            </a>
            <a href="#" class="block w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-center">
              Notificaciones
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProfileComponent {}
