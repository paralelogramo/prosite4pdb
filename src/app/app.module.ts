import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import { ToolComponent } from './pages/tool/tool.component';
import { ResultsComponent } from './components/results/results.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { NgxNotifierModule } from 'ngx-notifier';
import { ModalSelectAminoComponent } from './components/modals/modal-select-amino/modal-select-amino.component';
import { CanvasRightClickMenuComponent } from './components/modals/canvas-right-click-menu/canvas-right-click-menu.component';
import { ButtonRightClickMenuComponent } from './components/modals/button-right-click-menu/button-right-click-menu.component';
import { HowToUseComponent } from './components/modals/how-to-use/how-to-use.component';
import { PatternComponent } from './pages/pattern/pattern.component';
import { AboutComponent } from './components/modals/about/about.component';
import { InfoProteinModalComponent } from './components/modals/info-protein-modal/info-protein-modal.component';
import { ProteinComponent } from './pages/protein/protein.component';
import { LinkRightClickMenuComponent } from './components/modals/link-right-click-menu/link-right-click-menu.component';
import { SetAminoGapComponent } from './components/modals/set-amino-gap/set-amino-gap.component';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { MinMaxGapComponent } from './components/modals/min-max-gap/min-max-gap/min-max-gap.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CanvasComponent,
    NotfoundComponent,
    FooterComponent,
    ToolComponent,
    ResultsComponent,
    ModalSelectAminoComponent,
    CanvasRightClickMenuComponent,
    ButtonRightClickMenuComponent,
    HowToUseComponent,
    PatternComponent,
    AboutComponent,
    InfoProteinModalComponent,
    ProteinComponent,
    LinkRightClickMenuComponent,
    SetAminoGapComponent,
    CustomDatePipe,
    MinMaxGapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxNotifierModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
