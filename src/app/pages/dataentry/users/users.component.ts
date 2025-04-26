// user-form.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';

import { environment } from '../../../../environments/environment';
import { UsersService } from '../../../services/users.service';
import { ReporteService } from '../../../services/reportes.service';


export interface Ung {
  idu?: number;
  value: string;
  }
  export interface Grp {
    idg?: number;
    value: string;
    }
  export interface Area {
    value: string;
  }
  export interface Na {
    idn?: number;
    value: string;
    }

  const areas: Area[] = [
    { value: 'Administracion' },
    { value: 'Almacen' },
    { value: 'Operaciones' },
    { value: 'Sistemas' },
    { value: 'Direccion' },
    { value: 'Otro' },
  ];

  const ung: Ung[] = [
    { idu: 1,value: 'Vipcompany' },
    { idu: 2,value: 'Vipco' },
    { idu: 3,value: 'Vindu' },
    { idu: 5,value: 'Vipcars' },
  ];
  const grp: Grp[] = [
    { idg: 1,value: 'Administra' },
    { idg: 2,value: 'Operadores' },
    { idg: 3,value: 'Consulta' },
  ];

  const na: Na[] = [
    { idn: 1,value: 'Administrador' },
    { idn: 2,value: 'Operador' },
    { idn: 3,value: 'Usuario' },
  ];
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  submitted = false;
  public listaUserService = inject(UsersService);
  public listaRepService = inject(ReporteService);
  constructor(private fb: FormBuilder) {}
  // Dataset para los select
  dts1 = ung;
  dts2 = areas
  dts3 = grp
  dts4 = na

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      login: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      usuario: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      mail: ['', [Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
      ung: ['', [Validators.required]],
      area: ['', [Validators.required]],
      funcion: ['', [Validators.required]],
      observaciones: ['', [Validators.maxLength(500)]],
      grupo: [''],
      nivel_acceso: [''],
      terminal: [''],
    });
  }

  // Getter para un acceso más limpio a los controles del formulario
  get controls() {
    return this.userForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    } else {
      if (this.userForm.valid) {
        // Lógica para enviar los datos al servidor
        const formData = this.userForm.value;
        const url = `${environment.url}/user125/${formData.login}/${formData.usuario}/${formData.mail}/${formData.password}/${formData.ung}/${formData.area}/${formData.funcion}/${formData.observaciones}/${formData.grupo}/${formData.nivel_acceso}/${formData.terminal}`;
        console.log('URL:', url);
        fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            console.log('Respuesta:', response.json);
            if (!response.ok) {
              throw new Error('Error en la solicitud');
            }
            Swal.fire('Usuario Creado exitosamente!');
            this.listaUserService.getlistUsers(); //
            this.listaRepService.getGruposById('0'); // Actualizar la lista de reportes
            //  Actualizar la lista de usuarios
            return response.json();
          })
          .then((data) => {
            // Reiniciar el formulario después de enviar
            this.submitted = false;
            this.userForm.reset();
          })
          .catch((error) => {
            console.error('Error al guardar el usuario:', error);
          });
      }
    }
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.controls[controlName as keyof typeof this.controls];
    return (
      !!control &&
      control.hasError(errorName) &&
      (control.touched || this.submitted)
    );
  }
}
