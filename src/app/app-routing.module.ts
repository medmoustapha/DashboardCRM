  import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {ChartsComponent} from './charts/charts.component';
import {MapsComponent} from './maps/maps.component';
import {HomeComponent} from './home/home.component';
import {ProduitComponent} from './produit/produit.component';
import {EvenementComponent} from './evenement/evenement.component';
import { CommercialComponent } from './commercial/commercial.component';
  import { CommandeCltComponent } from './commande-clt/commande-clt.component';



const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'charts', component: ChartsComponent},
  {path: 'maps', component: MapsComponent},
  {path: 'produit', component: ProduitComponent},
  {path: 'evenement', component: EvenementComponent},
  {path: 'commercial', component: CommercialComponent},
  {path: 'CommandeClt', component: CommandeCltComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
