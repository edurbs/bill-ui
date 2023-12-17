import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appCampoColorido]',
})
export class CampoColoridoDirective {
  @HostBinding('style.backgroundColor') corDeFundo: string = 'transparent';

  constructor() {}

  @HostListener('focus') aoGanharFoco() {
    this.corDeFundo = 'yellow';
  }

  @HostListener('blur') aoPerderFoco() {
    this.corDeFundo = 'transparent';
  }
}
