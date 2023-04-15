import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import * as $3Dmol from '3dmol';
import { RSCBService } from 'src/app/services/rscbService/rscb.service';
import { Protein } from 'src/app/models/protein.model';
import { AminoService } from 'src/app/services/aminoService/amino.service';
import { RGBAFormat } from '3dmol/build/types/WebGL';
import { chains } from '3dmol';

@Component({
  selector: 'app-protein',
  templateUrl: './protein.component.html',
  styleUrls: ['./protein.component.css']
})
export class ProteinComponent implements OnInit{

    protein: Protein = new Protein();
    viewerRef: any;

    rotationChecked: boolean = false;
    labelChecked: boolean = false;
    
    constructor(
        private rscbService: RSCBService,
        private aminoService: AminoService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.aminoService.getProteinByID(this.route.snapshot.paramMap.get('protein')).subscribe(
            (data: any) => {
                this.protein.id = data.data[0].id;
                this.protein.title = data.data[0].title;
                this.protein.classification = data.data[0].classification;
                this.protein.organism = data.data[0].organism;
            },
            (error: any) => {},
            () => {
                this.rscbService.getProteinInfo(this.route.snapshot.paramMap.get('protein')).subscribe(
                    (data2) => {
                        this.protein.authors = this.setAuthor(data2.audit_author);
                        this.protein.released = data2.rcsb_accession_info.initial_release_date;
                        this.protein.deposited = data2.rcsb_accession_info.deposit_date;
                        this.protein.method = data2.refine[0].pdbx_refine_id;
                        this.protein.resolution = data2.refine[0].ls_dres_high;
                        this.protein.rvaluefree = data2.refine[0].ls_rfactor_rfree;
                        this.protein.rvaluework = data2.refine[0].ls_rfactor_rwork;
                        this.protein.clashscore = data2.pdbx_vrpt_summary.clashscore;
                        this.protein.ramachandran = data2.pdbx_vrpt_summary.percent_ramachandran_outliers;
                        this.protein.sidechain = data2.pdbx_vrpt_summary.percent_rotamer_outliers;
                    },
                    (error: any) => {},
                    () => {
                    }
                )
            }
        );

        var viewer = $3Dmol.createViewer($("#view3D"));
        this.viewerRef = viewer;
        viewer.setConfig({ route: this.route.snapshot.paramMap.get('pattern') });
        $3Dmol.download(
            "pdb:"+this.route.snapshot.paramMap.get('protein'),
            viewer,
            {multimodel:false, frames:true, willReadFrequently: true},
            function(){
                viewer.setStyle({}, { stick: { color: 'gray' }, });
                // viewer.setClickable({}, true, function(atom) {
                //     console.log(atom)
                // });
                viewer.setBackgroundColor(0xebebeb, null);
                viewer.rotate(1,'x');

                var atoms = viewer.selectedAtoms({})
                    .map(a => {
                        var resn
                        switch (a.resn) {
                            case 'ALA':
                                resn = 'A';;
                                break;
                            case 'ARG':
                                resn = 'R';;
                                break;
                            case 'ASN':
                                resn = 'N';
                                break;
                            case 'ASP':
                                resn = 'D';
                                break;
                            case 'CYS':
                                resn = 'C';
                                break;
                            case 'GLN':
                                resn = 'Q';
                                break;
                            case 'GLU':
                                resn = 'E';
                                break;
                            case 'GLY':
                                resn = 'G';
                                break;
                            case 'HIS':
                                resn = 'H';
                                break;
                            case 'ILE':
                                resn = 'I';
                                break;
                            case 'LEU':
                                resn = 'L';
                                break;
                            case 'LYS':
                                resn = 'K';
                                break;
                            case 'MET':
                                resn = 'M';
                                break;
                            case 'PHE':
                                resn = 'F';
                                break;
                            case 'PRO':
                                resn = 'P';
                                break;
                            case 'SER':
                                resn = 'S';
                                break;
                            case 'THR':
                                resn = 'T';
                                break;
                            case 'TRP':
                                resn = 'W';
                                break;
                            case 'TYR':
                                resn = 'Y';
                                break;
                            case 'VAL':
                                resn = 'V';
                                break;
                            default:
                                resn = 'X';
                                break
                        }
                        return ({ resn: resn, resi: a.resi })
                    })
                    .filter((value, index, self) =>
                        index === self.findIndex((t) => (
                            t.resn === value.resn && t.resi === value.resi
                        )));
                var aminos = atoms.map(a => a.resn).join('');
                var resids = atoms.map(a => a.resi);

                var route = viewer.getConfig().route;

                var indexes = [...aminos.matchAll(new RegExp(route, 'gi'))].map(a => a.index)


                indexes.forEach(index => {
                    for (let i = 0; i < route.length; i++) {
                        viewer.setStyle({ resi: resids[index+i]}, { stick: { color: 'red' }, });
                    } 
                });

                viewer.render();
            }
        );
    }

    setAuthor(authors: any) {
        var authorComplete = "";
        authors.forEach(author => {
            authorComplete += author.name + ", ";
        });
        return authorComplete.slice(0, -2);
    }

    onChangeSelect(target: any) {
        switch (target.value) {
            case "cartoon":
                this.viewerRef.setStyle({}, {cartoon:{color:'spectrum'}});
                break;
            case "stick":
                this.viewerRef.setStyle({}, {stick:{color:'spectrum'}});
                break;
            case "sphere":
                this.viewerRef.setStyle({}, {sphere:{color:'spectrum'}});
                break;
            case "line":
                this.viewerRef.setStyle({}, {line:{color:'spectrum'}});
                break;
            case "cross":
                this.viewerRef.setStyle({}, {cross:{color:'spectrum'}});
                break;
        }
        this.viewerRef.render();
    }

    onChangeRotation() {
        this.rotationChecked = !this.rotationChecked;
        this.viewerRef.spin('y', +this.rotationChecked/2);
        this.viewerRef.render();
    }

    onChangeLabel() {
        this.labelChecked = !this.labelChecked;
        if (this.labelChecked)
            this.viewerRef.addResLabels({hetflag:false}, {font: 'Arial', fontSize: 18, fontColor:'white',showBackground:true,backgroundColor:'black',backgroundOpacity:0.5});
        else
            this.viewerRef.removeAllLabels();
        this.viewerRef.render();
    }

    onChangeInformation() {
        // crear un contenedor de la informacion.
    }

    changeTab(tab: string) {
        console.log(tab)
        // do something
    }
}
