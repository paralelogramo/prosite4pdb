import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pattern',
  templateUrl: './pattern.component.html',
  styleUrls: ['./pattern.component.css']
})
export class PatternComponent implements OnInit{

    constructor(
        private route: ActivatedRoute
    ){}

    ngOnInit(){
        console.log(this.route.snapshot.params['pattern'])
    }
}
