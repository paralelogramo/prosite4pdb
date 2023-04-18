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
import { InfoProteinModalComponent } from '../modals/info-protein-modal/info-protein-modal.component';
import { find, pairwise, startWith } from 'rxjs';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import { MinMaxGapComponent } from '../modals/min-max-gap/min-max-gap/min-max-gap.component';
import { Color, Gradient } from '3dmol';

interface gapConstruct{
    source: number;
    target: number;
    minGap: number;
    maxGap: number;
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

    loadMessages: any[] = [
        {
            'message': 'Linking Amino Acid Chains',
            'icon': 'aminoacids'
        },{
            'message': 'Dividing the Cells',
            'icon': 'cell-division'
        },{
            'message': 'Shaking the Flask',
            'icon': 'flask'
        },{
            'message': 'Looking the Petri Dish',
            'icon': 'microorganism'
        },{
            'message': 'Searching for Amino Acid Patterns',
            'icon': 'molecules'
        },{
            'message': 'Looking for Pockets',
            'icon': 'protein'
        },{
            'message': 'Making the Scientist Work',
            'icon': 'scientist-male'
        },{
            'message': 'Making the Scientist Work',
            'icon': 'scientist-female'
        },{
            'message': 'Searching an Amino Acid',
            'icon': 'search'
        },{
            'message': 'Targeting Amino Acid',
            'icon': 'target'
        },{
            'message': 'Shaking Test Tubes',
            'icon': 'test-tube'
        },{
            'message': 'Looking for a Water Molecule',
            'icon': 'water'
        }
    ]

    loadMessage: string = '';
    loadIcon: string = '';

    searchTerm: string;
    page = 1;
    pageSize = 10;
    results: any[] = [];
    collectionSize: number = this.results.length;
    correctInput: boolean = false;

    closeModal: NgbModalRef;
    closeModalAminoSelect: NgbModalRef;
    closeModalSelectResult: NgbModalRef;
    toasts: any[] = [];
    gaps: gapConstruct[] = [];

    canvasContextMenu = false;
    canvasContextMenuX = 0;
    canvasContextMenuY = 0;
    nodeContextMenu = false;
    nodeContextMenuX = 0;
    nodeContextMenuY = 0;
    nodeSelected: any = null;
    nodeRightClicked: any = null;
    actionClicked = '';

    linkContextMenu = false;
    linkContextMenuX = 0;
    linkContextMenuY = 0;
    linkSelected: any = null;

    graph = fg.default()

    imgAminoUrl= '../../../../assets/graphIcons/Amino Acid.png';
    imgAnyAminoUrl= '../../../../assets/graphIcons/Any Amino Acid.png';
    imgGroupUrl= '../../../../assets/graphIcons/Group.png';
    imgExceptUrl= '../../../../assets/graphIcons/Except.png';

    list_aminos: AminoGraph[] = [];
    links = [];

    selectedAmino: any = null;

    comQuery: any;

    public actions: AminoAction[] = [
        { name: 'Amino Acid', url: '../../../../assets/Amino Acid.png', action: 'selectAminoAcid'},
        { name: 'Any Amino', url: '../../../../assets/Any Amino Acid.png', action: 'selectAnyAminoAcid'},
        { name: 'Next', url: '../../../../assets/Next Amino.png', action: 'selectNextAminoAcid'},
        { name: 'Gap', url: '../../../../assets/Gap.png', action: 'selectGap'},
        { name: 'Group', url: '../../../../assets/Group.png', action: 'selectGroup'},
        { name: 'Except', url: '../../../../assets/Except.png', action: 'selectExcept'}
    ];

