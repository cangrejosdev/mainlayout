import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { UsersService } from '../../services/users.service';
import { UserData } from '../../interfaces/usersdata';
import { Router, RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';

import { EditUserComponent } from './edit-user/edit-user.component';

@Component({
  selector: 'app-listadousuarios',
  imports: [TableModule, ToolbarModule, DialogModule],
  templateUrl: './listadousuarios.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListadousuariosComponent {
  listadousers: UserData[] = [];
  displayDialog: boolean = false;

  xID = signal<string>('');
  public listaUserService = inject(UsersService);
  private router = inject(Router);

  ngOnChanges() {
    this.listaUserService.getlistUsers();
    console.log('Esta es la Lista:', this.listaUserService.users());
  }

  editar(id: string) {
    this.xID.set(id);
    this.router.navigate(['/edit-user', this.xID()]);
  }

  closeDialog() {
    this.displayDialog = false;
  }
}
