import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { UsersService } from '../../services/users.service';
import { UserData } from '../../interfaces/usersdata';
import { Router, RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import { EditUserComponent } from './edit-user/edit-user.component';

@Component({
  selector: 'app-listadousuarios',
  imports: [TableModule, ToolbarModule, DialogModule],
  templateUrl: './listadousuarios.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListadousuariosComponent {
  listadousers: UserData[] = [];
  displayDialog: boolean = false;

  xID = signal<string>('');
  public listaUserService = inject(UsersService);
  private router = inject(Router);

  ngOnChanges() {
    this.listaUserService.getlistUsers();
    console.log('Esta es la Lista:', this.listaUserService.users());
  }

  editar(id: string) {
    this.xID.set(id);
    this.router.navigate(['/edit-user', this.xID()]);
  }
  eliminar(id: string, user: string) {
    // Construir la URL para el fetch
    const accion = 'D';
    const url = `${environment.url}/user134/${id}/${user}`;

    // Realizar la solicitud fetch
    fetch(url, {
      method: 'GET',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error al eliminar el usuario: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log('usuario eliminado exitosamente en el servidor:', data);
        Swal.fire({
          title: 'Good job!',
          text: 'Registro eliminado exitosamente',
          icon: 'success',
        });
        this.listaUserService.getlistUsers();
      })
      .catch((error) => {
        console.error('Error al eliminar el usuario:', error);
      });
  }

  closeDialog() {
    this.displayDialog = false;
  }
}
