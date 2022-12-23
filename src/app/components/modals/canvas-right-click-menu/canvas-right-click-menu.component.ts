import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-canvas-right-click-menu',
  templateUrl: './canvas-right-click-menu.component.html',
  styleUrls: ['./canvas-right-click-menu.component.css']
})
export class CanvasRightClickMenuComponent implements OnInit{
  @Input() x;
  @Input() y;
  @Output() optionSelected = new EventEmitter<{}>();

  constructor() {
  }

  ngOnInit() {
    console.log('x: ' + this.x);
    console.log('y: ' + this.y);
  }

  action(option: string) {
    this.optionSelected.emit({
      option: option,
      x: this.x,
      y: this.y
    });
  }
}
