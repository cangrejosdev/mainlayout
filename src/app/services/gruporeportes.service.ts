import { computed, inject, Injectable, signal } from '@angular/core';
import { GrupoReportes } from '../interfaces/gruporeporte';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

interface State {
  grupos: GrupoReportes[];
  loading: boolean;
}



@Injectable({
  providedIn: 'root',
})
export class GrupoReporteService {
  private http = inject(HttpClient);

  #state = signal<State>({
    loading: true,
    grupos: [],
  });



  public grupos = computed(() => this.#state().grupos);
  public loading = computed(() => this.#state().loading);



  constructor() {

  }



  async getGruposById(gr: string): Promise<void> {
    console.log('ID-Services Grupo:', gr);
    const url = `${environment.url}/user127/${gr}`;
    console.log('URL:', url);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error al obtener el Listado: ${response.statusText}`);
      }

      const data = await response.json();
      this.#state.set({
        loading: false,
        grupos: data.map((item: any) => ({
          codig_grupo: item.codig_grupo,
          formproceso: item.formproceso,
        })),
      });

      console.log('Data que envia el servicio:', gr, this.grupos());
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      this.#state.set({
        loading: false,
        grupos: [],
      });
    }
  }
}
