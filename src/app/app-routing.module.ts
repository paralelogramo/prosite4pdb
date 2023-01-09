import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasComponent } from './components/canvas/canvas.component';
import { PatternComponent } from './pages/pattern/pattern.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ToolComponent } from './pages/tool/tool.component';
import { ProteinComponent } from './pages/protein/protein.component';

const routes: Routes = [
  { path: '', redirectTo: '/prosite4pdb/tool', pathMatch: 'full' },
  { path: 'prosite4pdb/tool', component: ToolComponent},
  { path: 'prosite4pdb/pattern/:pattern', component: PatternComponent },
  { path: 'prosite4pdb/protein/:protein', component: ProteinComponent},
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
