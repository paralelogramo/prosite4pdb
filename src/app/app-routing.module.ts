import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasComponent } from './components/canvas/canvas.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ToolComponent } from './pages/tool/tool.component';

const routes: Routes = [
  { path: '', redirectTo: '/prosite4pdb', pathMatch: 'full' },
  { path: 'prosite4pdb', component: ToolComponent},
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
