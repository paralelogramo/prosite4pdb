import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-right-click-menu',
  templateUrl: './button-right-click-menu.component.html',
  styleUrls: ['./button-right-click-menu.component.css']
})
export class ButtonRightClickMenuComponent implements OnInit{
  @Input() x;
  @Input() y;
  @Input() id; 
  @Output() optionSelected = new EventEmitter<{}>();

  constructor() {
  }

  ngOnInit() {
  }

  action(option: string) {
    this.optionSelected.emit({
      option: option,
      x: this.x,
      y: this.y
    });
  }
}
