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
import { Router } from '@angular/router';

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
    results: any[] = [];
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

    list_aminos: AminoGraph[] = [
        // {
        // id: 1,
        // x: 0,
        // fx: 0,
        // y: 0,
        // fy: 0,
        // img: this.imgAminoUrl,
        // isGroup: false,
        // isExcept: false,
        // aminos: ['ALA'],
        // },
        // {
        // id: 2,
        // x: 20,
        // fx: 20,
        // y: 0,
        // fy: 0,
        // img: this.imgAminoUrl,
        // isGroup: false,
        // isExcept: false,
        // aminos: ['ALA'],
        // },
        // {
        // id: 3,
        // x: 40,
        // fx: 40,
        // y: 0,
        // fy: 0,
        // img: this.imgAminoUrl,
        // isGroup: true,
        // isExcept: false,
        // aminos: ['ALA','VAL','HIS','GLY'],
        // },
    ];
    // list_aminos: AminoGraph[] = [];

    links = [
        // { source: 1, target: 2, text: "X(2)", curvature : 0.0},
        // { source: 2, target: 3, text: "Next", curvature : 0.0}
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
        private scroller: ViewportScroller,
        private router: Router
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
        // .linkDirectionalParticleSpeed(0.02)
        // .linkDirectionalParticles(3)
        // .linkDirectionalParticleColor((link:any) => link.color = '#006CA8')
        .linkDirectionalArrowLength(2)
        .linkDirectionalArrowColor((link:any) => link.color = '#006CA8')
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
        setInterval(() => {
            const { nodes, links } = this.graph.graphData();
            this.graph.graphData({
              nodes: [...nodes],
              links: [...links]
            });
          }, 50);
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

    onChangeInput(){
        this.inputPatternForm.get('pattern').valueChanges
        .pipe(startWith(null), pairwise())
        .subscribe(([prev, next]: [any, any]) => {
            let res = Parser(next.toUpperCase() + '.');
            if(next == ''){
                this.graph.graphData({
                    nodes: [],
                    links: []
                })
            }
            if(res.message === 'success'){
                if (next.toUpperCase().split('-').length == 1) {
                    this.refreshCanvas(next)
                }
                if(next.toUpperCase().split('-').length == 1 && !next.toUpperCase().includes('(') && !next.toUpperCase().includes(')')){
                    this.correctInput = false;
                }
                else {
                    this.correctInput = true;
                    // este es el verdadero, aqui actualizar el canva
                    this.refreshCanvas(next)
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
                resultsGet.push(res);
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

    genNodeWithAminos(id: number, coords: any, type: string, aminos?: string[]) {
        let node: AminoGraph;
        switch (type) {
            case 'amino':
                node = {
                    id: id,
                    x: coords.x,
                    fx: coords.x,
                    y: coords.y,
                    fy: coords.y,
                    img: this.imgAminoUrl,
                    isGroup: false,
                    isExcept: false,
                    aminos: aminos
                };
                break;

            case 'any':
                node = {
                    id: id,
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
                    id: id,
                    x: coords.x,
                    fx: coords.x,
                    y: coords.y,
                    fy: coords.y,
                    img: this.imgAminoUrl,
                    isGroup: true,
                    isExcept: false,
                    aminos: aminos
                };
                break;

            case 'except':
                node = {
                    id: id,
                    x: coords.x,
                    fx: coords.x,
                    y: coords.y,
                    fy: coords.y,
                    img: this.imgAminoUrl,
                    isGroup: false,
                    isExcept: true,
                    aminos: aminos
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
                            resultsGet.push(res);
                        });
                        this.results = resultsGet;
                        this.closeModal.close();
                    });
                    document.getElementById('resultsTable').scrollIntoView({ behavior: 'smooth', block: 'end' });
                }
            });
        }
    }

    openProteinPDB(protein: any) {
        // window.open('https://www.rcsb.org/structure/' + protein.id);
        var keys = Object.keys(protein).filter(string => string.includes('symbol')).sort();
        var pattern = ''
        keys.forEach(index => {
            pattern += protein[index]
        });
        console.log(pattern)

    }

    // Refresh canvas when change the input
    refreshCanvas(pattern: string){
        var distance = 20
        var index = 1;
        var nodeList = [];
        var aminos = pattern.split('-');
        aminos.forEach(amino => {
            amino = amino.toUpperCase();
            var repetition = 1;
            if(amino.includes('(') && amino.includes(')')){
                var parts = amino.split('(');
                repetition = Number(parts[1].replaceAll(')',''));
                amino = parts[0];
            }
            //
            for (let i = 0; i < repetition; i++) {
                if (amino.includes('[') && amino.includes(']')) {
                    var aminoList = amino.replaceAll('[','').replaceAll(']','').split('');
                    var aminoThreeList = aminoList.map(a => this.getAminoOneLetter(a));
                    var node = this.genNodeWithAminos(nodeList.length+1, {x: index*distance, y: 0}, 'group', aminoThreeList);
                    var currentX = index*10;
                    var currentY = 0
                    try {
                        currentX = this.graph.graphData().nodes.find(n => n.id == node.id).x
                        currentY = this.graph.graphData().nodes.find(n => n.id == node.id).y
                        node.fx = currentX;
                        node.fy = currentY;   
                    } catch (e) {}
                    nodeList.push(node);
                    index += 1;
                }
                else if (amino.includes('{') && amino.includes('}')){
                    var aminoList = amino.replaceAll('{','').replaceAll('}','').split('');
                    var aminoThreeList = aminoList.map(a => this.getAminoOneLetter(a));
                    var node = this.genNodeWithAminos(nodeList.length+1, {x: index*distance, y: 0}, 'except', aminoThreeList);
                    var currentX = index*10;
                    var currentY = 0
                    try {
                        currentX = this.graph.graphData().nodes.find(n => n.id == node.id).x
                        currentY = this.graph.graphData().nodes.find(n => n.id == node.id).y
                        node.fx = currentX;
                        node.fy = currentY;   
                    } catch (e) {}
                    nodeList.push(node);
                    index += 1;
                }
                else {
                    if (amino == 'X') {
                        var node = this.genNodeWithAminos(nodeList.length+1, {x: index*distance, y: 0}, 'any');
                        var currentX = index*10;
                        var currentY = 0
                        try {
                            currentX = this.graph.graphData().nodes.find(n => n.id == node.id).x
                            currentY = this.graph.graphData().nodes.find(n => n.id == node.id).y
                            node.fx = currentX;
                            node.fy = currentY;   
                        } catch (e) {}
                        nodeList.push(node);
                        index += 1;
                    } else {
                        var node = this.genNodeWithAminos(nodeList.length+1, {x: index*distance, y: 0}, 'amino', [this.getAminoOneLetter(amino)]);
                        var current;
                        try {
                            current = this.graph.graphData().nodes.find(n => n.id == node.id)
                            node.fx = current.x;
                            node.x = current.x;
                            node.fy = current.y;
                            node.y = current.y;
                        } catch (e) {}
                        nodeList.push(node);
                        index += 1;
                    }
                }
            }
        });
        this.graph.graphData().nodes = nodeList;
        // CREAR LINKS
        var links = []
        var i = 1;
        while (i < nodeList.length) {
            var link = { source: i, target: i+1, text: "Next", curvature : 0.0};
            links.push(link);
            i += 1;
        }
        this.graph.graphData().links = links;
    }

    // Get the img source of amino by the three letter id
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

    // Map the amino with one letter to three letters
    getAminoOneLetter(type: string){
        switch (type) {
            case 'A':
                return 'ALA';
            case 'R':
                return 'ARG';
            case 'N':
                return 'ASN'
            case 'D':
                return 'ASP'
            case 'C':
                return 'CYS'
            case 'Q':
                return 'GLN'
            case 'E':
                return 'GLU'
            case 'G':
                return 'GLY'
            case 'H':
                return 'HIS'
            case 'I':
                return 'ILE'
            case 'L':
                return 'LEU'
            case 'K':
                return 'LYS'
            case 'M':
                return 'MET'
            case 'F':
                return 'PHE'
            case 'P':
                return 'PRO'
            case 'S':
                return 'SER'
            case 'T':
                return 'THR'
            case 'W':
                return 'TRP'
            case 'Y':
                return 'TYR'
            case 'V':
                return 'VAL'
            default:
                return 'ANY'
        }
    }

    // Fix size of canvas when resize the browser
    onResize(event: any) {
        let divElement = document.getElementById('canvasID');
        this.graph.width(divElement.offsetWidth-4);
        this.graph.height(divElement.offsetHeight-4);
    }
}
