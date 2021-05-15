import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorInterceptor } from 'src/app/shared/errorInterceptor.component';
import Validation from 'src/app/shared/validation';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  usuario: Usuario;
  usuarioForm: FormGroup;
  usuarioId: number;
  escolaridades = [
    {
      id: 1, text: 'Infantil'
    },
    {
      id: 2, text: 'Fundamental'
    }, 
    {
      id: 3, text: 'Médio'
    },
    {
      id: 4, text: 'Superior'
    }
  ]

  constructor(    
    private builder: FormBuilder,
    private usuarioService: UsuarioService,
    private interceptor: ErrorInterceptor,
    private route: ActivatedRoute,
    protected toastr: ToastrService) { }

  ngOnInit() {
    this.usuario = new Usuario();

    this.usuarioForm = this.builder.group({
      id: [],
      nome: [""],
      sobrenome: [""],
      email: [""],
      dataNascimento: [""],
      escolaridade: [""]
    });

    this.usuarioId = this.route.snapshot.params["usuarioId"];

    if (this.usuarioId != null) {
      this.usuarioService
        .findOne(this.usuarioId)
        .subscribe((usuario) => {
          this.usuarioForm.patchValue(usuario);
        });
    }
  }

  salvar(usuario: Usuario) {
    if (this.usuarioForm.invalid) {
      Validation.allFormFields(this.usuarioForm);
      this.toastr.error("O formulário apresenta erros !");
    } else {
      this.usuarioService.save(usuario).subscribe(
        () => {
          if (usuario.id) {
            this.interceptor.showSuccess(
              "Sucesso ao Alterar!",
              "/usuario"
            );
          } else {
            this.interceptor.showSuccess(
              "Sucesso ao Cadastrar!",
              "/usuario"
            );
          }
        },
        (errors) => {
          Validation.backErrors(errors, this.usuarioForm);
        }
      );
    }
  }

}
