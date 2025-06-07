import { computed, inject, Injectable, signal } from '@angular/core';
import { UserData } from '../interfaces/usersdata';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

interface State {
  users: UserData[];
  loading: boolean;
}



@Injectable({
  providedIn: 'root',
})
export class SingleUserService {
  private http = inject(HttpClient);

  #state = signal<State>({
    loading: true,
    users: [],
  });



  public users = computed(() => this.#state().users);
  public loading = computed(() => this.#state().loading);



  constructor() {

  }



  async getUserById(id: string): Promise<void> {
    console.log('ID-Services getbyid:', id);
    const url = `${environment.url}/user126/${id}`;
    console.log('URL:', url);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error al obtener el usuario: ${response.statusText}`);
      }

      const data = await response.json();
      this.#state.set({
        loading: false,
        users: data.map((item: any) => ({
          login: item.login,
          usuario: item.usuario,
          mail: item.mail,
          password: item.password,
          ung: item.ung,
          area: item.area,
          funcion: item.funcion,
          observaciones: item.observaciones,
          grupo: item.grupo,
          nivel_acceso: item.nivel_acceso,
          terminal: item.terminal,
          Id: item.Id,
        })),
      });

      console.log('Data que envia el servicio:', id, this.users());
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      this.#state.set({
        loading: false,
        users: [],
      });
    }
  }



  // async updateUser(user: UserData): Promise<any> {
  //   const params = [
  //     `Id=${encodeURIComponent(user.Id)}`,
  //     `login=${encodeURIComponent(user.login)}`,
  //     `usuario=${encodeURIComponent(user.usuario)}`,
  //     `mail=${encodeURIComponent(user.mail)}`,
  //     `password=${encodeURIComponent(user.password)}`,
  //     `ung=${encodeURIComponent(user.ung)}`,
  //     `area=${encodeURIComponent(user.area)}`,
  //     `funcion=${encodeURIComponent(user.funcion)}`,
  //     `observaciones=${encodeURIComponent(user.observaciones)}`,
  //     `grupo=${encodeURIComponent(user.grupo)}`,
  //     `nivel_acceso=${encodeURIComponent(user.nivel_acceso)}`,
  //     `terminal=${encodeURIComponent(user.terminal)}`
  //   ].join('&');

  //   const url = `${environment.url}/user127?${params}`;
  //   try {
  //     const response = await fetch(url);
  //     if (!response.ok) {
  //       throw new Error(`Error al actualizar el usuario: ${response.statusText}`);
  //     }
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error('Error al actualizar el usuario:', error);
  //     throw error;
  //   }
  // }

}
