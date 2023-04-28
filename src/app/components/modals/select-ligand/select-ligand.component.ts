import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxNotifierService } from 'ngx-notifier';
import { AminoService } from 'src/app/services/aminoService/amino.service';

@Component({
    selector: 'app-select-ligand',
    templateUrl: './select-ligand.component.html',
    styleUrls: ['./select-ligand.component.css']
})
export class SelectLigandComponent implements OnInit, OnDestroy{

    @Input() data: any;

    // Ligands
    symbols: string[] = [];
    internsSymbols: string[] = [];
    filteredSymbols: string[] = [];

    // Ligands selected
    selectedSymbols: string[] = [];
    internsSelectedSymbol: string[] = [];
    filteredSelectedSymbols: string[] = [];

    isLoading: boolean = true;

    modelSymbol: string = '';
    modelSelectedSymbol: string = '';

    private unsuscribe: any;

    constructor(
        private aminoService: AminoService,
        private activeModal: NgbActiveModal,
        private ngxNotifierService: NgxNotifierService,
    ) {

    }

    ngOnInit(): void {
        this.aminoService.getListLigands().subscribe((data: any) => {
            data.data.forEach(s => {
                this.symbols.push(s.het_symbol);
            });
            this.symbols.splice(this.symbols.indexOf('00C'), 1);
            this.isLoading = false;
            this.data.forEach(l => {
                this.selectedSymbols.push(l);
                this.symbols.splice(this.symbols.indexOf(l), 1);
            });

            this.filteredSymbols = [...this.symbols];
            this.filteredSelectedSymbols = [...this.selectedSymbols];
        });
    }

    ngOnDestroy(): void {
    }

    selectLigand(symbol: string){
        if (this.internsSymbols.indexOf(symbol) == -1){
            this.internsSymbols.push(symbol);
        }
        else{
            this.internsSymbols.splice(this.internsSymbols.indexOf(symbol), 1);
        }
    }

    selectSelectedLigand(symbol: string){
        if (this.internsSelectedSymbol.indexOf(symbol) == -1){
            this.internsSelectedSymbol.push(symbol);
        }
        else{
            this.internsSelectedSymbol.splice(this.internsSelectedSymbol.indexOf(symbol), 1);
        }
    }

    onSave() {
        this.activeModal.close({
            msg: 'success',
            data: this.selectedSymbols
        })
    }

    onClose(){
        this.activeModal.close({
            msg: 'error',
        })
    }

    addLigands() {
        this.internsSymbols.forEach(s => {
            this.selectedSymbols.push(s);
            this.symbols.splice(this.symbols.indexOf(s), 1);
        });
        this.symbols.sort();
        this.selectedSymbols.sort();
        this.internsSymbols = [];
        this.filteredSymbols = [...this.symbols];
        this.filteredSelectedSymbols = [...this.selectedSymbols];
        this.modelSymbol = '';
    }

    deleteLigands() {
        this.internsSelectedSymbol.forEach(s => {
            this.symbols.push(s);
            this.selectedSymbols.splice(this.selectedSymbols.indexOf(s), 1);
        });
        this.symbols.sort();
        this.selectedSymbols.sort();
        this.internsSelectedSymbol = [];
        this.filteredSymbols = [...this.symbols];
        this.filteredSelectedSymbols = [...this.selectedSymbols];
        this.modelSelectedSymbol = '';
    }

    filterSymbols() {
        if (this.modelSymbol == ''){
            this.filteredSymbols = [...this.symbols];
        }
        this.filteredSymbols = this.symbols.filter(s => s.includes(this.modelSymbol.toUpperCase()));
    }

    filterSelectedSymbols() {
        if (this.modelSelectedSymbol == '') {
            this.filteredSelectedSymbols = [...this.selectedSymbols];
        }
        this.filteredSelectedSymbols = this.selectedSymbols.filter(s => s.includes(this.modelSelectedSymbol.toUpperCase()));
    }
}