import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-download',
    templateUrl: './download.component.html',
    styleUrls: ['./download.component.css']
})
export class DownloadComponent {

    constructor(
        public activeModal: NgbActiveModal,
    ) { }

    ngOnInit() { }

    onClose(format: string) {
        this.activeModal.close(format);
    }
}
