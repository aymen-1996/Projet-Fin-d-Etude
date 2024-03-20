import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { CommandeComponent } from './components/commande/commande.component';
import { DetailcommandeComponent } from './components/commande/detailcommande/detailcommande.component';
import { DetailcartComponent } from './components/detailcart/detailcart.component';
import { HomeComponent } from './components/home/home.component';
import { IntermComponent } from './components/interm/interm.component';
import { ListprodComponent } from './components/listprod/listprod.component';
import { LoginComponent } from './components/login/login.component';
import { PdfComponent } from './components/pdf/pdf.component';
import { DetailproduitComponent } from './components/produit/detailproduit/detailproduit.component';
import { ProduitComponent } from './components/produit/produit.component';
import { ProduitcategorieComponent } from './components/produit/produitcategorie/produitcategorie.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { TesttempComponent } from './testtemp/testtemp.component';

const routes: Routes = [

  {path:"",component:HomeComponent, canActivate:[AuthGuard],children:[
    { path: '', redirectTo: '/produit', pathMatch: 'full' },
    {path:"produit",component:ProduitComponent},
    {path:"listproda",component:IntermComponent},
    {path:"listprod",component:ListprodComponent},
    {path:"detailproduit/:id",component:DetailproduitComponent},
    {path:"detailcart",component:DetailcartComponent},
    {path:"commande",component:CommandeComponent},
    {path:"produitcat/:id",component:ProduitcategorieComponent},
    {path:"detailcommande/:id",component:DetailcommandeComponent},
    {path:"pdf",component:PdfComponent},
    {path:"aboutus",component:AboutusComponent},
  ]},

  {path:"test",component:TesttempComponent},

  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  { path: '**', redirectTo: '' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
