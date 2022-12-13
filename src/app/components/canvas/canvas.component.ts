import { Component, ElementRef, ViewChild } from '@angular/core';
import * as D3 from 'd3';
import { AminoAction } from 'src/app/models/amino-action.model';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent {
  @ViewChild('canvasGraph') element: ElementRef | undefined;

  private host: D3.Selection<d3.BaseType, {}, d3.BaseType, any>;
  private svg: D3.Selection<SVGAElement, {}, d3.BaseType, any>;
  private width: number;
  private height: number;
  private radius: number;
  private htmlElement: HTMLElement;
  private nodes: string[];
  private edges: string[];
  

  public actions: AminoAction[] = [
    { name: 'Amino Acid', url: '../../../../assets/Amino Acid.png', action: 'selectAminoAcid'},
    { name: 'Any Amino', url: '../../../../assets/Any Amino Acid.png', action: 'selectAnyAminoAcid'},
    { name: 'Next', url: '../../../../assets/Next Amino.png', action: 'selectNextAminoAcid'},
    { name: 'Gap', url: '../../../../assets/Gap.png', action: 'selectGap'},
    { name: 'Group', url: '../../../../assets/Group.png', action: 'selectGroup'},
    { name: 'Except', url: '../../../../assets/Except.png', action: 'selectExcept'}
  ]; 

  constructor() {
  }

  searchPattern() {
    // Pass to js parser and get the sql query
  }

  public selectAminoAcid() {
    console.log('Amino Acid')
  }

  public selectAnyAminoAcid() {
    console.log('Any Amino Acid')
  }

  public selectNextAminoAcid() {
    console.log('Next Amino Acid')
  }

  public selectGap() {
    console.log('Gap')
  }

  public selectGroup() {
    console.log('Group')
  }

  public selectExcept() {
    console.log('Except')
  }

  public handleClick(event: string) {
    switch (event) {
      case 'selectAminoAcid':
        this.selectAminoAcid();
        break;
      case 'selectAnyAminoAcid':
        this.selectAnyAminoAcid();
        break;
      case 'selectNextAminoAcid':
        this.selectNextAminoAcid();
        break;
      case 'selectGap':
        this.selectGap();
        break;
      case 'selectGroup':
        this.selectGroup();
        break;
      case 'selectExcept':
        this.selectExcept();
        break;
    }
  }
}
