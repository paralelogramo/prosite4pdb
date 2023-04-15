import { Component, OnInit, Input} from '@angular/core';
import * as $ from 'jquery';
import * as $3Dmol from '3dmol';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-protein-modal',
  templateUrl: './info-protein-modal.component.html',
  styleUrls: ['./info-protein-modal.component.css']
})
export class InfoProteinModalComponent implements OnInit{
    @Input() protein: any;
    @Input() pattern: any;
    
    constructor(
        public activeModal: NgbActiveModal,
        private router: Router
    ) { }

    ngOnInit() {

    }

    seeProtein(){
        this.router.navigateByUrl('prosite4pdb/protein/' + this.protein.id + '/' + this.pattern);
        this.activeModal.close('redirect_protein');
    }

    seeRealPattern(){

    }

    onClose(result: string){
        this.activeModal.close(0);
    }
}
