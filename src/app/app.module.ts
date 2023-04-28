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
import { ResultsModalsComponent } from './components/modals/results/results.component';
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
import { MinMaxGapComponent } from './components/modals/min-max-gap/min-max-gap.component';
import { LoginComponent } from './pages/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { SelectLigandComponent } from './components/modals/select-ligand/select-ligand.component';
import { ConfigQueryComponent } from './components/modals/config-query/config-query.component';
import { customTextLigandPipe } from './pipes/custom-text-ligand.pipe';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CanvasComponent,
    NotfoundComponent,
    FooterComponent,
    ToolComponent,
    ResultsModalsComponent,
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
    customTextLigandPipe,
    MinMaxGapComponent,
    LoginComponent,
    SelectLigandComponent,
    ConfigQueryComponent
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
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase},
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
