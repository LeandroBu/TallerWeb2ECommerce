import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { BebidasComponent } from './components/bebidas/bebidas.component';
import { HomeComponent } from './components/home/home.component';
import { VinoComponent } from './components/vino/vino.component';
import { WhiskyComponent } from './components/whisky/whisky.component';


const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'bebidas', component: BebidasComponent},
  {path: 'login', component:AuthComponent},
  {path: 'vino', component:VinoComponent},
  {path: 'whisky', component:WhiskyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
