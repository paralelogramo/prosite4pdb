import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-min-max-gap',
    templateUrl: './min-max-gap.component.html',
    styleUrls: ['./min-max-gap.component.css']
})
export class MinMaxGapComponent {

    constructor(
        public activeModal: NgbActiveModal,
    ) { }

    onClose(result: any){
        this.activeModal.close(0);
    }

}
