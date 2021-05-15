import { FormGroup, FormControl, FormArray } from "@angular/forms";

export default class Validation {
  // Valida todos os campos
  static allFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        Validation.allFormFields(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach((formGroup: FormGroup) => {
          Validation.allFormFields(formGroup);
        });
      }
    });
  }

  static backErrors(results: any, formGroup: FormGroup) {
    if (results.hasOwnProperty("error")) {
      for (let error of results.error) {
        formGroup.get(error.field).setErrors({ [error.codeError]: true });
      }
    }
  }

  // Limpa todas validações
  static clearValidateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsUntouched();
        control.markAsPristine({ onlySelf: true });
        control.clearValidators();
        control.updateValueAndValidity();
      } else if (control instanceof FormGroup) {
        this.clearValidateAllFormFields(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach((formGroup: FormGroup) => {
          this.clearValidateAllFormFields(formGroup);
        });
      }
    });
  }
}
