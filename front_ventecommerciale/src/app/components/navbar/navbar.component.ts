import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from 'src/app/services/categorie.service';
import { ClientService } from 'src/app/services/client.service';
import { CommandeService } from 'src/app/services/commande.service';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  categories: any
  totalproduitnumber: number = 0
  term: string = ""
  panier: any[] = [];
  totalPrice: number = 0;
  client: any
  produits: any
  produit: any
  id = this.activatedRoute.snapshot.params['id']
  srcImageProduit: string = "http://localhost:8080/article/files/"



  constructor(private router: Router, private formBuilder: FormBuilder, private datePipe: DatePipe, private categorieService: CategorieService, private commandeService: CommandeService, private activatedRoute: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit(): void {
    console.log(localStorage.getItem('user'))
    this.client = JSON.parse(localStorage.getItem('user') || '{}');
    this.totalproduitnumber = JSON.parse(localStorage.getItem('panier') || ' []').length;
    this.produit = JSON.parse(localStorage.getItem('panier') || ' []');
    console.log("local", this.produit)
    this.getAllcategories();
    this.totalprix();
    // this.updateCart();
  }
  logout() {
    console.log("here logout")
    localStorage.removeItem('state');
    this.router.navigateByUrl('/login')

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
      return item.id !== id;
    }
    );
    this.produit = this.panier
    localStorage.setItem('panier', JSON.stringify(this.panier))
  }


  totalprix() {
    this.produit.forEach((item) => {
      console.log("here item : ", item);

      this.totalPrice = this.totalPrice + (Number(item.quantite_commande) * Number(item.prix));
    });
    let newdate=new Date()
    let commande = {
      date:this.datePipe.transform(newdate, 'yyyy-MM-dd'),

      prix_total: this.totalPrice.toString(),
      quantite_total: this.totalproduitnumber.toString(),

    }

    localStorage.setItem('commande', JSON.stringify(commande));
  
  }

  checkout() {
    let commande = JSON.parse(localStorage.getItem('commande'))

    this.commandeService.savecommande(commande, this.client.id).subscribe((res: any) => {
      console.log("commande:", res)
      console.log("produit before checkout :", this.produit)

      
      this.produit.forEach((item) => {
        this.commandeService.saveDetailcommande(item, item.id, res.id).subscribe((result: any) => {

          console.log("detail:", result)
       
          localStorage.removeItem('panier');
        })
       
      })
    
    })

    

  }


}



