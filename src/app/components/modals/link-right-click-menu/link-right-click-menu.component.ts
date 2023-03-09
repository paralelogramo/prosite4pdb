import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-link-right-click-menu',
  templateUrl: './link-right-click-menu.component.html',
  styleUrls: ['./link-right-click-menu.component.css']
})
export class LinkRightClickMenuComponent {
    @Input() x;
    @Input() y;
    @Input() link; 
    @Output() optionSelected = new EventEmitter<{}>();

    action(option: string) {
        this.optionSelected.emit({
            option: option,
            x: this.x,
            y: this.y,
            link: this.link
        });
      }
}
