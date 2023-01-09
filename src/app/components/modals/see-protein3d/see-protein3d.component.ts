import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as $3Dmol from '3dmol';

window["$"] = $;
window["jQuery"] = $;
window["$3Dmol"] = $3Dmol;

@Component({
  selector: 'app-see-protein3d',
  templateUrl: './see-protein3d.component.html',
  styleUrls: ['./see-protein3d.component.css']
})
export class SeeProtein3dComponent implements OnInit{
    
    constructor() { }

    ngOnInit() {
        var viewer = $3Dmol.createViewer($("#view3D"));
        $3Dmol.download("pdb:1MO8",viewer,{multimodel:true, frames:true},function(){
            viewer.setStyle({}, {cartoon:{color:"spectrum"}});
            viewer.render();
        });
    }
}
