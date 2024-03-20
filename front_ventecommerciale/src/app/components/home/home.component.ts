import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { CategorieService } from 'src/app/services/categorie.service';
import { CommandeService } from 'src/app/services/commande.service';
import { ProduitService } from 'src/app/services/produit.service';
import { CommunService } from 'src/app/services/commun.service';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentification.service';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: any
  totalproduitnumber: number = 0
  term: string=''
  panier: any[] = [];
  totalPrice: number = 0;
  client: any
  quantite: number = 0
  produits: any
  produit: any
  article:any[]=[];
  quantite_commande:number = 0
  CommandeSuccess: boolean = false;
  id = this.activatedRoute.snapshot.params['id']
  srcImageProduit: string = "http://localhost:8080/article/files/"
nav:any
  formProduit: FormGroup

  nombreHome:number = 0;
  currentUser: User;
  color:string="black"

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private datePipe: DatePipe,
    private categorieService: CategorieService,
    private commandeService: CommandeService,
    private produitService: ProduitService,
    private activatedRoute: ActivatedRoute,
    private communService:CommunService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
    this.communService.castnombre.subscribe((res:any) => this.nombreHome = res);
    this.totalproduitnumber== JSON.parse(localStorage.getItem('panier') || ' []').length;
    this.nombreHome = JSON.parse(localStorage.getItem('nombre') )
    if (localStorage.getItem('panier') == null) {
      localStorage.setItem('panier', '[]')
    }

    console.log(localStorage.getItem('user'))
    this.client = JSON.parse(localStorage.getItem('user') || '{}');
    this.produit = JSON.parse(localStorage.getItem('panier') || ' []');

    console.log("local", this.produit)
    this.getAllcategories();
    this.totalprix();
    this.navfootById()
    // this.updateCart();
  }
  plus(){
    this.communService.editNombre();
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  navfootById(){
    this.produitService.getanavfootid(1).subscribe((res:any)=>{
      this.nav=res
      console.log("produit",this.nav)
    });
  }

  getAllcategories() {
    this.categorieService.getAllCategorie().subscribe((res: any) => {
      this.categories = res;
      console.log("categories : ", res);
    })

  }

  navigateProduitCategory(id: any) {
    this.router.navigateByUrl("/produitcat/" + id)

  }
  recherche() {
    localStorage.setItem("recherche", this.term);
    this.router.navigateByUrl("listproda")

  }

  async deletepanier(id: any) {
    this.panier = await JSON.parse(localStorage.getItem("panier") || "[]")
    this.panier = this.panier.filter((item) => {
      if(item.id == id ){
        let nombre = Number(localStorage.getItem('nombre'))-1
        localStorage.setItem('nombre',nombre.toString())
      }
      return item.id !== id;
    }
    );
    this.produit = this.panier
    localStorage.setItem('panier', JSON.stringify(this.panier))
    this.totalproduitnumber = JSON.parse(localStorage.getItem('panier') || ' []').length;
    this.nombreHome = JSON.parse(localStorage.getItem('nombre'))
    this.totalprix();
    localStorage.getItem('nomber')

  }


  totalprix() {
    this.totalPrice = 0
    this.quantite_commande=0
    this.produit.forEach((item) => {
      console.log("here item : ", item);

      this.totalPrice = this.totalPrice + (Number(item.quantite_commande) * Number(item.prix));
    });
    let newdate = new Date()
    let commande = {
      date: this.datePipe.transform(newdate, 'yyyy-MM-dd'),

      prix_total: this.totalPrice.toString(),
      quantite_total: JSON.parse(localStorage.getItem('panier') || ' []').length,

    }


    localStorage.setItem('commande', JSON.stringify(commande));

    

  }
  checkout() {
    let commande = JSON.parse(localStorage.getItem('commande'))
    this.commandeService.savecommande(commande, this.client.id).subscribe((res: any) => {
      console.log("check:", res)
      console.log("produit before checkout :", this.produit)
      this.produit.forEach((item) => {
        let detail_commande = {
        
          prix_total: this.totalPrice.toString(),
          quantite_commande: item.quantite_commande
    
        }
       let article=this.produit
       localStorage.setItem('article', JSON.stringify(article));
        localStorage.setItem('detail_commande', JSON.stringify(detail_commande));
        this.commandeService.saveDetailcommande(detail_commande,item.id, res.id).subscribe((result: any) => {

          console.log("detai:", result)

        })
      })
    
    }
    
    ) 
    this.produit.forEach(element => {
      console.log("element is ", element);
      this.produitService.updateQuantiteProduit(element, element.id).subscribe((result1: any) => {
        element.quantite = element.quantite + Number(element.quantite - element.quantite_commande)
        console.log('here condition');

        console.log("detail:", result1)
        console.log("quantity:", this.quantite)
        
        localStorage.setItem('panier', JSON.stringify(this.panier))
        this.totalproduitnumber = JSON.parse(localStorage.getItem('panier') || ' []').length;
        this.nombreHome = JSON.parse(localStorage.getItem('nombre') )
        this.totalprix();
        localStorage.getItem('panier') || ' []'.length
        localStorage.removeItem('panier');
        localStorage.setItem('nombre','0');
        this.router.navigateByUrl('/pdf')

      });
     
    })
  }

  async eventOnChange(event: any) {
    console.log("here update")
    this.produit = JSON.parse(localStorage.getItem('panier') || ' []');

    this.totalproduitnumber = JSON.parse(localStorage.getItem('panier') || ' []').length;

    this.totalprix();
  }




}







