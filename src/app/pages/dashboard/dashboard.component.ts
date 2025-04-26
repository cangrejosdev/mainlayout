// pages/dashboard/dashboard.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="space-y-6">
      <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 transition-colors duration-300">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">Dashboard</h1>
        <p class="text-gray-600 dark:text-gray-300">
          Vista general Usuarios y Reportes.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        @for (stat of stats; track stat.label) {
          <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 transition-colors duration-300">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ stat.label }}</p>
            <p class="text-2xl font-semibold text-gray-800 dark:text-white">{{ stat.value }}</p>
            <div class="flex items-center mt-2">
              <span [class]="stat.isUp ? 'text-green-500' : 'text-red-500'">
                {{ stat.isUp ? '+' : '-' }}{{ stat.change }}%
              </span>
              <span class="text-gray-500 dark:text-gray-400 text-sm ml-2">Usuarios en Sistema</span>
            </div>
          </div>
        }
      </div>

      <!-- <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 transition-colors duration-300">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">Reportes</h2>
        <div class="space-y-4">
          @for (item of activities; track item.id) {
            <div class="flex items-start space-x-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300">
              <div class="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-500 dark:text-blue-300">
                {{ item.user.substring(0, 2).toUpperCase() }}
              </div>
              <div>
                <p class="text-gray-800 dark:text-white font-medium">{{ item.action }}</p>
                <p class="text-gray-500 dark:text-gray-400 text-sm">{{ item.timestamp }}</p>
              </div>
            </div>
          }
        </div>
      </div> -->
    </div>
  `
})
export class DashboardComponent {
  stats = [
    { label: 'Ingresos Totales', value: '$25,650', change: '10.2', isUp: true },
    { label: 'Usuarios Nuevos', value: '1,240', change: '12.5', isUp: true },
    { label: 'Tasa de Conversión', value: '4.6%', change: '0.5', isUp: false },
    { label: 'Tiempo Promedio', value: '2m 36s', change: '8.1', isUp: true }
  ];

  activities = [
    { id: 1, user: 'Juan Pérez', action: 'Actualizó perfil de usuario', timestamp: 'Hace 5 minutos' },
    { id: 2, user: 'María López', action: 'Completó un nuevo pedido', timestamp: 'Hace 15 minutos' },
    { id: 3, user: 'Carlos Rodríguez', action: 'Envió un mensaje', timestamp: 'Hace 30 minutos' },
    { id: 4, user: 'Ana Martínez', action: 'Subió un nuevo documento', timestamp: 'Hace 45 minutos' }
  ];
}
