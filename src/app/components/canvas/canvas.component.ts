import { Component, ElementRef, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import * as D3 from 'd3';
import networkD3 from '../../../assets/networkD3/networkD3.js';
import { AminoAction } from 'src/app/models/amino-action.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Parser } from 'src/assets/js/Parser';
import { AminoService } from 'src/app/services/aminoService/amino.service';
import { NgbModal, NgbModalConfig, NgbModalRef, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxNotifierService } from 'ngx-notifier';

interface Result {
    id: string;
    title: string;
    classification: string;
    organism: string;
}

@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit{
    networkGraph = networkD3();

    searchTerm: string;
    page = 1;
    pageSize = 10;
    results: Result[] = [];
    collectionSize: number = this.results.length;
    comQuery: any;

    closeModal: NgbModalRef;
    toasts: any[] = [];

    public actions: AminoAction[] = [
        { name: 'Amino Acid', url: '../../../../assets/Amino Acid.png', action: 'selectAminoAcid'},
        { name: 'Any Amino', url: '../../../../assets/Any Amino Acid.png', action: 'selectAnyAminoAcid'},
        { name: 'Next', url: '../../../../assets/Next Amino.png', action: 'selectNextAminoAcid'},
        { name: 'Gap', url: '../../../../assets/Gap.png', action: 'selectGap'},
        { name: 'Group', url: '../../../../assets/Group.png', action: 'selectGroup'},
        { name: 'Except', url: '../../../../assets/Except.png', action: 'selectExcept'}
    ];

    inputPatternForm = new FormGroup({
        pattern: new FormControl('A-A-R.'),
    });

    filter = new FormControl('', { nonNullable: true });


    constructor(
        private aminoService: AminoService,
        config: NgbModalConfig,
        private modalService: NgbModal,
        private ngxNotifierService: NgxNotifierService,
    ){
        config.backdrop = 'static';
		config.keyboard = false;
        config.size = 'sm';
    }

    ngOnInit(): void {
        D3.select('canvas-container').call(this.networkGraph);
    }

    onPageChange(event: any, content){
        this.closeModal = this.modalService.open(content);
        var resultsGet = [];
        this.page = event;
        this.aminoService.getResultsByPattern(this.comQuery, this.pageSize, (this.page - 1) * this.pageSize).subscribe((data: any) => {
            data.forEach(res => {
                var id = res.id;
                var title = res.title;
                var classification = res.classification;
                var organism = res.organism;
                
                let protein = {id: id, title: title, classification: classification, organism: organism};
                resultsGet.push(protein);
            });
            this.results = [];
            this.results = resultsGet;
            this.closeModal.close();
        });
    }

    searchFirstGroupPattern(content) {
        this.closeModal = this.modalService.open(content);
        var resultsGet = [];
        var pattern = this.inputPatternForm.value.pattern.toUpperCase();
        this.comQuery = Parser(pattern);
        if(this.comQuery.message) {
            this.ngxNotifierService.createToast(this.comQuery.message, 'danger', 3000);
        }
        else{
            this.results = [];
            this.aminoService.getTotalResultsByPattern(this.comQuery).subscribe((data: any) => {
                this.collectionSize = data;
                this.ngxNotifierService.createToast(this.collectionSize + ' results found for pattern: ' + this.inputPatternForm.value.pattern, 'success', 3000);
            },
            (error: any) => {},
            () => {
                if (this.collectionSize === 0) {
                    this.ngxNotifierService.createToast('No results found for pattern: ' + this.inputPatternForm.value.pattern, 'warning', 3000);
                }
                else{
                    this.closeModal.result.then((result) => {}, (reason) => {});
                    this.aminoService.getResultsByPattern(this.comQuery, this.pageSize, (this.page - 1) * this.pageSize).subscribe((data: any) => {
                        data.forEach(res => {
                            var id = res.id;
                            var title = res.title;
                            var classification = res.classification;
                            var organism = res.organism;
                            
                            let protein = {id: id, title: title, classification: classification, organism: organism};
                            resultsGet.push(protein);
                        });
                        this.results = resultsGet;
                        this.closeModal.close();
                    });
                }
            });
        }
    }

    openProteinPDB(id: string) {
        window.open('https://www.rcsb.org/structure/' + id);
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
