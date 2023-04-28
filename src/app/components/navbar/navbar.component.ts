import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HowToUseComponent } from '../modals/how-to-use/how-to-use.component';
import { PatternComponent } from '../modals/pattern/pattern.component';
import { ResultsModalsComponent } from '../modals/results/results.component';
import { AboutComponent } from '../modals/about/about.component';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    public isCollapsed = false;

    constructor(
        private modalService: NgbModal,
    ) { }

    toggleNavbar() {
        this.isCollapsed = !this.isCollapsed;
    }

    openTutorialModal() {
        this.modalService.open(HowToUseComponent, { size: 'md', centered: true }).result
        .then((result) => {

        }, (reason) => {

        });
    }

    openPatternModal() {
        this.modalService.open(PatternComponent, { size: 'md', centered: true }).result
            .then((result) => {

            }, (reason) => {

            });
    }

    openResultsModal() {
        this.modalService.open(ResultsModalsComponent, { size: 'md', centered: true }).result
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
