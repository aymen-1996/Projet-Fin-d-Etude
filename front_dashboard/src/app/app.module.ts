import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddproduitComponent } from './components/produit/addproduit/addproduit.component';
import { ListproduitComponent } from './components/produit/listproduit/listproduit.component';
import { ListuserComponent } from './components/user/listuser/listuser.component';
import { DetailuserComponent } from './components/user/detailuser/detailuser.component';
import { DetailproduitComponent } from './components/produit/detailproduit/detailproduit.component';
import { ListcategorieComponent } from './components/categorie/listcategorie/listcategorie.component';
import { UpdatecategorieComponent } from './components/categorie/updatecategorie/updatecategorie.component';
import { AddcategorieComponent } from './components/categorie/addcategorie/addcategorie.component';
import { UserService } from './services/user.service';
import { AuthGuard } from './guards/auth.guard';
import { ListfournisseurComponent } from './components/fournisseur/listfournisseur/listfournisseur.component';
import { SearchPipe } from './pipes/search.pipe';
import { RecherchePipe } from './pipes/recherche.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetailfournisseurComponent } from './components/fournisseur/detailfournisseur/detailfournisseur.component';
import { FournisseurnoactiveComponent } from './components/fournisseur/fournisseurnoactive/fournisseurnoactive.component';
import { ProfilComponent } from './components/fournisseur/profil/profil.component';
import { AffichageComponent } from './components/affichage/affichage.component';
import { DetailaffComponent } from './components/affichage/detailaff/detailaff.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DatePipe } from '@angular/common';
import { ListcommandeComponent } from './components/listcommande/listcommande.component';
import { ListlivraisonfourComponent } from './components/listcommande/listlivraisonfour/listlivraisonfour.component';
import { CherchedatPipe } from './pipes/cherchedat.pipe';
import { StatfourComponent } from './components/dashboard/statfour/statfour.component';
import { NavfootComponent } from './components/affichage/navfoot/navfoot.component';
import { UpdatenavfootComponent } from './components/affichage/navfoot/updatenavfoot/updatenavfoot.component';
import { FordetailComponent } from './components/fordetail/fordetail.component';
import { StatbyfourComponent } from './components/fordetail/statbyfour/statbyfour.component';
import { FournisseurcordComponent } from './components/fordetail/fournisseurcord/fournisseurcord.component';
import { DetailcmdComponent } from './components/listcommande/detailcmd/detailcmd.component';
import { JwtInterceptor } from './interceptor/jwtInterceptor';
import { ErrorInterceptor } from './interceptor/errorInterceptor';
import { NgChartsModule } from 'ng2-charts';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    AddproduitComponent,
    DetailproduitComponent,
    ListproduitComponent,
    ListuserComponent,
    DetailuserComponent,
    ListcategorieComponent,
    UpdatecategorieComponent,
    AddcategorieComponent,
    ListfournisseurComponent,
    FournisseurnoactiveComponent,
    SearchPipe,
    RecherchePipe,
    DetailfournisseurComponent,
    ProfilComponent,
    AffichageComponent,
    DetailaffComponent,
    DashboardComponent,
    ListcommandeComponent,
    ListlivraisonfourComponent,
    CherchedatPipe,
    StatfourComponent,
    NavfootComponent,
    UpdatenavfootComponent,
    FordetailComponent,
    StatbyfourComponent,
    FournisseurcordComponent,
    DetailcmdComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgChartsModule

  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
