import { computed, inject, Injectable, signal } from '@angular/core';
import { Usuarios } from '../interfaces/usuarios';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
interface State {
  usuarios: Usuarios[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private http = inject(HttpClient);

  #state = signal<State>({
    loading: true,
    usuarios: [],
  });

  public usuarios = computed(() => this.#state().usuarios);
  public loading = computed(() => this.#state().loading);
  constructor() {

 this.getlistausuarios();

 }

  async getlistausuarios() {

    let url = `${environment.url}/user123/0`;
    this.http.get<Usuarios[]>(url).subscribe((data) => {
      this.#state.set({
        loading: false,
        usuarios: data.map((item: any) => {
          return {
            usuario: item.usuario,
            correo: item.correo,
            forma: item.forma,
            ubicacion: item.ubicacion,
            activo: item.activo,
            id: item.id
          };
        })
      });

    });
 console.log('Esta es la Lista:',this.usuarios());
  }



}
