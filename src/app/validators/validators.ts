import {AbstractControl, FormGroup, ValidationErrors} from "@angular/forms";

export function onlyDigits(control: AbstractControl): ValidationErrors | null {
  if (!(typeof control.value === 'string')) {
    return null;
  }
  return /^\d*$/.test(control.value) ? null : {onlyDigits: true};
}

export function dateLessThan(from: string, to: string): any {
  return (group: FormGroup): ValidationErrors | null => {
    const f = (group?.get(from)?.value).split('.').reverse();
    const t = (group?.get(to)?.value).split('.').reverse();

    if (!f || !t) {
      return null;
    }

    return +new Date(f) > +new Date(t) ? {invalidDates: true} : null;
  }
}