    inputPatternForm = new FormGroup({
        pattern: new FormControl('a-x(2,4)-r-c-x(3,5)-a'),
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
        this.graph.zoomToFit();
        this.onChangeInput();

        let data: Data = {
            nodes: this.list_aminos,
            links: this.links
        };
        
        this.graph
        (document.getElementById('canvasGraph'))
        .graphData(data)
        .linkWidth(3)
        .linkDirectionalArrowLength(1)
        .linkDirectionalArrowColor((link:any) => link.color = '#006CA8')
        .linkCurvature('curvature')
        .nodeLabel('aminos')
        .enableNodeDrag(true)
        .linkLabel('text')
        .onNodeDrag(node => {
            this.canvasContextMenu = false;
            this.nodeContextMenu = false;
            this.linkContextMenu = false;
            this.nodeSelected = null;
        })
        .onNodeDragEnd(node => {
            node.fx = node.x;
            node.fy = node.y;
        })
        .onBackgroundClick(event => {
            this.canvasContextMenu = false;
            this.nodeContextMenu = false;
            this.linkContextMenu = false;
            this.nodeSelected = null;
        })
        .onBackgroundRightClick(event => {
            this.linkContextMenu = false;
            this.nodeContextMenu = false;
            this.nodeSelected = null;

            this.canvasContextMenuX = event.offsetX
            this.canvasContextMenuY = event.offsetY
            this.canvasContextMenu = true;
        })
        .linkCanvasObjectMode(() => 'after')
        .linkCanvasObject((link: any, ctx: any) => {
            const fontSize = 2;
            ctx.font = `bold ${fontSize}px Consolas`;
            
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillStyle = '#006CA8';
            ctx.fillText(link.text, (link.source.x + link.target.x) / 2, (link.source.y + link.target.y) / 2);
        })
        .onLinkRightClick((link: any, event) => {
            this.canvasContextMenu = false;
            this.nodeContextMenu = false;
            this.nodeSelected = null;

            this.linkContextMenuX = event.offsetX
            this.linkContextMenuY = event.offsetY
            this.linkContextMenu = true;

            this.linkSelected = link;
        })
        .nodeCanvasObject((node: any, ctx) => {

            if (node.isGroup) {
                ctx.beginPath();
                ctx.fillStyle = '#5C0096';
                ctx.arc(node.x, node.y, 4, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.beginPath();
                ctx.fillStyle = 'rgb(235, 235, 235)';
                ctx.arc(node.x, node.y, 3.6, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.font = 'bold 2px Consolas';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = '#5C0096';
                ctx.fillText('Group', node.x, node.y);
            }
            else if (node.isExcept) {
                ctx.beginPath();
                ctx.fillStyle = '#008717';
                ctx.arc(node.x, node.y, 4, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.beginPath();
                ctx.fillStyle = 'rgb(235, 235, 235)';
                ctx.arc(node.x, node.y, 3.6, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.font = 'bold 1.5px Consolas';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = '#008717';
                ctx.fillText('Except', node.x, node.y);
            }
            else {
                if(node.aminos[0] == 'ANY') {
                    ctx.beginPath();
                    ctx.fillStyle = '#D06225';
                    ctx.arc(node.x, node.y, 4, 0, 2 * Math.PI, false);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.fillStyle = 'rgb(235, 235, 235)';
                    ctx.arc(node.x, node.y, 3.6, 0, 2 * Math.PI, false);
                    ctx.fill();
                    ctx.font = 'bold 2px Consolas';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = '#D06225';
                    ctx.fillText(node.aminos[0], node.x, node.y);
                }
                else{
                    ctx.beginPath();
                    ctx.fillStyle = '#006CA8';
                    ctx.arc(node.x, node.y, 4, 0, 2 * Math.PI, false);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.fillStyle = 'rgb(235, 235, 235)';
                    ctx.arc(node.x, node.y, 3.6, 0, 2 * Math.PI, false);
                    ctx.fill();
                    ctx.font = 'bold 2px Consolas';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = '#006CA8';
                    ctx.fillText(node.aminos[0], node.x, node.y);
                }
            }

            if (node == this.nodeSelected) {
                ctx.beginPath();
                ctx.arc(node.x, node.y, 4 , 0, 2 * Math.PI, false);
                ctx.fillStyle = 'rgba( 245 , 160 , 20 , 0.4)';
                ctx.fill();
            }
        })
        .onNodeClick((node: any, ctx: any) => {
            if (this.nodeSelected != null) {
                var links = this.graph.graphData().links;
                if(links.find((link: any) => link.source.id == this.nodeSelected.id) != undefined){
                    this.ngxNotifierService.createToast('The source node has already a link. To add a new link please delete the current link.', 'danger', 3000);
                    return
                }
                if(links.find((link: any) => link.target.id == node.id) != undefined){
                    this.ngxNotifierService.createToast('The target node has already a link. To add a new link please delete the current link.', 'danger', 3000);
                    return
                }
                if(this.nodeSelected.id == node.id){
                    this.ngxNotifierService.createToast('The source and target nodes are the same. To add a new link please select a different target node.', 'danger', 3000);
                    return
                }
                if(links.find((link: any) => link.source.id == node.id && link.target.id == this.nodeSelected.id) != undefined){
                    this.ngxNotifierService.createToast('The link already exists.', 'danger', 3000);
                    return
                }

                var link = { source: this.nodeSelected, target: node, text: this.actionClicked };
                if (this.actionClicked == 'Gap') {
                    let minmax = this.modalService.open(MinMaxGapComponent, { centered: true, size: 'md' });
                    minmax.result.then((result) => {
                        if(result == 'cancel'){
                            return
                        }
                        if(result != 'cancel'){
                            link.text = 'X(' + result[0] + ',' + result[1] + ')';
                            this.actionClicked = '';
                            this.nodeSelected = null;
                            this.graph.graphData().links.push(link);

                            if(this.graph.graphData().nodes.length == this.graph.graphData().links.length + 1){
                                this.refreshText();
                            }
                            return
                        }
                    })
                    .catch((error) => {
                    });
                }
                if(this.actionClicked == 'Next'){
                    link.text = 'Next';
                    this.actionClicked = '';
                    this.nodeSelected = null;
                    this.graph.graphData().links.push(link);

                    if (this.graph.graphData().nodes.length == this.graph.graphData().links.length + 1) {
                        this.refreshText();
                    }
                    return
                }
                this.actionClicked = '';
                this.nodeSelected = null;
                return
            }

            this.canvasContextMenu = false;
            this.nodeContextMenu = false;
            this.linkContextMenu = false;
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
                    })
                    .catch((error) => {});
                }
                else {
                    this.closeModalAminoSelect.result.then((result) => {
                        if(result!= 0 && result != 1){
                            node.aminos = result;
                        }
                    })
                    .catch((error) => { });
                }
            }    
        })
        .onNodeRightClick((node, event) => {
            this.linkContextMenu = false;
            this.canvasContextMenu = false;

            this.nodeContextMenuX = event.offsetX
            this.nodeContextMenuY = event.offsetY
            this.nodeContextMenu = true;

            this.nodeRightClicked = node;
        })
        .onLinkClick((link: any, event) => {
            this.nodeContextMenu = false;
            this.canvasContextMenu = false;
            this.linkContextMenu = false;
            if(link.text != 'Next'){
                let minmax = this.modalService.open(MinMaxGapComponent, { centered: true, size: 'md' });
                minmax.componentInstance.data = link.text;
                minmax.result.then((result) => {
                    if(result == 'cancel'){
                        return
                    }
                    if(result != 'cancel'){
                        link.text = 'X(' + result[0] + ',' + result[1] + ')';
                        return
                    }
                })
                .catch((error) => {
                });
            }
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

    refreshText(){
        // FALTA
        var links = this.graph.graphData().links;
        var nodes = this.graph.graphData().nodes;
        
        if(nodes.length == links.length + 1){
            
            // let first: number = this.graph.graphData().links.filter(( node ) => { if node.source })
            // console.log(this.graph.graphData().links)
        }

        return
    }

    onCanvasContextMenuOptionSelected(event: any){
        if(event.option == 'fit'){
            this.graph.zoomToFit();
            this.canvasContextMenu = false;
            return;
        }
        let coords = this.graph.screen2GraphCoords(event.x, event.y);
        let newNode = this.genNodeWithAminos(this.graph.graphData().nodes.length + 1, coords, event.option, ['ALA']);
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
                this.actionClicked = 'Next';
                break;

            case 'gap':
                this.actionClicked = 'Gap';
                break;
            case 'delete':
                this.graph.graphData().nodes.find((node: any) => {
                    if (node.id == this.nodeRightClicked.id) {
                        this.graph.graphData().nodes.splice(this.graph.graphData().nodes.indexOf(node), 1);
                        return true;
                    }
                    else{
                        return false;
                    }
                })
                let newSource;
                let newTarget;
                this.graph.graphData().links.forEach((link: any): boolean => {
                    if (link.source.id == this.nodeRightClicked.id) {
                        newTarget = link.target;
                        this.graph.graphData().links.splice(this.graph.graphData().links.indexOf(link), 1);
                        return true;
                    }
                    return false;
                });
                this.graph.graphData().links.forEach((link: any): boolean => {
                    if (link.target.id == this.nodeRightClicked.id) {
                        newSource = link.source;
                        this.graph.graphData().links.splice(this.graph.graphData().links.indexOf(link), 1);
                        return true;
                    }
                    return false;
                });
                if(newSource && newTarget){
                    let link = { source: newSource, target: newTarget, text: "Next", curvature: 0.0};
                    this.graph.graphData().links.push(link);
                }

                this.nodeContextMenu = false;                
                break;
        
            default:
                break;
        }
        this.graph.graphData().nodes.find((node: any) => {
            if (node.id == this.nodeRightClicked.id) {
                this.nodeSelected = node;
            }
        });
        this.nodeContextMenu = false;
    }

    onLinkContextMenuOptionSelected(event: any){
        switch (event.option) {
            case 'delete':
                this.graph.graphData().links.find((link: any) => {
                    if(link.source.id == event.link.source.id && link.target.id == event.link.target.id){
                        this.graph.graphData().links.splice(this.graph.graphData().links.indexOf(link), 1);
                        return true;
                    }
                    else{
                        return false;
                    }
                })
                break;
            default:
                break;
        }
        this.linkContextMenu = false;
    }

    onLinkChange(){
        // FALTA
        var text = '';
        var links = this.graph.graphData().links;
        var nodes = this.graph.graphData().nodes;
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
                    this.refreshCanvas(next)
                }
            }
            else{
                this.correctInput = false;
            }
        });
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
        var index = Math.floor(Math.random() * this.loadMessages.length)
        this.loadMessage = this.loadMessages[index].message;
        this.loadIcon = this.loadMessages[index].icon;
        this.closeModal = this.modalService.open(content, {backdrop: 'static', keyboard: false, size: 'sm'});
        let resultsGet = [];
        let pattern = this.inputPatternForm.value.pattern.toUpperCase();
        this.comQuery = Parser(pattern+'.');
        
