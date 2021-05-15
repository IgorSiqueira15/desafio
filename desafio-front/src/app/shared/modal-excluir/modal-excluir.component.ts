import { Component, OnInit } from "@angular/core";
import { NgbModalConfig, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-modal-excluir",
  templateUrl: "./modal-excluir.component.html",
  styleUrls: ["./modal-excluir.component.scss"]
})
export class ModalExcluirComponent implements OnInit {
  // Variáveis
  title: string;
  prompt: string;

  constructor(
    public config: NgbModalConfig,
    public activeModal: NgbActiveModal
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = "static";
    config.keyboard = false;
  }

  onCancelar(): void {
    this.activeModal.close(false);
  }

  onConfirmar() {
    this.activeModal.close(true);
  }

  ngOnInit() {}
}
