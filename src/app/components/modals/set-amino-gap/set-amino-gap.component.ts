import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AminosNames } from 'src/app/objects/aminoNames.enum';

@Component({
  selector: 'app-set-amino-gap',
  templateUrl: './set-amino-gap.component.html',
  styleUrls: ['./set-amino-gap.component.css']
})
export class SetAminoGapComponent {

    aminoNames = Object.values(AminosNames);
    aminoSelect: FormGroup = new FormGroup({
        aminoOption: new FormControl(''),
        aminoGapMin: new FormControl(''),
        aminoGapMax: new FormControl('')
    });

    constructor(
      public activeModal: NgbActiveModal,
    ) { }

    onClose(result: string){
        if(result === 'save'){
            
        }
        else{
            this.activeModal.close(0);
        }
    }
}
