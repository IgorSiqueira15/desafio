import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalExcluirComponent } from "./modal-excluir/modal-excluir.component";

@NgModule({
  declarations: [ModalExcluirComponent],
  imports: [CommonModule],
  exports: [ModalExcluirComponent],
  entryComponents: [ModalExcluirComponent]
})
export class SharedModule {}
