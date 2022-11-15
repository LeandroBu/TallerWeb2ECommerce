import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { BebidasComponent } from './components/bebidas/bebidas.component';
import { HomeComponent } from './components/home/home.component';
import { VinoComponent } from './components/vino/vino.component';
import { WhiskyComponent } from './components/whisky/whisky.component';
import { InfoBebidaComponent } from './components/info-bebida/info-bebida.component';
import { VodkaComponent } from './components/vodka/vodka.component';


const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'bebidas', component: BebidasComponent},
  {path: 'login', component:AuthComponent},
  {path: 'vino', component:VinoComponent},
  {path: 'vodka', component: VodkaComponent},
  {path: 'whisky', component:WhiskyComponent},
  {path: 'info/:id', component:InfoBebidaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
