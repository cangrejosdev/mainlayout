import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { UsersService } from '../../services/users.service';
import { UserData } from '../../interfaces/usersdata';
import { Router, RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { environment } from '../../../environments/environment';
import { EditUserComponent } from './edit-user/edit-user.component';

@Component({
  selector: 'app-listadousuarios',
  standalone: true,
  imports: [CommonModule, TableModule, ToolbarModule, DialogModule],
  templateUrl: './listadousuarios.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListadousuariosComponent {
  listadousers: UserData[] = [];
  displayDialog: boolean = false;

  xID = signal<string>('');
  public listaUserService = inject(UsersService);
  private router = inject(Router);

  // Signals para las notificaciones
  notification = signal({
    show: false,
    message: '',
    type: 'success' // o 'error'
  });

  ngOnChanges() {
    this.listaUserService.getlistUsers();
    console.log('Esta es la Lista:', this.listaUserService.users());
  }

  editar(id: string) {
    this.xID.set(id);
    this.router.navigate(['/edit-user', this.xID()]);
  }

  eliminar(id: string, user: string) {
    // Confirmar antes de eliminar
    if (confirm(`¿Estás seguro de que deseas eliminar al usuario ${user}?`)) {
      const url = `${environment.url}/user134/${id}/${user}`;

      fetch(url, {
        method: 'GET',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error al eliminar el usuario: ${response.statusText}`);
          }

          // Primero verifica el tipo de contenido
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            return response.json().catch(() => {
              // Si falla el parseo JSON pero la respuesta es OK, consideramos éxito
              return { message: 'Usuario eliminado exitosamente' };
            });
          } else {
            // Si no es JSON, considera éxito y devuelve un objeto genérico
            return { message: 'Usuario eliminado exitosamente' };
          }
        })
        .then((data) => {
          console.log('Usuario eliminado exitosamente en el servidor:', data);
          // Mostrar notificación de éxito
          this.showNotification('Usuario eliminado exitosamente', 'success');
          this.listaUserService.getlistUsers();
        })
        .catch((error) => {
          console.error('Error al eliminar el usuario:', error);
          // Mostrar notificación de error
          this.showNotification('Error al eliminar el usuario', 'error');
        });
    }
  }

  showNotification(message: string, type: 'success' | 'error') {
    this.notification.set({
      show: true,
      message,
      type
    });

    // Ocultar la notificación después de 3 segundos
    setTimeout(() => {
      this.notification.set({
        ...this.notification(),
        show: false
      });
    }, 3000);
  }

  closeNotification() {
    this.notification.set({
      ...this.notification(),
      show: false
    });
  }

  closeDialog() {
    this.displayDialog = false;
  }
}
