import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';

const UsuarioRoutes: Routes = [
  {
    path: '',
    component: UsuarioListComponent,
  },
  {
    path: 'novo',
    component: UsuarioFormComponent,
  },
  {
    path: 'alterar/:usuarioId',
    component: UsuarioFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(UsuarioRoutes)],
  exports: [RouterModule],
})
export class UsuarioRouting {}
