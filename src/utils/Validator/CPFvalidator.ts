export interface StringValidator {
  isAcceptable(s: string): boolean;
}
export const numberRegexp = /^((\d{3}).(\d{3}).(\d{3})-(\d{2}))*$/

export class CPFvalidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 11 && numberRegexp.test(s);
  }
}
 /** /*
      var cpf = this.form.CPF;
      cpf = cpf.replace(/[^\d]/g, "");

      cpf.replace(/(\d{3})\.(\d{3})\.(\d{3})\-(\d{2})/, "$1.$2.$3-$4");

      this.form.CPF = cpf;
      */ 