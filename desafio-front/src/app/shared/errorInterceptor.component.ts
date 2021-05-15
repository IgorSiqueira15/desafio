import { Injectable, Injector } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private injector: Injector
  ) {}

  private get toastrService(): ToastrService {
    return this.injector.get(ToastrService);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(errorResponse => {
        if (errorResponse instanceof HttpErrorResponse) {
          switch (errorResponse.status) {
            /* BAD_REQUEST - 400 */
            case 400:
              this.showError("mensagem.error.formulario");
              break;

            /* AUTENTICAÇÃO - 401 */
            case 401:
              this.showError("mensagem.error.login", "login");
              break;

            /* PERMISSÃO - 403 */
            case 403:
              this.showError("mensagem.error.permissao", "dashboard");
              // this.location.back();
              break;

            /* NOT FOUND - 404*/
            case 404:
              this.showError("mensagem.error.not-found", "dashboard");
              break;

            /* DUPLICATED  - 409 */
            case 409:
              this.showError("mensagem.error.duplicaded");
              break;

            /* PRECONDITION - 412 */
            case 412:
              this.showError("mensagem.error.excluir-com-dependencia");
              break;

            /* EXPECTATION FAILED - 417 */
            case 417:
              if (errorResponse.error.message !== null) {
                this.showError("mensagem.error." + errorResponse.error.message);
              }

              break;

            /* BAD_REQUEST - 500 */
            case 500:
            default:
              this.showError("mensagem.error.servidor");
              break;
          }
        }

        return Observable.throw(errorResponse);
      })
    );
  }

  public showError(messageKey: string, redirect?: string) {
    if (redirect) {
      this.router.navigate([redirect]);
    }
    this.toastrService.error(messageKey, "", { closeButton: true });
  }

  public showSuccess(messageKey: string, redirect?: string, queryParams?: any) {
    if (redirect) {
      this.router.navigate([redirect], { queryParams });
    }

    this.toastrService.success(messageKey, "", { closeButton: true });
  }
}
