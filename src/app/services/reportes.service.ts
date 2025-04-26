import { computed, inject, Injectable, signal } from '@angular/core';
import { Reportes } from '../interfaces/reportes';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

interface State {
  reportes: Reportes[];
  loading: boolean;
}



@Injectable({
  providedIn: 'root',
})
export class ReporteService {
  private http = inject(HttpClient);

  #state = signal<State>({
    loading: true,
    reportes: [],
  });



  public reportes = computed(() => this.#state().reportes);
  public loading = computed(() => this.#state().loading);



  constructor() {

  }



  async getGruposById(gr: string): Promise<void> {
    console.log('ID-Services Grupo:', gr);
    const url = `${environment.url}/user128/${gr}`;
    console.log('URL:', url);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error al obtener el Listado: ${response.statusText}`);
      }

      const data = await response.json();
      this.#state.set({
        loading: false,
        reportes: data.map((item: any) => ({
          id : item.id,
          correo : item.correo,

        })),
      });

      console.log('Data que envia el servicio:', gr, this.reportes());
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      this.#state.set({
        loading: false,
        reportes: [],
      });
    }
  }
}
