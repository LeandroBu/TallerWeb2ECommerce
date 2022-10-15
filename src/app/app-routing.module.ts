import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BebidasComponent } from './bebidas/bebidas.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { VinoComponent } from './vino/vino.component';
import { WhiskyComponent } from './whisky/whisky.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'bebidas', component: BebidasComponent},
  {path: 'login', component:LoginComponent},
  {path: 'vino', component:VinoComponent},
  {path: 'whisky', component:WhiskyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
