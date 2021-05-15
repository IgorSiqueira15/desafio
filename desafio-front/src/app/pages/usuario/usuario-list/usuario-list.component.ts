import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalExcluirComponent } from 'src/app/shared/modal-excluir/modal-excluir.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css'],
})
export class UsuarioListComponent implements OnInit {
  usuarios: Usuario[];
  dados: boolean = true;
  paginaAtual: number = 1;
  public filter: string;

  constructor(
    private usuarioService: UsuarioService,
    protected modal: NgbModal,
    private route: ActivatedRoute,
    protected toastr: ToastrService
  ) {}

  ngOnInit() {
    this.usuarioService.findAll().subscribe((response) => {
      this.usuarios = response;
      if (response.length > 0) {
        this.dados = false;
      }
    });
  }

  modalDeletar(id: number, nome: string) {
    const modal = this.modal.open(ModalExcluirComponent);
    modal.componentInstance.prompt = nome;
    modal.result.then((confirmado) => {
      // Caso haje confirmação de exclusão
      if (confirmado) {
        // Deleta registro na API
        this.usuarioService.deteleById(id).subscribe(
          () => {
            // Remove a registro da lista
            this.usuarios = this.usuarios.filter(
              (resultado) => resultado.id !== id
            );

            // Alerta com a mensagem de sucesso
            this.toastr.success('Informação deletada com sucesso !');
          },
          (exception) => {
            // Alerta com mensagem de erro
            this.toastr.error(
              'Não foi possivel apagar pois esta informação esta vinculada!'
            );
          }
        );
      }
    });
  }
}
