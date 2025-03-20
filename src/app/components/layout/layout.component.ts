// components/layout/layout.component.ts
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent],
  template: `
    <div class="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <!-- Sidebar -->
      <app-sidebar
        [isSidebarOpen]="isSidebarOpen()"
        (toggleSidebar)="toggleSidebar()"
      />

      <!-- Main content -->
      <div class="flex flex-col flex-1 overflow-hidden">
        <app-navbar
          (toggleSidebar)="toggleSidebar()"
        />

        <!-- Page content -->
        <main class="flex-1 overflow-y-auto p-4">
          <div class="container mx-auto">
            <router-outlet />
          </div>
        </main>
      </div>
    </div>
  `
})
export class LayoutComponent {
  private themeService = inject(ThemeService);
  isSidebarOpen = signal<boolean>(true);

  toggleSidebar(): void {
    this.isSidebarOpen.update(isOpen => !isOpen);
  }
}
