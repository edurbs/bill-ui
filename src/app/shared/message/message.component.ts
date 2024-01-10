import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
    <div *ngIf="temErro()" class="p-message p-message-error">
      {{ text }}
    </div>
  `,
  styles: [
    `
      .p-message-error {
        padding: 5px;
        margin: 0;
        margin-top: 4px;
      }
    `,
  ],
})
export class MessageComponent implements OnInit {
  @Input() error: string = '';
  @Input() control?: AbstractControl | FormControl | null;
  @Input() text: string = '';

  temErro(): boolean | undefined {
    return this.control ? this.control.hasError(this.error) && this.control.dirty: true;
  }

  constructor() {}

  ngOnInit(): void {}
}
