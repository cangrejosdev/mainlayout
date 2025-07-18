import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirmantesService } from '../../services/firmantes.service';
import { Firmante } from '../../interfaces/firmante';

@Component({
  selector: 'app-list-firmantes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listafirmantes.component.html',
  styleUrls: ['./listafirmantes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListFirmantesComponent {
  private firmantesService = inject(FirmantesService);

  firmantes = this.firmantesService.firmantes;
  loading = this.firmantesService.loading;

  // Estados para los modales
  showEditModal = signal(false);
  showAddModal = signal(false);
  editingFirmante = signal<Firmante | null>(null);
  editForm = signal({ cedula: '', nombres: '' });
  addForm = signal({ cedula: '', nombres: '' });

  recargarFirmantes() {
    this.firmantesService.getFirmantes();
  }

  // Funciones para editar firmante
  editarFirmante(firmante: Firmante) {
    this.editingFirmante.set(firmante);
    this.editForm.set({
      cedula: firmante.cedula,
      nombres: firmante.nombres
    });
    this.showEditModal.set(true);
  }

  async guardarEdicion() {
    const form = this.editForm();
    if (form.cedula && form.nombres) {
      try {
        await this.firmantesService.editarFirmante(form.cedula, form.nombres);
        this.cancelarEdicion();
        console.log('Firmante editado correctamente');
      } catch (error) {
        console.error('Error al editar firmante:', error);
        alert('Error al editar el firmante');
      }
    }
  }

  cancelarEdicion() {
    this.showEditModal.set(false);
    this.editingFirmante.set(null);
    this.editForm.set({ cedula: '', nombres: '' });
  }

  updateEditForm(field: 'cedula' | 'nombres', value: string) {
    this.editForm.set({
      ...this.editForm(),
      [field]: value
    });
  }

  // Funciones para agregar firmante
  abrirModalAgregar() {
    this.addForm.set({ cedula: '', nombres: '' });
    this.showAddModal.set(true);
  }

  async agregarFirmante() {
    const form = this.addForm();
    if (form.cedula && form.nombres) {
      try {
        await this.firmantesService.agregarFirmante(form.cedula, form.nombres);
        this.cancelarAgregar();
        console.log('Firmante agregado correctamente');
      } catch (error) {
        console.error('Error al agregar firmante:', error);
        alert('Error al agregar el firmante');
      }
    } else {
      alert('Por favor complete todos los campos');
    }
  }

  cancelarAgregar() {
    this.showAddModal.set(false);
    this.addForm.set({ cedula: '', nombres: '' });
  }

  updateAddForm(field: 'cedula' | 'nombres', value: string) {
    this.addForm.set({
      ...this.addForm(),
      [field]: value
    });
  }

  // Función para eliminar firmante
  async eliminarFirmante(firmante: Firmante) {
    const confirmacion = confirm(`¿Está seguro de eliminar al firmante ${firmante.nombres}?`);
    if (confirmacion) {
      try {
        await this.firmantesService.eliminarFirmante(firmante.cedula);
        console.log('Firmante eliminado correctamente');
      } catch (error) {
        console.error('Error al eliminar firmante:', error);
        alert('Error al eliminar el firmante');
      }
    }
  }
}
