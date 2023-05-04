import { Component, ElementRef, OnInit, PipeTransform, ViewChild } from '@angular/core';

import { AminoGraph } from 'src/app/models/amino-graph.model';

import { Aminos } from '../../objects/aminos.enum';

import { FormGroup, FormControl } from '@angular/forms';
import { Parser } from 'src/assets/js/Parser';
import { AminoService } from 'src/app/services/aminoService/amino.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxNotifierService } from 'ngx-notifier';
import * as fg from 'force-graph';
import { ModalSelectAminoComponent } from '../modals/modal-select-amino/modal-select-amino.component';
import { InfoProteinModalComponent } from '../modals/info-protein-modal/info-protein-modal.component';
import { Observable, fromEvent, pairwise, startWith, timeInterval } from 'rxjs';
import { Router } from '@angular/router';
import { MinMaxGapComponent } from '../modals/min-max-gap/min-max-gap.component';
import { ConfigQueryComponent } from '../modals/config-query/config-query.component';
import { SelectLigandComponent } from '../modals/select-ligand/select-ligand.component';
import { DownloadComponent } from '../modals/download/download.component';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

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
            'message': 'Searching Amino Acid Patterns',
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

    filterID: string = '';
    filterTitle: string = '';
    filterClassification: string = '';
    filterOrganism: string = '';
    filterPattern: string = '';

    checkErrorImg: string = '../../../assets/input-no-check.png';
    checkError: string = 'not';
    errorMsg = 'No Error';

    checkRefresh: boolean = false;

    loadMessage: string = '';
    loadIcon: string = '';

    searchTerm: string;
    page = 1;
    pageSize = 8;
    results: any[] = [];
    filteredResults: any[] = [];
    paginateResults: any[] = [];
    collectionSize: number = this.results.length;
    correctInput: boolean = false;
    auxIndex = 1;
    foundedPatterns: number = 0;

    closeModal: NgbModalRef;
    closeModalAminoSelect: NgbModalRef;
    closeModalSelectResult: NgbModalRef;
    closeModalSelectLigand: NgbModalRef;
    closeModalConfigQuery: NgbModalRef;
    closeModalDownload: NgbModalRef;
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

    timeoutHandler;

    list_aminos: AminoGraph[] = [];
    links = [];

    ligandList: string[] = [];

    selectedAmino: any = null;

    comQuery: any;

    timer: number = 0;
    searchingTitleText: string = 'Searching for Patterns';

    inputPatternForm = new FormGroup({
        pattern: new FormControl(''),
    });

    filter = new FormControl('', { nonNullable: true });

    @ViewChild('canvasID', { static: false }) el: ElementRef;
    mouseDown$: Observable<any>;
    mouseUp$: Observable<any>;


    constructor(
        private aminoService: AminoService,
        private modalService: NgbModal,
        private ngxNotifierService: NgxNotifierService,
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
        .zoom(15)
        .linkWidth(3)
        .linkDirectionalArrowLength(2)
        .linkDirectionalArrowRelPos(1.7)
        .linkDirectionalArrowColor((link: any) => link.color = '#006CA8')
        .linkCurvature('curvature')
        .nodeLabel('data')
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
            this.canvasContextMenu = false;
            this.nodeContextMenu = false;
            this.linkContextMenu = false;
            this.nodeSelected = null;
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

            // draw rects start
            let delta = (link.text.length * 1.3);
            ctx.beginPath();
            ctx.fillStyle = '#ebebeb';
            ctx.fillRect(((link.source.x + link.target.x) / 2) - (delta / 2) + 0.1, ((link.source.y + link.target.y) / 2) - 1.2, delta - 0.4, 2.4);
            // draw rects end

            ctx.font = `bold ${fontSize}px Consolas`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillStyle = '#006CA8';
            ctx.fillText(link.text, (link.source.x + link.target.x) / 2, ((link.source.y + link.target.y) / 2) + 1.2);
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
                ctx.arc(node.x, node.y, 3.8, 0, 2 * Math.PI, false);
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
                ctx.arc(node.x, node.y, 3.8, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.font = 'bold 1.5px Consolas';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = '#008717';
                ctx.fillText('Except', node.x, node.y);
            }
            else {
                if(node.data[0] == 'ANY') {
                    ctx.beginPath();
                    ctx.fillStyle = '#D06225';
                    ctx.arc(node.x, node.y, 4, 0, 2 * Math.PI, false);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.fillStyle = 'rgb(235, 235, 235)';
                    ctx.arc(node.x, node.y, 3.8, 0, 2 * Math.PI, false);
                    ctx.fill();
                    ctx.font = 'bold 2px Consolas';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = '#D06225';
                    ctx.fillText(node.data[0], node.x, node.y);
                }
                else{
                    ctx.beginPath();
                    ctx.fillStyle = '#006CA8';
                    ctx.arc(node.x, node.y, 4, 0, 2 * Math.PI, false);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.fillStyle = 'rgb(235, 235, 235)';
                    ctx.arc(node.x, node.y, 3.8, 0, 2 * Math.PI, false);
                    ctx.fill();
                    ctx.font = 'bold 2px Consolas';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = '#006CA8';
                    ctx.fillText(node.data[0], node.x, node.y);
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
                var nodes = this.graph.graphData().nodes;
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

                if(nodes.length == links.length + 1){
                    this.ngxNotifierService.createToast('The target node has already the maximum number of links.', 'danger', 3000);
                    return
                }

                var link = { source: this.nodeSelected, target: node, text: this.actionClicked };
                if (this.actionClicked == 'Gap') {
                    let minmax = this.modalService.open(MinMaxGapComponent, { centered: true, size: 'sm' });
                    minmax.result.then((result) => {
                        if(result == 'cancel'){
                            return
                        }
                        if(result != 'cancel'){
                            link.text = 'X(' + result[0] + ',' + result[1] + ')';
                            this.actionClicked = '';
                            this.nodeSelected = null;
                            this.graph.graphData().links.push(link);

                            this.refreshText();
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

                    this.refreshText();
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
                    aminos: node.data
                }
            }
            else if(node.isGroup){
                data ={
                    type: 'group',
                    aminos: node.data
                }
            }
            else{
                data ={
                    type: 'amino',
                    aminos: node.data
                }
            }
            if (node.data[0] != 'ANY') {
                this.closeModalAminoSelect = this.modalService.open(ModalSelectAminoComponent, { size: 'md' });
                this.closeModalAminoSelect.componentInstance.data = data;
                if (!node.isExcept && !node.isGroup) {
                    this.closeModalAminoSelect.result.then((result) => {
                        if (result != 0 && result != 1) {
                            node.data = result;
                            this.checkRefresh = true;
                            this.refreshText();
                        }
                    })
                        .catch((error) => { });
                }
                else {
                    this.closeModalAminoSelect.result.then((result) => {
                        if (result != 0 && result != 1) {
                            node.data = result;
                            this.checkRefresh = true;
                            this.refreshText();
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
                let minmax = this.modalService.open(MinMaxGapComponent, { centered: true, size: 'sm' });
                minmax.componentInstance.data = link.text;
                minmax.result.then((result) => {
                    if(result == 'cancel'){
                        return
                    }
                    if(result != 'cancel'){
                        link.text = 'X(' + result[0] + ',' + result[1] + ')';
                        this.refreshText();
                        return
                    }
                })
                .catch((error) => {
                });
            }
        })
        .centerAt(0, 0)


        this.onResize(null);
        setInterval(() => {
            const { nodes, links } = this.graph.graphData();
            this.graph.graphData({
              nodes: [...nodes],
              links: [...links]
            });
          }, 50);
        this.graph.zoomToFit();

    }

    // NEEDS TO BE IMPLEMENTED
    openConfigQueryModal(){
        this.closeModalConfigQuery = this.modalService.open(ConfigQueryComponent, { size: 'lg', centered: true });
    }

    // READY
    selectLigands(){
        this.closeModalSelectLigand = this.modalService.open(SelectLigandComponent, { centered: true, size: 'lg' });
        this.closeModalSelectLigand.componentInstance.data = this.ligandList;
        this.closeModalSelectLigand.result
        .then((result) => {
            if (result.msg == 'success') {
                this.ligandList = result.data;
                if(this.ligandList.length == 0){
                    let aminosData = this.inputPatternForm.get('pattern').value.split(':');
                    if(aminosData.length == 1){
                        this.inputPatternForm.get('pattern').setValue(aminosData[0]);
                        return    
                    }
                    else{
                        this.inputPatternForm.get('pattern').setValue(aminosData[1]);
                    }
                }
                else if(this.ligandList.length == 1){
                    let aminosData = this.inputPatternForm.get('pattern').value.split(':');
                    if (aminosData.length == 1) {
                        this.inputPatternForm.get('pattern').setValue(this.ligandList[0] + ":" + aminosData[0]);
                        return
                    }
                    else {
                        this.inputPatternForm.get('pattern').setValue(this.ligandList[0] + ":" + aminosData[1]);
                    }
                }
                else {
                    let aminosData = this.inputPatternForm.get('pattern').value.split(':');
                    if (aminosData.length == 1) {
                        this.inputPatternForm.get('pattern').setValue("[" + this.ligandList.join(',') + "]:" + aminosData[0]);
                        return
                    }
                    else {
                        this.inputPatternForm.get('pattern').setValue("[" + this.ligandList.join(',') + "]:" + aminosData[1]);
                    }
                }
            }
        })
        .catch((error) => {});
    }

    // READY
    refreshText(){
        var links = [...this.graph.graphData().links];
        var nodes = [...this.graph.graphData().nodes];
        var currentTextParts = this.inputPatternForm.get('pattern').value.split(':');
        var currentLigands = '';

        if (currentTextParts.length == 2){
            currentLigands = currentTextParts[0] + ':';
        }

        let currentNode: any = null;
        let currentLink: any = null;

        let text = '';

        if(nodes.length == links.length + 1 && nodes.length > 0){
            nodes.forEach((node: any) => {
                let flag = false;
                links.forEach((link: any) => {
                    if (link.target.id == node.id) {
                        flag = true;
                        
                    }
                })
                if (!flag) {
                    currentNode = node;
                }
            });

            while (currentNode != null && currentNode != undefined){
                if (currentNode.isExcept) {
                    text = text + '{' + this.getAminoGroupExcept(currentNode.data) + '}'
                }

                else if (currentNode.isGroup) {
                    text = text + '[' + this.getAminoGroupExcept(currentNode.data) + ']'
                }

                else if (currentNode.data[0] == 'ANY') {
                    text = text + 'X'
                }

                else {
                    text = text + this.getAminoThreeLetter(currentNode.data[0])
                }
                try {
                    currentLink = links.find((link: any) => link.source.id == currentNode.id);
                    currentNode = nodes.find((node: any) => node.id == currentLink.target.id);
                    if (currentLink.text != 'Next') {
                        text = text + '-' + currentLink.text + '-'
                    }
                    else {
                        text = text + '-'
                    }
                } catch (e) { currentNode = null }
            }
            this.inputPatternForm.get('pattern').setValue(currentLigands + text);
        }
        return
    }

    // READY
    getAminoGroupExcept(aminos: string[]){
        let text = '';
        aminos.forEach((amino: string) => {
            amino = this.getAminoThreeLetter(amino);
            text = text + amino;
        });
        return text;
    }

    // READY
    onCanvasContextMenuOptionSelected(event: any){
        if(event.option == 'fit'){
            this.graph.zoomToFit();
            this.canvasContextMenu = false;
            return;
        }

        let coords = this.graph.screen2GraphCoords(event.x, event.y);
        let newNode;
        this.checkRefresh = true;
        newNode = this.genNodeWithAminos(this.auxIndex, coords, event.option, ['ALA']);
        this.auxIndex++;
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
        this.refreshText();
    }

    // READY
    onNodeContextMenuOptionSelected(event: any){
        this.checkRefresh = true;
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
        this.refreshText();
    }

    // READY
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

    // READY
    onChangeInput(){
        this.inputPatternForm.get('pattern').valueChanges
        .pipe(startWith(null), pairwise())
        .subscribe(([prev, next]: [any, any]) => {
            let res = Parser(next.toUpperCase() + '.');
            if(next == ''){
                this.checkError = 'not';
                this.errorMsg = 'No Error';
                this.checkErrorImg = '../../../assets/input-no-check.png';
                this.graph.graphData({
                    nodes: [],
                    links: []
                })
                return
            }
            if(res.message === 'success'){
                this.errorMsg = 'Correct Input';
                this.checkError = 'suc';
                this.checkErrorImg = '../../../assets/input-no-error.png';
                if (next.toUpperCase().split('-').length == 1) {
                    if (!this.checkRefresh){
                        this.refreshCanvas(next)
                    }
                }
                if(next.toUpperCase().split('-').length == 1 && !next.toUpperCase().includes('(') && !next.toUpperCase().includes(')')){
                    this.correctInput = false;
                }
                else {
                    this.correctInput = true;
                    if (!this.checkRefresh) {
                        this.refreshCanvas(next)
                    }
                }
            }
            else{
                this.checkError = 'err';
                this.errorMsg = res.message + ' at column ' + res.column + '.';
                this.checkErrorImg = '../../../assets/input-error.png';
                this.correctInput = false;
            }
            this.checkRefresh = false;
        });
    }

    // READY
    genNodeWithAminos(id: number, coords: any, type: string, data?: string[]) {
        let node: AminoGraph;
        switch (type) {
            case 'amino':
                node = {
                    id: id,
                    x: coords.x,
                    fx: coords.x,
                    y: coords.y,
                    fy: coords.y,
                    isGroup: false,
                    isExcept: false,
                    data: data,
                    // isLigand: false,
                };
                break;

            case 'any':
                node = {
                    id: id,
                    x: coords.x,
                    fx: coords.x,
                    y: coords.y,
                    fy: coords.y,
                    isGroup: false,
                    isExcept: false,
                    data: ['ANY'],
                    // isLigand: false,
                };
                break;

            case 'group':
                node = {
                    id: id,
                    x: coords.x,
                    fx: coords.x,
                    y: coords.y,
                    fy: coords.y,
                    isGroup: true,
                    isExcept: false,
                    data: data,
                    // isLigand: false,
                };
                break;

            case 'except':
                node = {
                    id: id,
                    x: coords.x,
                    fx: coords.x,
                    y: coords.y,
                    fy: coords.y,
                    isGroup: false,
                    isExcept: true,
                    data: data,
                    // isLigand: false,
                };
                break;
            // case 'ligand':
            //     node = {
            //         id: id,
            //         x: coords.x,
            //         fx: coords.x,
            //         y: coords.y,
            //         fy: coords.y,
            //         isGroup: false,
            //         isExcept: false,
            //         data: data,
            //         isLigand: true,
            //     };
            //     break;
        }
        return node
    } 

    // READY
    searchFirstGroupPattern(content) {
        this.page = 1;
        var index = Math.floor(Math.random() * this.loadMessages.length)
        this.loadMessage = this.loadMessages[index].message;
        this.loadIcon = this.loadMessages[index].icon;
        this.closeModal = this.modalService.open(content, { centered: true , backdrop: 'static', keyboard: false, size: 'sm' });
        let pattern = this.inputPatternForm.value.pattern.toUpperCase();
        this.comQuery = Parser(pattern+'.');
        let timerInterval;
        if(this.comQuery.message !== 'success') {
            this.ngxNotifierService.createToast(this.comQuery.message, 'danger', 3000);
        }
        else{
            this.results = [];
            timerInterval = setInterval(() => {
                this.timer = this.timer + 10;
            }, 10);
            this.aminoService.getTotalResultsByPattern(this.inputPatternForm.value.pattern.toUpperCase()+'.').subscribe((data: any) => {
                this.collectionSize = data[0].count;
            },
            (error: any) => {
                this.ngxNotifierService.createToast('Sorry, a problem happened, please try again later.', 'error', 3000);
            },
            () => {
                if (this.collectionSize === 0) {
                    this.ngxNotifierService.createToast('No results found for pattern: ' + this.inputPatternForm.value.pattern, 'danger', 3000);
                }
                else{
                    this.closeModal.result.then((result) => {}, (reason) => {});
                    this.aminoService.getResultsByPattern(this.inputPatternForm.value.pattern.toUpperCase()+'.')
                    .subscribe((data: any) => {

                        this.results = data.data.map(item => ({ ...item, pattern:''}));
                        this.filteredResults = this.results;
                        this.onPageChange(1);
                        this.closeModal.close();
                        clearInterval(timerInterval);                        

                        let minutes = Math.floor(this.timer / 60000);
                        let seconds = ((this.timer % 60000) / 1000).toFixed(0);
                        let miliseconds = (this.timer % 1000).toFixed(0);
                        let time = minutes + ':' + (Number(seconds) < 10 ? '0' : '') + seconds + ':' + (Number(miliseconds) < 10 ? '0' : '') + miliseconds;

                        this.ngxNotifierService.createToast(this.collectionSize + ' results found for pattern: ' + this.inputPatternForm.value.pattern + ' in ' + time, 'success', 3000);
                        this.timer = 0;
                    },
                    (error: any) => {

                    },
                    () => {
                        this.results.forEach(res => {
                            var keys = Object.keys(res).filter(string => string.includes('id') && string.includes('amino')).sort();
                            var realPattern: number[] = [];
                            keys.forEach(index => {
                                realPattern.push(res[index].split('_')[2])
                            });
                            let max = Math.max(...realPattern)
                            let min = Math.min(...realPattern)
                            this.aminoService.getListOfAminosByStartEnd(res.protein_id, min, max).subscribe((pattern: any) => {
                                this.foundedPatterns += 1;
                                res['pattern'] = res.het_symbol + ' : ' + pattern.data[0].pattern;
                            });
                        });
                        setTimeout(() => { window.scrollTo(0, window.outerHeight); }, 500);
                        let interval = setInterval(() => {
                            if(this.foundedPatterns === this.results.length){
                                clearInterval(interval);
                                this.ngxNotifierService.createToast('All patterns have been found. You can now download the results.', 'success', 6000);
                            }
                        }, 200);
                    })
                }
            });
        }
    }

    // READY
    onPageChange(event: any){
        this.page = event;
        this.paginateResults = this.filteredResults
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
        setTimeout(() => { window.scrollTo(0, window.outerHeight); }, 25);
    }

    // READY
    openProteinPDB(protein: any) {
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

    // READY
    refreshCanvas(pattern: string){
        var distanceX = -30;
        var distanceY = 0;
        var nodeList = [];
        this.gaps = [];

        let aminos;
        let patternSplit = pattern.split(':');

        if (patternSplit.length == 2) {
            aminos = patternSplit[1].split('-');

            this.ligandList = patternSplit[0].replaceAll('[', '').replaceAll(']', '').split(',').map(ligand => ligand.toUpperCase());
        }

        else {
            aminos = patternSplit[0].split('-');
            this.ligandList = [];
        }

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
                    this.auxIndex++;
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
                    this.auxIndex++;
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
                        this.auxIndex++;
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
                        this.auxIndex++;
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
        // this.graph.zoomToFit();
    }

    // READY
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

    // READY
    getAminoThreeLetter(type: string){
        switch (type) {
            case 'ALA':
                return 'A';
            case 'ARG':
                return 'R';
            case 'ASN':
                return 'N'
            case 'ASP':
                return 'D'
            case 'CYS':
                return 'C'
            case 'GLN':
                return 'Q'
            case 'GLU':
                return 'E'
            case 'GLY':
                return 'G'
            case 'HIS':
                return 'H'
            case 'ILE':
                return 'I'
            case 'LEU':
                return 'L'
            case 'LYS':
                return 'K'
            case 'MET':
                return 'M'
            case 'PHE':
                return 'F'
            case 'PRO':
                return 'P'
            case 'SER':
                return 'S'
            case 'THR':
                return 'T'
            case 'TRP':
                return 'W'
            case 'TYR':
                return 'Y'
            case 'VAL':
                return 'V'
            default:
                return 'X'
        }
    }

    // READY
    onResize(event: any) {
        let divElement = document.getElementById('canvasID');
        this.graph.width(divElement.offsetWidth-4);
        this.graph.height(divElement.offsetHeight-4);
        this.graph.zoomToFit();
    }

    // READY
    up(){
        this.timeoutHandler = setInterval(() => {
            let coords = this.graph.screen2GraphCoords(this.graph.width() / 2, this.graph.height() / 2);
            this.graph.centerAt(coords.x, coords.y + 0.2);
        }, 20);
    }

    // READY
    down(){
        this.timeoutHandler = setInterval(() => {
            let coords = this.graph.screen2GraphCoords(this.graph.width() / 2, this.graph.height() / 2);
            this.graph.centerAt(coords.x, coords.y - 0.2);
        }, 20);
    }

    // READY
    left(){
        this.timeoutHandler = setInterval(() => {
            let coords = this.graph.screen2GraphCoords(this.graph.width() / 2, this.graph.height() / 2);
            this.graph.centerAt(coords.x + 0.2, coords.y);
        }, 20);
    }

    // READY
    right(){
        this.timeoutHandler = setInterval(() => {
            let coords = this.graph.screen2GraphCoords(this.graph.width() / 2, this.graph.height() / 2);
            this.graph.centerAt(coords.x - 0.2, coords.y);
        }, 20);
    }

    // READY
    zoomIn(){
        this.timeoutHandler = setInterval(() => {
            let zoom = this.graph.zoom();
            this.graph.zoom(zoom + 0.3);
        }, 20);
    }

    // READY
    zoomOut(){
        this.timeoutHandler = setInterval(() => {
            let zoom = this.graph.zoom();
            this.graph.zoom(zoom - 0.3);
        }, 20);
    }

    // READY
    clearInterval(){
        clearInterval(this.timeoutHandler);
    }

    // READY
    ngAfterViewInit() {
        this.mouseDown$ = fromEvent(this.el.nativeElement, 'mousedown');
        this.mouseUp$ = fromEvent(this.el.nativeElement, 'mouseup');
    }

    // NEEDS TO BE IMPLEMENTED
    downloadData(){
        if (this.results.length != this.foundedPatterns) {
            this.ngxNotifierService.createToast(`Please wait for all found patterns to be loaded. ${this.foundedPatterns} of ${this.results.length} patterns of results found`, 'danger', 3000);
            return;
        }
        if (this.results.length == 0) {
            this.ngxNotifierService.createToast('No results to export.', 'danger', 3000)
            return;
        };
        this.closeModalDownload = this.modalService.open(DownloadComponent, { centered: true, size: 'md' });
        this.closeModalDownload.result
        .then((res) => {
            let now, nameFile, list, replacer, header, csv, csvArray;
            switch (res) {
                case 'csv':
                    now = new Date();
                    nameFile = 'PPSS_Results_' + now.getDate() + '-' + (now.getMonth()+1) + '-' + now.getFullYear() + '_' + now.getHours() + '-' + now.getMinutes() + '-' + now.getSeconds() + '.csv';
                    list = this.results.map((r, index) => {
                        r = { 'index': (index + 1).toString() , ... r };
                        return r;
                    })
                    replacer = (key, value) => value === null ? '' : value;
                    header = Object.keys(list[0]);
                    csv = list.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
                    csv.unshift(header.join(','));
                    csvArray = csv.join('\r\n');
                    var blob = new Blob([csvArray], { type: 'text/csv' })
                    saveAs(blob, nameFile);
                    this.ngxNotifierService.createToast('Successfully exported results!', 'success', 3000);
                    break;
                case 'xlsx':
                    now = new Date();
                    nameFile = 'PPSS_Results_' + now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear() + '_' + now.getHours() + '-' + now.getMinutes() + '-' + now.getSeconds() + '.xlsx';
                    list = this.results.map((r, index) => {
                        r = { 'index': (index + 1).toString(), ...r };
                        return r;
                    })
                    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(list);
                    const wb: XLSX.WorkBook = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(wb, ws, 'Result PPSS');

                    XLSX.writeFile(wb, nameFile);
                    this.ngxNotifierService.createToast('Successfully exported results!', 'success', 3000);
                    break;
                case 'txt':
                    now = new Date();
                    nameFile = 'PPSS_Results_' + now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear() + '_' + now.getHours() + '-' + now.getMinutes() + '-' + now.getSeconds() + '.txt';
                    list = this.results.map((r, index) => {
                        r = { 'index': (index + 1).toString(), ...r };
                        return r;
                    })
                    replacer = (key, value) => value === null ? '' : value;
                    header = Object.keys(list[0]);
                    csv = list.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
                    csv.unshift(header.join(','));
                    csvArray = csv.join('\r\n');
                    var blob = new Blob([csvArray], { type: 'text/plain' })
                    saveAs(blob, nameFile);
                    this.ngxNotifierService.createToast('Successfully exported results!', 'success', 3000);
                    break;
            
                default:
                    break;
            }
        })
        .catch((error) => {
            this.ngxNotifierService.createToast('The requested file could not be downloaded. Please try again later', 'danger', 3000);
        })
    }

    // READY
    filterTable(term: string, input: string) {
        if (this.filterID == '' && this.filterTitle == '' && this.filterClassification == '' && this.filterOrganism == '' && this.filterPattern == ''){
            this.filteredResults = this.results;
            this.onPageChange(1);
        }
        switch (input) {
            case 'id':
                this.filterID = term;
                break;
            case 'title':
                this.filterTitle = term;
                break;
            case 'classification':
                this.filterClassification = term;
                break;
            case 'organism':
                this.filterOrganism = term;
                break;
            case 'pattern':
                this.filterPattern = term;
                break;
        }
        this.filteredResults = this.results.filter(r => {
            if (r.id.toLowerCase().includes(this.filterID.toLowerCase()) &&
                r.title.toLowerCase().includes(this.filterTitle.toLowerCase()) &&
                r.classification.toLowerCase().includes(this.filterClassification.toLowerCase()) &&
                r.organism.toLowerCase().includes(this.filterOrganism.toLowerCase()) &&
                r.pattern.toLowerCase().includes(this.filterPattern.toLowerCase())
                ){
                    return true;
            }
            return false;
        })
        this.collectionSize = this.filteredResults.length;
        this.onPageChange(1);
    }
}