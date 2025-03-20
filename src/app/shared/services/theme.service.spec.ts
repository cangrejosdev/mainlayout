// shared/services/theme.service.ts
import { Injectable, signal } from '@angular/core';
import { effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkMode = signal<boolean>(false);

  constructor() {
    // Inicializar tema basado en preferencias del usuario
    this.initializeTheme();

    // Escuchar cambios en el tema
    effect(() => {
      this.updateTheme(this.isDarkMode());
    });
  }

  initializeTheme(): void {
    // Comprobar preferencia guardada o preferencia del sistema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      this.isDarkMode.set(true);
    }
  }

  toggleTheme(): void {
    this.isDarkMode.update(isDark => !isDark);
    localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
  }

  private updateTheme(isDark: boolean): void {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
