import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCampoColorido]',
  exportAs: 'campoColorido',
})
export class CampoColoridoDirective {
  @HostBinding('style.backgroundColor') corDeFundo: string = 'transparent';

  @Input() cor: string = 'red';

  constructor() {}

  @HostListener('focus') colorir() {
    this.corDeFundo = this.cor;
  }

  @HostListener('blur') descolorir() {
    this.corDeFundo = 'transparent';
  }
}
