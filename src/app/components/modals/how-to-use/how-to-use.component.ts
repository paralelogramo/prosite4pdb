import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

interface Slide {
    imageURL: string;
    texts: string[];
}

@Component({
    selector: 'app-how-to-use',
    templateUrl: './how-to-use.component.html',
    styleUrls: ['./how-to-use.component.css']
})
export class HowToUseComponent implements OnInit {

    tutorialSelected: string = 'none';
    ligandSlides: Slide[] = [
        {
            imageURL: './assets/tutorial/ligand-1.png',
            texts: [
                "To change the ligand, you must click on the button at the top left of the screen (see image).",
                "If no ligand is defined, the button will say 'ANY'. If only one ligand is defined it will show the ligand name and if more than one ligand is defined it will say 'LIGANDS'."
            ]
        },
        {
            imageURL: './assets/tutorial/ligand-2.png',
            texts: [
                "Two lists will be displayed, the first one shows the list of available ligands and the second one shows the list of selected ligands.",
                "Each list has a filter that allows you to quickly search for the required ligand, which can be found at the bottom of each list."
            ]
        },
        {
            imageURL: './assets/tutorial/ligand-3.png',
            texts: [
                "If you want to add a ligand from the available list just click on it and it will light up, that means it is selected.",
                "You can search for links even if you have already selected some, they will be saved even if they are not shown in the filtered list.",
                "to add just click on the 'Add Ligands' button."
            ]
        },
        {
            imageURL: './assets/tutorial/ligand-4.png',
            texts: [
                "Once added, the required ligands will be displayed in the list of selected ligands, which in turn will be removed from the list of available ligands."
            ]
        },
        {
            imageURL: './assets/tutorial/ligand-5.png',
            texts: [
                "If you want to remove a ligand from the list, you must follow the same indications for the add feature",
                "To select just click on the ligand and you can filter within the selected ligands.",
                "To confirm the removal of ligands you must click on the 'Delete Ligands' button."
            ]
        },
        {
            imageURL: './assets/tutorial/ligand-6.png',
            texts: [
                "Once you have correctly configured the required ligands, click on the 'Save' button."
            ]
        },
        {
            imageURL: './assets/tutorial/ligand-7.png',
            texts: [
                "After closing the window the link button will change and the text will also replace the old configuration with the new one."
            ]
        },
    ];

    graphSlides: Slide[] = [
        {
            imageURL: './assets/tutorial/graph-1.png',
            texts: [
                "If you right click on the canva a menu will appear with the options to add one of the 4 types of nodes: Single Amino, Any Amino, Amino Group and Amino Exception.",
                "You can also adjust the graph to the size of the canva."
            ]
        },
        {
            imageURL: './assets/tutorial/graph-2.png',
            texts: [
                "When an amino is added inside the canva a node is added as shown in the image on the lefthand.",
                "The pattern is also updated when amino is added or when a change in one of them is made."
            ]
        },
        {
            imageURL: './assets/tutorial/graph-3.png',
            texts: [
                "There are four types of nodes: unique amino, any amino, amino group and amino exception.",
                "Each is represented by a color: the unique amino is blue, the any amino is orange, the group is purple and the exception is green.",
                "The nodes of the single amino acids are shown according to the amino acid that is selected."
            ]
        },
        {
            imageURL: './assets/tutorial/graph-4.png',
            texts: [
                "Clicking on a node displays a menu where you can select the amino acid(s) you want to use.",
                "If it is a single amino you can only select one amino from the list.",
                "If it is an amino group or an amino exception you can select more than one at the same time."
            ]
        },
        {
            imageURL: './assets/tutorial/graph-5.png',
            texts: [
                "Right-clicking on a node will display a menu where you can select whether to choose one of the two link types or to delete the node.",
                "The link types are: 'Next' which means that an amino 'A' is followed by amino 'B' and the 'Gap' which represents a jump between two aminos."
            ]
        },
        {
            imageURL: './assets/tutorial/graph-6.png',
            texts: [
                "Once an option is selected the source node lights up and you can select another node to add the link between them.",
                "If you want to cancel the creation of the link just click inside the canva."
            ]
        },
        {
            imageURL: './assets/tutorial/graph-7.png',
            texts: [
                "If the link is successfully created, an arrow is created between the two amino acids indicating from which node it starts to which node it ends, and the word 'Next' is included if this option was selected."
            ]
        },
        {
            imageURL: './assets/tutorial/graph-8.png',
            texts: [
                "If you have selected the 'Gap' option, a window appears to select the minimum and maximum of the jump between amino acids.",
                "The minimum must be greater than or equal to 0.",
                "The maximum must be greater than the minimum."
            ]
        },
        {
            imageURL: './assets/tutorial/graph-9.png',
            texts: [
                "When the 'Gap' is created it is displayed similar to 'Next' with the difference that now the text takes the form 'X(a,b)' where a is the minimum and b is the maximum.",
                "You can click on the link again to edit the minimum and maximum graphically."
            ]
        },
        {
            imageURL: './assets/tutorial/graph-10.png',
            texts: [
                "If you want to delete a link just right click on the link and click on the 'Delete Link' option."
            ]
        }
    ];

    textSlides: Slide[] = [
        {
            imageURL: './assets/tutorial/text-1.png',
            texts: [
                "In the bottom part there is a text field where the pattern is constructed textually.",
                "The pattern is defined under certain rules, for more information see the 'Pattern' window located in the navigation bar at the top."
            ]
        },
        {
            imageURL: './assets/tutorial/text-2.png',
            texts: [
                "Depending on what is written are the changes that can be reflected in the canva.",
                "Always the ligand or the list of ligands goes at the top.",
                "The pattern is defined under certain rules, for more information see the 'Pattern' window located in the navigation bar at the top."
            ]
        },
        {
            imageURL: './assets/tutorial/text-3.png',
            texts: [
                "The same applies to aminos.",
                "The pattern is defined under certain rules, for more information see the 'Pattern' window located in the navigation bar at the top."
            ]
        },
        {
            imageURL: './assets/tutorial/text-4.png',
            texts: [
                "It also supports the combination of ligands with aminos.",
                "The pattern is defined under certain rules, for more information see the 'Pattern' window located in the navigation bar at the top."
            ]
        }
    ];

    constructor(
        public activeModal: NgbActiveModal,
    ) { }

    ngOnInit() {}

    onClose() {
        this.activeModal.close();
    }

    changeView(tutorial: string) {
        this.tutorialSelected = tutorial;
    }

    goBack() {
        this.tutorialSelected = 'none';
    }
}
