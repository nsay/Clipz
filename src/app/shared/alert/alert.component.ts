import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.less']
})
export class AlertComponent {
  
  @Input() color = 'blue';

  get bgColor(): string {
    return `bg-${this.color}-400`
  }
}
