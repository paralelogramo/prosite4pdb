import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HowToUseComponent } from '../modals/how-to-use/how-to-use.component';
import { ResultsModalsComponent } from '../modals/results/results.component';
import { AboutComponent } from '../modals/about/about.component';
import { PatternModalComponent } from '../modals/pattern-modal/pattern-modal.component';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
    public isCollapsed = false;

    constructor(
        private modalService: NgbModal,
    ) { }

    toggleNavbar() {
        this.isCollapsed = !this.isCollapsed;
    }

    ngOnInit() {
    }

    openTutorialModal() {
        this.modalService.open(HowToUseComponent, { size: 'xl', centered: true }).result
        .then((result) => {

        }, (reason) => {

        });
    }

    openPatternModal() {
        this.modalService.open(PatternModalComponent, { size: 'xl', centered: true }).result
            .then((result) => {

            }, (reason) => {

            });
    }

    openResultsModal() {
        this.modalService.open(ResultsModalsComponent, { size: 'lg', centered: true }).result
            .then((result) => {

            }, (reason) => {

            });
    }

    openAboutModal() {
        this.modalService.open(AboutComponent, { size: 'md', centered: true }).result
            .then((result) => {

            }, (reason) => {

            });
    }
}
