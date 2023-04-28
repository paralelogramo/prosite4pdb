import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasComponent } from './components/canvas/canvas.component';
import { PatternComponent } from './pages/pattern/pattern.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ToolComponent } from './pages/tool/tool.component';
import { ProteinComponent } from './pages/protein/protein.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { AboutComponent } from './pages/about/about.component';
import { SelectLigandComponent } from './components/modals/select-ligand/select-ligand.component';
import { DevGuard } from './guards/dev.guard';

const routes: Routes = [
  { path: '', redirectTo: '/tool', pathMatch: 'full' },
  { path: 'tool', component: ToolComponent, canActivate: [AuthGuard] },
  { path: 'pattern/:pattern', component: PatternComponent, canActivate: [AuthGuard, DevGuard] },
  { path: 'protein/:protein/:pattern', component: ProteinComponent, canActivate: [AuthGuard, DevGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
