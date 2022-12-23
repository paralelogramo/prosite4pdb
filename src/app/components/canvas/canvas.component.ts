import { Component, ElementRef, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';

import { AminoAction } from 'src/app/models/amino-action.model';
import { AminoGraph } from 'src/app/models/amino-graph.model';
import { LinkGraph } from 'src/app/models/link-graph.model';

import { Aminos } from '../../objects/aminos.enum';

import { FormGroup, FormControl } from '@angular/forms';
import { Parser } from 'src/assets/js/Parser';
import { AminoService } from 'src/app/services/aminoService/amino.service';
import { NgbActiveModal, NgbModal, NgbModalConfig, NgbModalRef, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxNotifierService } from 'ngx-notifier';
import * as fg from 'force-graph';
import { ModalSelectAminoComponent } from '../modals/modal-select-amino/modal-select-amino.component';
import { pairwise, startWith } from 'rxjs';

interface Result {
    id: string;
    title: string;
    classification: string;
    organism: string;
}

interface Data {
    nodes: any[];
    links: any[];
}

@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit{

    curvature: number = 0.2;

    searchTerm: string;
    page = 1;
    pageSize = 10;
    results: Result[] = [];
    collectionSize: number = this.results.length;
    comQuery: any;
    correctInput: boolean = false;

    closeModal: NgbModalRef;
    closeModalAminoSelect: NgbModalRef;
    toasts: any[] = [];

    canvasContextMenu = false;
    canvasContextMenuX = 0; 
    canvasContextMenuY = 0; 

    graph = fg.default()

    imgAminoUrl= '../../../../assets/graphIcons/Amino Acid.png';
    imgAnyAminoUrl= '../../../../assets/graphIcons/Any Amino Acid.png';
    imgGroupUrl= '../../../../assets/graphIcons/Group.png';
    imgExceptUrl= '../../../../assets/graphIcons/Except.png';

    list_aminos: AminoGraph[] = [{
        id: 1,
        x: 0,
        fx: 0,
        y: 0,
        fy: 0,
        img: this.imgAminoUrl,
        isGroup: false,
        isExcept: false,
        aminos: ['ALA'],
    },
    {
        id: 2,
        x: 20,
        fx: 20,
        y: 0,
        fy: 0,
        img: this.imgAminoUrl,
        isGroup: false,
        isExcept: false,
        aminos: ['ALA'],
    },
    ];
    // list_aminos: AminoGraph[] = [];

    links = [
        { source: 1, target: 2, text: "next", curvature : 0.0}
    ];
    // links: LinkGraph[] = [];

    selectedAmino: any = null;

    public actions: AminoAction[] = [
        { name: 'Amino Acid', url: '../../../../assets/Amino Acid.png', action: 'selectAminoAcid'},
        { name: 'Any Amino', url: '../../../../assets/Any Amino Acid.png', action: 'selectAnyAminoAcid'},
        { name: 'Next', url: '../../../../assets/Next Amino.png', action: 'selectNextAminoAcid'},
        { name: 'Gap', url: '../../../../assets/Gap.png', action: 'selectGap'},
        { name: 'Group', url: '../../../../assets/Group.png', action: 'selectGroup'},
        { name: 'Except', url: '../../../../assets/Except.png', action: 'selectExcept'}
    ];

    inputPatternForm = new FormGroup({
        pattern: new FormControl(''),
    });

    filter = new FormControl('', { nonNullable: true });


    constructor(
        private aminoService: AminoService,
        private modalService: NgbModal,
        private ngxNotifierService: NgxNotifierService,
    ){}

    ngOnInit(): void {
        this.onChangeInput();
        const highlightNodes = new Set();

        let data: Data = {
            nodes: this.list_aminos,
            links: this.links
        };
        
        this.graph
        (document.getElementById('canvasGraph'))
        .graphData(data)
        .linkDirectionalParticles(2)
        .linkCurvature('curvature')
        .nodeLabel('aminos')
        .enableNodeDrag(true)
        .linkLabel('text')
        .onNodeDragEnd(n => {
            n.fx = n.x;
            n.fy = n.y;
        })
        .onBackgroundClick(event => {
            this.disableContextMenu();

            // if (this.selectedAmino != null) {
            //     this.selectedAmino = null;
            // }
            // else{
            //     let coords = this.graph.screen2GraphCoords(event.x, event.y);
            //     let newNode = this.genNode(coords);

            //     let nodes = [...this.graph.graphData().nodes, newNode];

            //     this.graph.graphData({
            //         nodes: nodes,
            //         links: [...this.graph.graphData().links]
            //     })
            //     data.nodes.forEach(node => {
            //         node.fx = node.x;
            //         node.fy = node.y;
            //     });
            // }
        })
        .onBackgroundRightClick(event => {
            if(this.canvasContextMenu){
                this.disableContextMenu();
                return;
            }
            this.canvasContextMenuX = event.offsetX
            this.canvasContextMenuY = event.offsetY
            this.canvasContextMenu = true;
        })
        .linkCanvasObjectMode(() => 'after')
        .nodeCanvasObject((node: any, ctx) => {
            const size = 8;
            const img = new Image();

            if (node.isGroup) {
                img.src = this.imgGroupUrl;
                ctx.drawImage(img, node.x - size / 2, node.y - size / 2, size, size);
            }
            else if (node.isExcept) {
                img.src = this.imgExceptUrl;
                ctx.drawImage(img, node.x - size / 2, node.y - size / 2, size, size);
            }
            else {
                img.src = this.getAminoIcon(node.aminos[0]);
                ctx.drawImage(img, node.x - size / 2, node.y - size / 2, size, size);
            }
            })
        .onNodeClick((node: any, ctx: any) => {
            let data;
            if(node.isExcept){
                data ={
                    type: 'except',
                    aminos: node.aminos
                }
            }
            else if(node.isGroup){
                data ={
                    type: 'group',
                    aminos: node.aminos
                }
            }
            else{
                data ={
                    type: 'amino',
                    aminos: node.aminos
                }
            }

            if(node.aminos[0] != 'ANY'){
                this.closeModalAminoSelect = this.modalService.open(ModalSelectAminoComponent, {size: 'md' }); 
                this.closeModalAminoSelect.componentInstance.data = data;
                if (!node.isExcept && !node.isGroup) {
                    this.closeModalAminoSelect.result.then((result) => {
                        if(result!= 0 && result != 1){
                            node.aminos = result;
                        }
                    });
                }
                else {
                    this.closeModalAminoSelect.result.then((result) => {
                        if(result!= 0 && result != 1){
                            node.aminos = result;
                        }
                    });
                }
            }    
            
            // if (this.selectedAmino == null) {
            //     this.selectedAmino = node.id;
            //     this.nodePaint(node, ctx)
            // } else {
            //     let newLink = {source: this.selectedAmino, target: node.id, text: "next", curvature: 0.0};

            //     if (newLink.source != newLink.target) {
            //         let links = [...this.graph.graphData().links, newLink];
            //         this.graph.graphData({
            //             nodes: [...this.graph.graphData().nodes],
            //             links: links
            //         })   
            //     }
            //     else{
            //         this.selectedAmino = null;
            //     }
            // }
        })

        
        this.onResize(null);
    }

    nodePaint({ id, x, y }, ctx) {
        ctx.fillStyle = 'red';
        [
          () => {
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
            ctx.fill();
        },
        ][id%1]();
    }

    onCanvasContextMenuOptionSelected(event: any){
        switch (event.option) {
            case 'amino':
                let coords = this.graph.screen2GraphCoords(event.x, event.y);
                let newNode = this.genNode(coords);
                let nodes = [...this.graph.graphData().nodes, newNode];
                this.graph.graphData({
                    nodes: nodes,
                    links: [...this.graph.graphData().links]
                })
                this.graph.graphData().nodes.forEach(node => {
                    node.fx = node.x;
                    node.fy = node.y;
                });
                break;
        
            default:
                break;
        }
        this.canvasContextMenu = false;
    }

    disableContextMenu() {
        this.canvasContextMenu = false;
    }
    
    getAminoIcon(type: string){
        switch (type) {
            case 'ALA':
                return Aminos.ALA;
            case 'ARG':
                return Aminos.ARG;
            case 'ASN':
                return Aminos.ASN;
            case 'ASP':
                return Aminos.ASP;
            case 'CYS':
                return Aminos.CYS;
            case 'GLN':
                return Aminos.GLN;
            case 'GLU':
                return Aminos.GLU;
            case 'GLY':
                return Aminos.GLY;
            case 'HIS':
                return Aminos.HIS;
            case 'ILE':
                return Aminos.ILE;
            case 'LEU':
                return Aminos.LEU;
            case 'LYS':
                return Aminos.LYS;
            case 'MET':
                return Aminos.MET;
            case 'PHE':
                return Aminos.PHE;
            case 'PRO':
                return Aminos.PRO;
            case 'SER':
                return Aminos.SER;
            case 'THR':
                return Aminos.THR;
            case 'TRP':
                return Aminos.TRP;
            case 'TYR':
                return Aminos.TYR;
            case 'VAL':
                return Aminos.VAL;
            default:
                return Aminos.ANY;
        }
    }

    onResize(event: any) {
        let divElement = document.getElementById('canvasID');
        this.graph.width(divElement.offsetWidth-4);
        this.graph.height(divElement.offsetHeight-4);
    }

    onChangeInput(){
        this.inputPatternForm.get('pattern').valueChanges
        .pipe(startWith(null), pairwise())
        .subscribe(([prev, next]: [any, any]) => {
            let res = Parser(next + '.');
            if(res.message === 'success'){

            }
            else{
                this.correctInput = false;
            }
        });
    }

    onPageChange(event: any, content){
        this.closeModal = this.modalService.open(content);
        let resultsGet = [];
        this.page = event;
        this.aminoService.getResultsByPattern(this.comQuery, this.pageSize, (this.page - 1) * this.pageSize).subscribe((data: any) => {
            data.forEach(res => {
                let id = res.id;
                let title = res.title;
                let classification = res.classification;
                let organism = res.organism;
                
                let protein = {id: id, title: title, classification: classification, organism: organism};
                resultsGet.push(protein);
            });
            this.results = [];
            this.results = resultsGet;
            this.closeModal.close();
        });
    }

    genNode(coords: any) {
        let node: AminoGraph = {
            id: this.graph.graphData().nodes.length+1,
            x: coords.x,
            fx: coords.x,
            y: coords.y,
            fy: coords.y,
            img: this.imgAminoUrl,
            isGroup: false,
            isExcept: false,
            aminos: ['A']
        };
        return node
    }

    searchFirstGroupPattern(content) {
        this.closeModal = this.modalService.open(content, {backdrop: 'static', keyboard: false, size: 'sm'});
        let resultsGet = [];
        let pattern = this.inputPatternForm.value.pattern.toUpperCase();
        this.comQuery = Parser(pattern+'.');
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
                            let id = res.id;
                            let title = res.title;
                            let classification = res.classification;
                            let organism = res.organism;
                            
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
