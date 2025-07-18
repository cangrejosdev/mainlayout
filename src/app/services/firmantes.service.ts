import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Firmante } from '../interfaces/firmante';

interface State {
  loading: boolean;
  firmantes: Firmante[];
}

@Injectable({
  providedIn: 'root'
})
export class FirmantesService {
  private http = inject(HttpClient);

  #state = signal<State>({
    loading: true,
    firmantes: [],
  });

  public firmantes = computed(() => this.#state().firmantes);
  public loading = computed(() => this.#state().loading);

  constructor() {
    this.getFirmantes();
  }

  async getFirmantes() {
    const url = `${environment.url}/user140/0`;

    try {
      this.http.get<Firmante[]>(url).subscribe((data) => {
        this.#state.set({
          loading: false,
          firmantes: data.map((item: any) => ({
            cedula: item.cedula,
            nombres: item.nombres
          }))
        });
      });

      console.log('Lista de firmantes:', this.firmantes());
    } catch (error) {
      console.error('Error al obtener firmantes:', error);
      this.#state.set({
        loading: false,
        firmantes: [],
      });
    }
  }

  async editarFirmante(cedula: string, nombres: string): Promise<any> {
    console.log('Editando firmante:', { cedula, nombres });
    const url = `${environment.url}/user138/${encodeURIComponent(cedula)}/${encodeURIComponent(nombres)}/UPDATE`;
    console.log('URL de edición:', url);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error al editar el firmante: ${response.statusText}`);
      }
      const data = await response.json();

      // Actualizar el estado local
      this.#state.set({
        ...this.#state(),
        firmantes: this.#state().firmantes.map(f =>
          f.cedula === cedula ? { cedula, nombres } : f
        )
      });

      console.log('Firmante editado exitosamente:', data);
      return data;
    } catch (error) {
      console.error('Error al editar el firmante:', error);
      throw error;
    }
  }



  async agregarFirmante(cedula: string, nombres: string): Promise<any> {
    const url = `${environment.url}/user138/${encodeURIComponent(cedula)}/${encodeURIComponent(nombres)}/insert`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error al agregar el firmante: ${response.statusText}`);
      }
      const data = await response.json();

      // Agregar el nuevo firmante al estado local
      const nuevoFirmante: Firmante = { cedula, nombres };
      this.#state.set({
        ...this.#state(),
        firmantes: [...this.#state().firmantes, nuevoFirmante]
      });

      console.log('Firmante agregado exitosamente:', data);
      return data;
    } catch (error) {
      console.error('Error al agregar el firmante:', error);
      throw error;
    }
  }

  async eliminarFirmante(cedula: string): Promise<any> {
   const url = `${environment.url}/user138/${encodeURIComponent(cedula)}/${encodeURIComponent('nombres')}/delete`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error al eliminar el firmante: ${response.statusText}`);
      }
      const data = await response.json();

      // Actualizar el estado local eliminando el firmante
      this.#state.set({
        ...this.#state(),
        firmantes: this.#state().firmantes.filter(f => f.cedula !== cedula)
      });

      console.log('Firmante eliminado exitosamente:', data);
      return data;
    } catch (error) {
      console.error('Error al eliminar el firmante:', error);
      throw error;
    }
  }
}
