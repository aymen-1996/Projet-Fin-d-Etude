import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproduitComponent } from './components/produit/addproduit/addproduit.component';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ListproduitComponent } from './components/produit/listproduit/listproduit.component';
import { RegisterComponent } from './components/register/register.component';
import { DetailproduitComponent } from './components/produit/detailproduit/detailproduit.component';
import { ListuserComponent } from './components/user/listuser/listuser.component';
import { DetailuserComponent } from './components/user/detailuser/detailuser.component';
import { ListcategorieComponent } from './components/categorie/listcategorie/listcategorie.component';
import { AddcategorieComponent } from './components/categorie/addcategorie/addcategorie.component';
import { UpdatecategorieComponent } from './components/categorie/updatecategorie/updatecategorie.component';
import { AuthGuard } from './guards/auth.guard';
import { ListfournisseurComponent } from './components/fournisseur/listfournisseur/listfournisseur.component';
import { FournisseurnoactiveComponent } from './components/fournisseur/fournisseurnoactive/fournisseurnoactive.component';
import { DetailfournisseurComponent } from './components/fournisseur/detailfournisseur/detailfournisseur.component';
import { ProfilComponent } from './components/fournisseur/profil/profil.component';
import { AffichageComponent } from './components/affichage/affichage.component';
import { DetailaffComponent } from './components/affichage/detailaff/detailaff.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListcommandeComponent } from './components/listcommande/listcommande.component';
import { ListlivraisonfourComponent } from './components/listcommande/listlivraisonfour/listlivraisonfour.component';
import { StatfourComponent } from './components/dashboard/statfour/statfour.component';
import { NavfootComponent } from './components/affichage/navfoot/navfoot.component';
import { UpdatenavfootComponent } from './components/affichage/navfoot/updatenavfoot/updatenavfoot.component';
import { FordetailComponent } from './components/fordetail/fordetail.component';
import { StatbyfourComponent } from './components/fordetail/statbyfour/statbyfour.component';
import { FournisseurcordComponent } from './components/fordetail/fournisseurcord/fournisseurcord.component';
import { DetailcmdComponent } from './components/listcommande/detailcmd/detailcmd.component';



const routes: Routes = [
  {
    path: "", component: HomeComponent, canActivate: [AuthGuard], children: [
      { path: "listproduit", component: ListproduitComponent },
       { path: 'detailfournisseuract/:id', redirectTo: '/fourcord/:id', pathMatch: 'full' },
      { path: "listcommande", component: ListcommandeComponent },
      {path: "livraison", component: ListlivraisonfourComponent },
      { path: "affichage", component: AffichageComponent },
      { path: "addproduit", component: AddproduitComponent },
      { path: "detailproduit/:id", component: DetailproduitComponent },
      { path: "listuser", component: ListuserComponent },
      { path: "detailuser/:id", component: DetailuserComponent },
      { path: "updateaff/:id", component: DetailaffComponent },
      { path: "profil/:id", component: ProfilComponent },
      { path: "listcategorie", component: ListcategorieComponent },
      { path: "addcategorie", component: AddcategorieComponent },
      { path: "updatecategorie/:id", component: UpdatecategorieComponent },
      { path: "listfournisseur", component: ListfournisseurComponent },
      { path: "listfournisseurnoact", component: FournisseurnoactiveComponent },
      { path: "detailfournisseuract/:id", component: DetailfournisseurComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "statfour", component:StatfourComponent },
      { path: "navfoot", component:NavfootComponent },
      { path: "fourdetail/:id", component:FordetailComponent },
      { path: "statbyfour/:id", component:StatbyfourComponent },
      { path: "fourcord/:id", component:FournisseurcordComponent },
      { path: "updatenavfoot/:id", component:UpdatenavfootComponent },
      {path:"detailcommande/:id",component:DetailcmdComponent},
      
    ]
  },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
