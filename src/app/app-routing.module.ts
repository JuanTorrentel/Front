import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubirArchivoComponent } from './pages/subir-archivo/subir-archivo.component';
import { LoginComponent } from './pages/login/login.component';
import { UserGuardService } from './guard/user-guard.service';
import { RegistroComponent } from './pages/registro/registro.component';

const routes: Routes = [
  {
    path: '',
    component: SubirArchivoComponent,
    canActivate:[UserGuardService]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registro',
    component: RegistroComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[UserGuardService]
})
export class AppRoutingModule {}
