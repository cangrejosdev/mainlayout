// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { LayoutComponent } from './components/layout/layout.component';
import { ListadousuariosReportesComponent } from './pages/listadousuariosreportes/listadousuariosreportes.component';
import { ListadousuariosComponent } from './pages/listadousuarios/listadousuarios.component';
import { UserFormComponent } from './pages/dataentry/users/users.component';
import { EditUserComponent } from './pages/listadousuarios/edit-user/edit-user.component';
import { ListadogruposComponent } from './pages/listadogrupos/listadogrupos.component';
import { ListadoReportesComponent } from './pages/listadoreportes/listadoreportes.component';
import { ComboreportesComponent } from './pages/dataentry/comboreportes/comboreportes.component';
import { ListFirmantesComponent } from './pages/listafirmantes/listafirmantes.component';
export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'usuariosreporte', component: ListadousuariosReportesComponent },
      { path: 'usuariosdataentry', component : UserFormComponent},
      { path: 'usersreporte', component :  ListadousuariosComponent},
      { path: 'edit-user/:id', component: EditUserComponent },
      { path: 'listadogrupos', component: ListadogruposComponent },
      { path: 'listadoreportes', component: ListadoReportesComponent },
      { path : 'comboreportes', component : ComboreportesComponent},
      { path: 'firmantes', component: ListFirmantesComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];
