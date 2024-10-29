import { Routes } from '@angular/router';
import { StagesComponent } from './componenets/stages/stages.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: StagesComponent },
];
