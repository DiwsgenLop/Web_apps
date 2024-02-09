import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegistroScreenComponent } from './screens/registro-screen/registro-screen.component';

const routes: Routes = [
  {path: '', component: LoginScreenComponent, pathMatch: 'full'}, //Raiz de la pagina principal
  {path: 'registro-usuarios', component: RegistroScreenComponent,pathMatch: 'full'}, //Ruta para el login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
