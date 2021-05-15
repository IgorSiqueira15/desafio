import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioService } from './usuario.service';
import { UsuarioRouting } from './usuario.routing.module';

@NgModule({
  declarations: [UsuarioListComponent, UsuarioFormComponent],
  imports: [CommonModule, UsuarioRouting],
  exports: [],
  providers: [UsuarioService],
})
export class UsuarioModule {}
