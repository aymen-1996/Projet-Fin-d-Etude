import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProduitComponent } from './components/produit/produit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DetailproduitComponent } from './components/produit/detailproduit/detailproduit.component';
import { ProduitcategorieComponent } from './components/produit/produitcategorie/produitcategorie.component';
import { DetailcartComponent } from './components/detailcart/detailcart.component';
import { RecherhePipe } from './pipes/recherhe.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListprodComponent } from './components/listprod/listprod.component';
import { IntermComponent } from './components/interm/interm.component';
import { CommandeComponent } from './components/commande/commande.component';
import { DetailcommandeComponent } from './components/commande/detailcommande/detailcommande.component';
import { DatePipe } from '@angular/common';
import { PdfComponent } from './components/pdf/pdf.component';
import { TesttempComponent } from './testtemp/testtemp.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { JwtInterceptor } from './interceptor/jwtInterceptor';
import { ErrorInterceptor } from './interceptor/errorInterceptor';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ProduitComponent,
    LoginComponent,
    RegisterComponent,
    DetailproduitComponent,
    ProduitcategorieComponent,
    DetailcartComponent,
    RecherhePipe,
    ListprodComponent,
    IntermComponent,
    CommandeComponent,
    DetailcommandeComponent,
    PdfComponent,
    TesttempComponent,
    AboutusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
     FormsModule,
     HttpClientModule,
     NgxPaginationModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
