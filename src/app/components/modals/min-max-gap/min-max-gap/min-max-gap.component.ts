import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxNotifierService } from 'ngx-notifier';

@Component({
    selector: 'app-min-max-gap',
    templateUrl: './min-max-gap.component.html',
    styleUrls: ['./min-max-gap.component.css']
})
export class MinMaxGapComponent implements OnInit{
    @Input() data: any;

    minmaxForm: FormGroup;

    constructor(
        public activeModal: NgbActiveModal,
        private notifier: NgxNotifierService
    ) { }

    ngOnInit(): void {
        if(this.data){
            let min = this.data.split('(')[1].split(',')[0];
            let max = this.data.split(',')[1].split(')')[0];
            this.minmaxForm = new FormGroup({
                min: new FormControl(min, { validators: Validators.required }),
                max: new FormControl(max, { validators: Validators.required })
            });
        }
        else{
            this.minmaxForm = new FormGroup({
                min: new FormControl(0, { validators: Validators.required }),
                max: new FormControl(1, { validators: Validators.required })
            });
        }
    }

    onClose(result: any){
        if(result === 'close'){
            this.activeModal.close(0);
        }
        if(result === 'success'){
            if(this.minmaxForm.valid){
                if(this.minmaxForm.value.min > this.minmaxForm.value.max){
                    this.notifier.createToast('Min value must be less than Max value.', 'danger', 3000);
                    return;
                }
                this.activeModal.close([this.minmaxForm.value.min, this.minmaxForm.value.max]);
            }
            else{
                this.notifier.createToast('Please fill all the fields.', 'danger', 3000);
            }
        }
        if(this.data){
            this.activeModal.close([this.minmaxForm.value.min, this.minmaxForm.value.max])
        }
        this.activeModal.close(0);
    }

}