        if(this.comQuery.message !== 'success') {
            this.ngxNotifierService.createToast(this.comQuery.message, 'danger', 3000);
        }
        else{
            this.results = [];
            this.aminoService.getTotalResultsByPattern(this.inputPatternForm.value.pattern.toUpperCase()+'.').subscribe((data: any) => {
                this.collectionSize = data[0].count;
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
                    this.aminoService.getResultsByPattern(this.inputPatternForm.value.pattern.toUpperCase()+'.', this.pageSize, (this.page - 1) * this.pageSize).subscribe((data: any) => {
                        data.data.forEach(res => {
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

    onPageChange(event: any, content){
        this.closeModal = this.modalService.open(content);
        let resultsGet = [];
        this.page = event;
        this.aminoService.getResultsByPattern(this.inputPatternForm.value.pattern.toUpperCase()+'.', this.pageSize, (this.page - 1) * this.pageSize).subscribe((data: any) => {
            data.data.forEach(res => {
                resultsGet.push(res);
            });
            this.results = [];
            this.results = resultsGet;
            this.closeModal.close();
        });
    }

    openProteinPDB(protein: any) {
        // window.open('https://www.rcsb.org/structure/' + protein.id);
        
        this.closeModalSelectResult = this.modalService.open(InfoProteinModalComponent, {size: 'lg' });
        protein.pattern = this.inputPatternForm.value.pattern.toUpperCase();
        var keys = Object.keys(protein).filter(string => string.includes('symbol')).sort();
        var realPattern = ''
        keys.forEach(index => {
            realPattern += protein[index]+'-';
        });
        protein.realPattern = realPattern.slice(0,-1);
        this.closeModalSelectResult.componentInstance.protein = protein;
        this.closeModalSelectResult.componentInstance.pattern = realPattern.replaceAll('-', '');
    }

    // Refresh canvas when change the input
    refreshCanvas(pattern: string){
        var distanceX = 0;
        var distanceY = 0;
        var nodeList = [];
        this.gaps = [];
        var aminos = pattern.split('-');

        // THIS PART WILL DISSAPEAR AFTER THE UPDATE OF THE GRAMMAR
        if ((aminos[0].includes('(') && aminos[0].includes(')') && aminos[0].includes(',')) || (aminos[aminos.length - 1].includes('(') && aminos[aminos.length - 1].includes(')') && aminos[aminos.length - 1].includes(','))) {
            this.correctInput = false;
            return
        }
        aminos.forEach((amino, i) => {
            if (amino.includes('(') && amino.includes(')') && amino.includes(',') && amino[0].toLowerCase() != 'x') {
                this.correctInput = false;
                return
            }
        });
        // END OF THE PART THAT WILL DISSAPEAR
        var indexGap = 0;
        aminos.forEach((amino) => {
            indexGap += 1;
            amino = amino.toUpperCase();
            var repetition = 1;
            if (amino.includes('(') && amino.includes(')') && amino.includes(',')) {
                // console.log("Gap: " + amino)
                var repetitionExtended = amino.split('(')[1];
                var parts = repetitionExtended.split(',');
                var min = Number(parts[0]);
                var max = Number(parts[1].replaceAll(')', ''));
                var gap = {
                    source: indexGap -1,
                    target: indexGap,
                    minGap: min,
                    maxGap: max
                }
                indexGap -= 1;
                this.gaps.push(gap);
                return
            }
            if(amino.includes('(') && amino.includes(')') && !amino.includes(',')){
                var parts = amino.split('(');
                repetition = Number(parts[1].replaceAll(')',''));
                amino = parts[0];
            }
            for (let i = 0; i < repetition; i++) {
                try {
                    var last = nodeList[nodeList.length - 1]
                    distanceX = last.x + 20;
                    distanceY = last.y;
                } catch (e) {}
                if (amino.includes('[') && amino.includes(']')) {
                    var aminoList = amino.replaceAll('[','').replaceAll(']','').split('');
                    var aminoThreeList = aminoList.map(a => this.getAminoOneLetter(a));
                    var node = this.genNodeWithAminos(nodeList.length + 1, {x: distanceX, y: distanceY}, 'group', aminoThreeList);
                    try {
                        current = this.graph.graphData().nodes.find(n => n.id == node.id)
                        node.fx = current.x;
                        node.x = current.x;
                        node.fy = current.y;
                        node.y = current.y;  
                    } catch (e) {}
                    nodeList.push(node);
                }
                else if (amino.includes('{') && amino.includes('}')){
                    var aminoList = amino.replaceAll('{','').replaceAll('}','').split('');
                    var aminoThreeList = aminoList.map(a => this.getAminoOneLetter(a));
                    var node = this.genNodeWithAminos(nodeList.length + 1, {x: distanceX, y: distanceY}, 'except', aminoThreeList);
                    try {
                        current = this.graph.graphData().nodes.find(n => n.id == node.id)
                        node.fx = current.x;
                        node.x = current.x;
                        node.fy = current.y;
                        node.y = current.y;   
                    } catch (e) {}
                    nodeList.push(node);
                }
                else {
                    if (amino == 'X') {
                        var node = this.genNodeWithAminos(nodeList.length + 1, {x: distanceX, y: distanceY}, 'any');
                        try {
                            current = this.graph.graphData().nodes.find(n => n.id == node.id)
                            node.fx = current.x;
                            node.x = current.x;
                            node.fy = current.y;
                            node.y = current.y;   
                        } catch (e) {}
                        nodeList.push(node);
                    } else {
                        var node = this.genNodeWithAminos(nodeList.length + 1, {x: distanceX, y: distanceY}, 'amino', [this.getAminoOneLetter(amino)]);
                        var current;
                        try {
                            current = this.graph.graphData().nodes.find(n => n.id == node.id)
                            node.fx = current.x;
                            node.x = current.x;
                            node.fy = current.y;
                            node.y = current.y;
                        } catch (e) {}
                        nodeList.push(node);
                    }
                }
            }
        });
        this.graph.graphData().nodes = nodeList;
        var links = []
        var i = 1;
        while (i < nodeList.length) {
            var link;
            const res = this.gaps.find(g => g.source == i);
            if(res){
                link = { source: i, target: i + 1, text: "X(" + String(res.minGap) + "," + String(res.maxGap) + ")", curvature: 0.0 };
            }
            else{
                link = { source: i, target: i + 1, text: "Next", curvature: 0.0 };
            }
            links.push(link);
            i += 1;
        }
        this.graph.graphData().links = links;
        this.graph.zoomToFit();
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
        this.graph.zoomToFit();
    }
}
