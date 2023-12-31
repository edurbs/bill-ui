import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
    <div *ngIf="temErro()" class="ui-message ui-messages-error">
      {{ text }}
</div>
  `,
  styles: [],
})
export class MessageComponent implements OnInit {
  @Input() error: string = '';
  @Input() control: FormControl = new FormControl();
  @Input() text: string = '';

  temErro(): boolean | undefined {
    return this.control.hasError(this.error) && this.control.dirty;
  }

  constructor() {}

  ngOnInit(): void {}
}
