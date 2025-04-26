import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuarios } from '../../interfaces/usuarios';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listadousuarios',
  imports:  [TableModule,ToolbarModule,DialogModule,ToastModule,CommonModule, FormsModule],
  templateUrl: './listadousuariosreportes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService]
})
export class ListadousuariosReportesComponent {
listadousuarios: Usuarios[] = [];
visibleAddDialog: boolean = false;
selectedUsuario: Partial<Usuarios> = {};
selectedReporte = signal<string>('');
habilitaStatus = signal<boolean>(false);
roles: string[] = ['Supervisor', 'Director', 'Administrador', 'Gerente']; // Opcion
selectedRole: string = ''; // Rol
public http = inject(HttpClient);
public listaUsuarioService = inject(UsuariosService);
public messageService = inject(MessageService);
correosUnicos: any[] = [];
ngOnInit() {
  this.listaUsuarioService.getlistausuarios();
  this.getCorreosUnicos();
}

ngOnChanges() {
  this.listaUsuarioService.getlistausuarios;
  console.log('Esta es la Lista:',this.listaUsuarioService.getlistausuarios());
}
borrarReporte(id: string): void {
  const url = `${environment.url}/user130/${id}`;
  fetch(url, {
    method: 'GET',
  })
    .then((response) => {
      // Desestructuramos las propiedades del objeto Response
      const { type, url, redirected, status, ok } = response;
      // Procesamos el cuerpo de la respuesta
      if (!ok) {
        Swal.fire({
          title: "Error",
          text:`No se pudo eliminar el reporte : ${response.statusText}`,
          icon: "error"
        });
        return
      }
      this.messageService.add({ severity: 'success', summary: 'Buen Trabajo', detail: 'Reporte eliminado exitosamente' })
      this.listaUsuarioService.getlistausuarios();
      return response.json();
    })
    .then((data) => {
      // Desestructuramos las propiedades del cuerpo de la respuesta
      const { Result, Message } = data;
    })
    .catch((error) => {
      console.error('Error en la solicitud:', error);
    });
}
openAddDialog(id: string, usuario: string, correo: string,forma :string ,ubicacion:string) {
  this.selectedUsuario = { id, usuario, correo, forma, ubicacion };
  this.visibleAddDialog = true;
  console.log('Abriendo el dialogo de agregar usuario');
  // Aquí puedes implementar la lógica para abrir el diálogo de agregar usuario
  // Por ejemplo, mostrar un formulario para ingresar los datos del nuevo usuario.
}

getCorreosUnicos() {
  console.log((`${environment.url}/user131/0`));
  this.http.get(`${environment.url}/user131/0`).subscribe(
    (response: any) => {
      this.correosUnicos = response;
    },
    (error) => {
      console.error('Error al obtener los correos únicos:', error);
    }
  );
}

async habilitarEstatus()
{
console.log('Habilitando el estatus...',this.habilitaStatus());
 this.habilitaStatus.set(!this.habilitaStatus());
}
guardarReporte(): void {
  console.log('Guardando el reporte...',this.selectedRole);
  const payload = {
    id: this.selectedUsuario.id,
    usuario: this.selectedUsuario.usuario,
    correo:  this.selectedRole,
    forma: this.selectedUsuario.forma,
    ubicacion: this.selectedUsuario.ubicacion,
  };

  let {id,usuario,correo,forma,ubicacion} = payload
  // Aquí puedes implementar la lógica para guardar el reporte
  console.log (id,usuario,correo,forma,ubicacion)
  let url = `${environment.url}/user132/${usuario}/${correo}/${forma}/${ubicacion}`;
  fetch(url, {
    method: 'GET',
  })
    .then((response) => {
      const { type, url, redirected, status, ok } = response;
      if (!ok) {
        //
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Reporte no Guardado' });
        this.visibleAddDialog = false; // Cierra el diálogo si hay un error
        return

      }
      this.messageService.add({ severity: 'success', summary: 'Buen Trabajo', detail: 'Reporte guardado exitosamente' })
      // Actualiza la lista de reportes después de guardar uno
      this.listaUsuarioService.getlistausuarios();
      this.visibleAddDialog = false; // Cierra el diálogo después de guardar
      return response.json();
    })
    .then((data) => {


    })
    .catch((error) => {
      console.error('Error al guardar el reporte:');
    });

}

onReporteChange(event: Event): void {
  const target = event.target as HTMLSelectElement; // Aseguramos que el target es un <select>
  const value = target.value; // Obtenemos el valor seleccionado
  if (value) {
    this.selectedReporte.set(value); // Actualizamos la señal con el valor seleccionado
  } else {
    console.warn('No se seleccionó ningún valor en el select.');
  }
}
}
