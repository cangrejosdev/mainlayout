import { computed, inject, Injectable, signal } from '@angular/core';
import { UserData } from '../interfaces/usersdata';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

interface State {
  users: UserData[];
  loading: boolean;
}

interface State1 {
  usersById: UserData[];
  loadingById: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);

  #state = signal<State>({
    loading: true,
    users: [],
  });

  #state1 = signal<State1>({
    loadingById: true,

    usersById: [],
  });

  public users = computed(() => this.#state().users);
  public loading = computed(() => this.#state().loading);

  public usersById = computed(() => this.#state1().usersById);
  public loadingById = computed(() => this.#state1().loadingById);

  constructor() {
    this.getlistUsers();
  }

  async getlistUsers() {
    let url = `${environment.url}/user124/0`;
    this.http.get<UserData[]>(url).subscribe((data) => {
      return this.#state.set({
        loading: false,
        users: data.map((item: any) => {
          return {
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
          };
        }),
      });
    });
    console.log('Data:', this.users());
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
      this.#state1.set({
        loadingById: false,
        usersById: data.map((item: any) => ({
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

      console.log('Data que envia el servicio:', id, this.usersById());
    } catch (error) {
      console.error('Error al obtener el usuario por ID:', error);
      this.#state1.set({
        loadingById: false,
        usersById: [],
      });
    }
  }
}
