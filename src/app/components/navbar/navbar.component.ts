// components/navbar/navbar.component.ts
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ThemeToggleComponent],
  template: `
    <nav class="bg-orange-400 dark:bg-gray-800 shadow-md transition-colors duration-300">
      <div class="px-4 h-16 flex items-center justify-between">
        <!-- Mobile menu button -->
        <button
          (click)="toggleSidebar.emit()"
          class="text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white focus:outline-none md:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <!-- Logo -->
        <div class="flex">
          <span class="text-xl font-semibold text-gray-800 dark:text-white"></span>
        </div>

        <!-- Right nav items -->
        <div class="flex items-center space-x-4">
          <app-theme-toggle />

          <!-- User profile -->
          <div class="relative">
            <button class="flex items-center space-x-2 focus:outline-none">
              <div class="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                <span class="text-gray-700 dark:text-gray-200 font-medium text-sm">US</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
}
