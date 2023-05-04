import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

interface PatternSlide {
    imageURL: string;
    texts: string[];
}

@Component({
    selector: 'app-pattern-modal',
    templateUrl: './pattern-modal.component.html',
    styleUrls: ['./pattern-modal.component.css']
})
export class PatternModalComponent implements OnInit{

    patternSlides: PatternSlide[] = [
        {
            imageURL: './assets/tutorial/pattern-1.png',
            texts: [
                "When the text field receiving the pattern is empty, the placeholder is displayed.",
                "This placeholder shows a complete example making use of all the functionalities provided by the pattern defined for PPSS."
            ]
        },
        {
            imageURL: './assets/tutorial/pattern-2.png',
            texts: [
                "Ligands can be defined by calling their 1 to 3 letter coded names.",
                "If you only want to define 1 ligand, just write the symbol of that ligand."
            ]
        },
        {
            imageURL: './assets/tutorial/pattern-3.png',
            texts: [
                "If you wish to define more than one ligand, they must be separated by commas (',') and square brackets ('[' and ']').",
                "No matter if you repeat one, the platform will take it only once."
            ]
        },
        {
            imageURL: './assets/tutorial/pattern-4.png',
            texts: [
                "A total of 20 defined aminos and one undefined amino called 'any' are contemplated.",
                "To define that an amino follows another one you must write between each amino a dash ('-')."
            ]
        },
        {
            imageURL: './assets/tutorial/pattern-5.png',
            texts: [
                "If you wish to repeat a specific amino many times, you must write between normal parenthesis ('(' and ')') a number, accompanying the right side of the amino.",
                "The number must be a positive integer greater than 0."
            ]
        },
        {
            imageURL: './assets/tutorial/pattern-6.png',
            texts: [
                "If you want to define a gap between two amino acids, you must write the letter 'x' between them, accompanied on the right side by the range that contemplates the gap.",
                "The range is composed of a minimum and a maximum, where the minimum must be greater than or equal to 0 and the maximum must be greater than the minimum."
            ]
        },
        {
            imageURL: './assets/tutorial/pattern-7.png',
            texts: [
                "The definitions of ligands and aminos can be used together by separating the two sections by a colon."
            ]
        },
        
    ];

    constructor(
        public activeModal: NgbActiveModal,
    ) { }

    ngOnInit() { }

    onClose() {
        this.activeModal.close();
    }
}
