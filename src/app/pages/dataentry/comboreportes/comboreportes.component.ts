import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comboreportes',
  imports: [CommonModule, FormsModule],
  templateUrl: './comboreportes.component.html',
  styleUrls: ['./comboreportes.component.css'],
})
export class ComboreportesComponent {
  private http = inject(HttpClient);
  correosUnicos: any[] = [];
  roles: string[] = ['Supervisor', 'Director', 'Administrador', 'Gerente']; // Opciones del combo
  selectedRole: string = ''; // Rol seleccionado
  selectedReporte: string=(''); // Reporte seleccionado
  reportesAgregados: { rol: string; reporte: string }[] = []; // Arreglo para almacenar los reportes agregados


  ngOnInit() {
    // Inicializar el componente y obtener los correos únicos al cargar la página
    this.getCorreosUnicos();
  // Método para obtener los correos únicos desde el servicio
  }
  getCorreosUnicos() {
    console.log(`${environment.url}/user131/0`);
    this.http.get(`${environment.url}/user131/0`).subscribe(
      (response: any) => {
        this.correosUnicos = response;
      },
      (error) => {
        console.error('Error al obtener los correos únicos:', error);
      }
    );
  }

  // Método para agregar un reporte al arreglo
  agregarReporte() {
  if (this.selectedRole && this.selectedReporte) {
    // Agregar el reporte al arreglo local
    this.reportesAgregados.push({
      rol: this.selectedRole,
      reporte: this.selectedReporte,
    });

    // Construir la URL para el fetch
    const accion = 'A';
    const url = `${environment.url}/user133/${this.selectedRole}/${this.selectedReporte}/${accion}`;
    console.log('URL de la solicitud:', url);
    // Realizar la solicitud fetch
    fetch(url, {

    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al agregar el reporte: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Reporte agregado exitosamente en el servidor:', data);
      })
      .catch((error) => {
        console.error('Error al agregar el reporte:', error);
      });

    console.log('Reporte agregado localmente:', {
      rol: this.selectedRole,
      reporte: this.selectedReporte,
    });
  } else {
    console.warn('Debe seleccionar un rol y un reporte antes de agregar.');
  }
}

  // Método para eliminar un reporte del arreglo
  eliminarReporte(index: number) {
    if (index >= 0 && index < this.reportesAgregados.length) {
      const reporteEliminado = this.reportesAgregados[index];
      this.reportesAgregados.splice(index, 1); // Eliminar el reporte del arreglo local

      // Construir la URL para el fetch
      const accion = 'D';
      const url = `${environment.url}/user133/${reporteEliminado.rol}/${reporteEliminado.reporte}/${accion}`;
      console.log('URL de la solicitud:', url);
      // Realizar la solicitud fetch
      fetch(url, {
        method: 'GET',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error al eliminar el reporte: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log('Reporte eliminado exitosamente en el servidor:', data);
        })
        .catch((error) => {
          console.error('Error al eliminar el reporte:', error);
        });
    } else {
      console.warn('Índice inválido para eliminar el reporte.');
    }
  }
  // Método para guardar los reportes en el servidor
  cargarDatosPorRol(rol: string) {
    if (!rol) {
      console.warn('Debe seleccionar un rol para cargar los datos.');
      return;
    }

    // Construir la URL para el fetch
    const accion = 'S';
    const noparm = 'noreporte';// Acción para cargar datos
    const url = `${environment.url}/user133/${rol}/${noparm}/${accion}`;
    console.log('URL de la solicitud:', url);

    // Realizar la solicitud fetch
    fetch(url, {
      method: 'GET',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al cargar los datos: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Datos cargados exitosamente:', data);

        // Asignar los datos cargados al arreglo reportesAgregados
        this.reportesAgregados = data.map((item: any) => ({
          rol: rol,
          reporte: item.reporte, // Ajusta según la estructura de los datos recibidos
        }));
      })
      .catch((error) => {
        console.error('Error al cargar los datos:', error);
      });
  }
}
