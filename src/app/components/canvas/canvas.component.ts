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
import { ViewportScroller } from '@angular/common';

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

    nodeContextMenu = false;
    nodeContextMenuX = 0; 
    nodeContextMenuY = 0; 

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
        { source: 1, target: 2, text: "X(2)", curvature : 0.0}
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
        private scroller: ViewportScroller
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
        .linkDirectionalParticleSpeed(0.01)
        .linkDirectionalParticles(3)
        .linkDirectionalParticleColor((link:any) => link.color = '#006CA8')
        .linkCurvature('curvature')
        .nodeLabel('aminos')
        .enableNodeDrag(true)
        .linkLabel('text')
        .onNodeDrag(node => {
            this.canvasContextMenu = false;
            this.nodeContextMenu = false;
        })
        .onNodeDragEnd(node => {
            node.fx = node.x;
            node.fy = node.y;
        })
        .onBackgroundClick(event => {
            this.canvasContextMenu = false;
            this.nodeContextMenu = false;
        })
        .onBackgroundRightClick(event => {
            this.nodeContextMenu = false;
            if(this.canvasContextMenu){
                this.canvasContextMenu = false;
            }
            this.canvasContextMenuX = event.offsetX
            this.canvasContextMenuY = event.offsetY
            this.canvasContextMenu = true;
        })
        .linkCanvasObjectMode(() => 'after')
        .linkCanvasObject((link: any, ctx: any) => {
            const fontSize = 3;
            ctx.font = `bold ${fontSize}px Sans-Serif`;
            // let dy = link.target.y - link.source.y;
            // let h = Math.sqrt((link.target.x - link.source.x)**2+(link.target.y - link.source.y)**2);
            // let angle = Math.asin(dy/h);
            // ctx.rotate(angle);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillStyle = '#006CA8';
            ctx.fillText(link.text, (link.source.x + link.target.x) / 2, (link.source.y + link.target.y) / 2);
        })
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
            this.canvasContextMenu = false;
            this.nodeContextMenu = false;
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
        .onNodeRightClick((node, event) => {
            
            this.nodeContextMenuX = event.offsetX
            this.nodeContextMenuY = event.offsetY
            this.nodeContextMenu = true;
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

    // Falta implementar
    searchExistingNodeOnSource(node: any){
        
    }

    // Falta implementar
    searchExistingNodeOnTarget(node: any){
        
    }

    searchExistingNode(node: any){
        
    }

    onCanvasContextMenuOptionSelected(event: any){
        let coords = this.graph.screen2GraphCoords(event.x, event.y);
        let newNode = this.genNode(coords, event.option);
        let nodes = [...this.graph.graphData().nodes, newNode];
        this.graph.graphData({
            nodes: nodes,
            links: [...this.graph.graphData().links]
        })
        this.graph.graphData().nodes.forEach(node => {
            node.fx = node.x;
            node.fy = node.y;
        });
        this.canvasContextMenu = false;
    }

    onNodeContextMenuOptionSelected(event: any){
        switch (event.option) {
            case 'next':
                
                break;

            case 'gap':
                
                break;
            case 'delete':
                this.graph.graphData().nodes.forEach(node => {
                    if (node.id == event.nodeId) {
                        
                    }
                });
                break;
        
            default:
                break;
        }
        this.nodeContextMenu = false;
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
            let res = Parser(next.toUpperCase() + '.');
            if(res.message === 'success'){
                if(next.toUpperCase().split('-').length == 1){
                    this.correctInput = false;
                }
                else {
                    this.correctInput = true;
                }
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
        this.aminoService.getResultsByPattern(this.comQuery.query, this.pageSize, (this.page - 1) * this.pageSize).subscribe((data: any) => {
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

    genNode(coords: any, type: string) {
        let node: AminoGraph;
        switch (type) {
            case 'amino':
                node = {
                    id: this.graph.graphData().nodes.length+1,
                    x: coords.x,
                    fx: coords.x,
                    y: coords.y,
                    fy: coords.y,
                    img: this.imgAminoUrl,
                    isGroup: false,
                    isExcept: false,
                    aminos: ['ALA']
                };
                break;

            case 'any':
                node = {
                    id: this.graph.graphData().nodes.length+1,
                    x: coords.x,
                    fx: coords.x,
                    y: coords.y,
                    fy: coords.y,
                    img: this.imgAminoUrl,
                    isGroup: false,
                    isExcept: false,
                    aminos: ['ANY']
                };
                break;

            case 'group':
                node = {
                    id: this.graph.graphData().nodes.length+1,
                    x: coords.x,
                    fx: coords.x,
                    y: coords.y,
                    fy: coords.y,
                    img: this.imgAminoUrl,
                    isGroup: true,
                    isExcept: false,
                    aminos: ['ALA']
                };
                break;

            case 'except':
                node = {
                    id: this.graph.graphData().nodes.length+1,
                    x: coords.x,
                    fx: coords.x,
                    y: coords.y,
                    fy: coords.y,
                    img: this.imgAminoUrl,
                    isGroup: false,
                    isExcept: true,
                    aminos: ['ALA']
                };
                break;
        }
        return node
    }

    searchFirstGroupPattern(content) {
        this.page = 1;
        this.closeModal = this.modalService.open(content, {backdrop: 'static', keyboard: false, size: 'sm'});
        let resultsGet = [];
        let pattern = this.inputPatternForm.value.pattern.toUpperCase();
        this.comQuery = Parser(pattern+'.');
        if(this.comQuery.message !== 'success') {
            this.ngxNotifierService.createToast(this.comQuery.message, 'danger', 3000);
        }
        else{
            this.results = [];
            this.aminoService.getTotalResultsByPattern(this.comQuery.query).subscribe((data: any) => {
                this.collectionSize = data;
                this.ngxNotifierService.createToast(this.collectionSize + ' results found for pattern: ' + this.inputPatternForm.value.pattern, 'success', 3000);
            },
            (error: any) => {
                this.ngxNotifierService.createToast('Sorry, a problem happened, please try again later.', 'error', 3000);
            },
            () => {
                if (this.collectionSize === 0) {
                    this.ngxNotifierService.createToast('No results found for pattern: ' + this.inputPatternForm.value.pattern, 'warning', 3000);
                }
                else{
                    this.closeModal.result.then((result) => {}, (reason) => {});
                    this.aminoService.getResultsByPattern(this.comQuery.query, this.pageSize, (this.page - 1) * this.pageSize).subscribe((data: any) => {
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
                    document.getElementById('resultsTable').scrollIntoView({ behavior: 'smooth', block: 'end' });
                }
            });
        }
    }

    openProteinPDB(id: string) {
        window.open('https://www.rcsb.org/structure/' + id);
    }
}
