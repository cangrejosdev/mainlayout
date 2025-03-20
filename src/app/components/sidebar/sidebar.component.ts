// components/sidebar/sidebar.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NAVIGATION_ITEMS, NavItem } from '../../shared/models/navigation.model';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  template: `
    <aside
      [ngClass]="isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
      class="w-64 bg-orange-400 dark:bg-gray-800 shadow-lg fixed md:static inset-y-0 left-0 transform transition-transform duration-300 ease-in-out z-30"
    >
      <!-- Sidebar header -->
      <div class="h-16 flex items-center justify-between px-4 border-b dark:border-gray-700">
        <span class="text-xl font-semibold text-gray-800 dark:text-white">Sistema de Usuarios y Reportes</span>
        <button
          (click)="toggleSidebar.emit()"
          class="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white md:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Sidebar content -->
      <div class="py-4 overflow-y-auto">
        <ul class="space-y-2 px-2">
          @for (item of navigationItems; track item.route) {
            <li>
              <a
                [routerLink]="item.route"
                routerLinkActive="bg-gray-200 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
                [routerLinkActiveOptions]="{exact: item.route === '/'}"
                class="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  @switch (item.icon) {
                    @case ('home') {
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    }
                    @case ('dashboard') {
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zm12 0a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
                    }
                    @case ('person') {
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    }
                    @case ('info') {
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"></path>
                    }
                    @default {
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    }
                  }
                </svg>
                <span>{{ item.label }}</span>
              </a>
            </li>
          }
        </ul>
      </div>
    </aside>

    <!-- Backdrop -->
    @if (isSidebarOpen) {
      <div
        class="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
        (click)="toggleSidebar.emit()"
      ></div>
    }
  `
})
export class SidebarComponent {
  @Input() isSidebarOpen = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  navigationItems = NAVIGATION_ITEMS;
}
