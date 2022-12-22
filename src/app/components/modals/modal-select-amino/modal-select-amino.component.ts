import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AminosNames } from 'src/app/objects/aminoNames.enum';

interface Option {
    value: string; // Amino 3 Letters
    option: string; // Amino Full Name
    checked: boolean; // Checked or not
}

@Component({
  selector: 'app-modal-select-amino',
  templateUrl: './modal-select-amino.component.html',
  styleUrls: ['./modal-select-amino.component.css']
})
export class ModalSelectAminoComponent implements OnInit {
    @Input() data: any;

    aminoNames = Object.values(AminosNames);

    modalref: NgbModalRef;
    modalType: string;

    options: Option[] = []; // for groups
    aminoSingle: FormGroup = new FormGroup({
        aminoOption: new FormControl('') // for single option
    });

    constructor(
      public activeModal: NgbActiveModal,
    ) {     
    }

    ngOnInit(): void {
        this.modalType = this.data.type;
        this.aminoSingle.setValue({aminoOption: this.data.aminos[0]});
        this.aminoNames.forEach((amino, index) => {
            let aminoTemp = {value: Object.keys(AminosNames)[index], option: amino, checked: false}
            this.data.aminos.forEach(aminoData => {
                if(aminoData === Object.keys(AminosNames)[index]){
                    aminoTemp.checked = true;
                }
            });
            this.options.push(aminoTemp);
        });
        console.log(this.options)
    }

    onChangeOption(amino: string){
        
    }

    onClose(result: string){
        if(result === 'save'){
            if (this.modalType === 'amino') {
                this.activeModal.close([this.aminoSingle.value.aminoOption])
            } else {
                this.activeModal.close(this.options.filter(option => option.checked).map(option => option.value));
            }
        }
        else{
            this.activeModal.close(0);
        }
    }
}
