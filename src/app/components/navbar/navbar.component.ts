import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public isCollapsed = false;

  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }

  openTutorialModal() {
    
  }

  openPatternModal() {
    
  }

  openResultsModal() {
    
  }

  openAboutModal() {
    
  }
}
