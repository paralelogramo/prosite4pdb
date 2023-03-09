import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import * as $3Dmol from '3dmol';
import { RSCBService } from 'src/app/services/rscbService/rscb.service';
import { Protein } from 'src/app/models/protein.model';
import { AminoService } from 'src/app/services/aminoService/amino.service';

@Component({
  selector: 'app-protein',
  templateUrl: './protein.component.html',
  styleUrls: ['./protein.component.css']
})
export class ProteinComponent implements OnInit{

    protein: Protein = new Protein();
    viewerRef: any;
    
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
            });
        var viewer = $3Dmol.createViewer($("#view3D"));
        this.viewerRef = viewer;
        $3Dmol.download("pdb:"+this.route.snapshot.paramMap.get('protein'),viewer,{multimodel:true, frames:true, willReadFrequently: true },function(){
            viewer.setStyle({}, {cartoon:{color:'spectrum'}});
            viewer.setBackgroundColor(0xebebeb);
            viewer.rotate(1,'x');
            viewer.render();
        });

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

    onChangeRotation(event: any) {
        this.viewerRef.spin('y', +event.target.checked/2);
        this.viewerRef.render();
    }

    onChangeLabel(event: any) {
        if (event.target.checked)
            this.viewerRef.addResLabels({hetflag:false}, {font: 'Arial', fontSize: 16, fontColor:'black',showBackground:false});
        else
            this.viewerRef.removeAllLabels();
        this.viewerRef.render();
    }
}
