import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { UserData } from '../../../interfaces/usersdata';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { SingleUserService } from '../../../services/singleUser.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditUserComponent implements OnInit {
  editUserForm!: FormGroup;
  userId!: string;
  userid = signal<string>('');
  user: UserData[] = [];
  public singleUserService = inject(SingleUserService);
  xID = signal<string>('');

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initForm();
  }
  dtr = inject(ChangeDetectorRef);
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });
    this.xID.set(this.userId);
    console.log('Edit Usuario ID:', this.userId);
    console.log('User Init ID:', this.userId);
    this.userid.set(this.userId ?? '');
    this.dtr.detectChanges();
    this.loadUserData();
  }

  async initForm() {
    this.editUserForm = this.fb.group({
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
      area: ['', [Validators.required]],
      nivel: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!*&])[A-Za-z\d@$!*&]{8,}$/
          ),
        ],
      ],
      terminal: ['', [Validators.required]],
    });
  }

  //

  async loadUserData(): Promise<void> {
    await this.singleUserService.getUserById(this.userId);
    const user = this.singleUserService.users()[0];
    if (user) {
      this.editUserForm.patchValue({
        login: user.login,
        usuario: user.usuario,
        mail: user.mail,
        area: user.area,
        nivel: user.nivel_acceso,
        password: user.password,
        terminal: user.terminal,
      });
    } else {
      console.error('Usuario no encontrado');
    }
    console.log('User Data:', this.singleUserService.users());
  }

  onSubmit(): void {
    if (this.editUserForm.valid) {
      const updatedUser: UserData = {
        login: this.editUserForm.value.login,
        usuario: this.editUserForm.value.usuario,
        mail: this.editUserForm.value.mail,
        password: this.editUserForm.value.password,
        ung: this.editUserForm.value.terminal,
        terminal: this.editUserForm.value.terminal,
        Id: parseInt(this.userId, 10),
        area: '',
        funcion: '',
        observaciones: '',
        grupo: '',
        nivel_acceso: ''
      };
      this.router.navigate(['/listado-usuarios']);
      // });
    }
  }
  salir() {
    this.userId = '';
    this.router.navigate(['/listado-usuarios']);
  }
}
