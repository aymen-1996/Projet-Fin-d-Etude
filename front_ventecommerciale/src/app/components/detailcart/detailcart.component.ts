import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeService } from 'src/app/services/commande.service';
import { CommunService } from 'src/app/services/commun.service';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-detailcart',
  templateUrl: './detailcart.component.html',
  styleUrls: ['./detailcart.component.css']
})
export class DetailcartComponent implements OnInit {
  term:string=""
  panier:any
  prix:any
  client:any
  produits:any
  quantite:number=1
  totalPrice:number=0
  quantite_commande:any
  produit:any
  nombre:number=0
  nombreHome:number=0
  totalproduitnumber:number=0
  id = this.activatedRoute.snapshot.params['id']
  srcImageProduit:string = "http://localhost:8080/article/files/"

  constructor(private router:Router, private produitService:ProduitService ,private commandeService: CommandeService, private activatedRoute:ActivatedRoute,private communService:CommunService, private datePipe: DatePipe ) { }

  ngOnInit(): void {
    this.communService.castnombre.subscribe((res:any) => this.nombreHome = res);
    this.totalproduitnumber== JSON.parse(localStorage.getItem('panier') || ' []').length;
    this.nombreHome = JSON.parse(localStorage.getItem('nombre'))
    if (localStorage.getItem('panier') == null) {
      localStorage.setItem('panier', '[]')
    }

    console.log(localStorage.getItem('user'))
    this.client = JSON.parse(localStorage.getItem('user') || '{}');
    this.produit = JSON.parse(localStorage.getItem('panier') || ' []');

    console.log("local", this.produit)
    this.totalprix();

  }
deletepanier(id:any){
    this.panier = JSON.parse(localStorage.getItem("panier") || "[]")
    this.panier = this.panier.filter( (item) =>
      {
        if(item.id == id ){
          let nombre = Number(localStorage.getItem('nombre'))-1
          localStorage.setItem('nombre',nombre.toString())
        }
       
        console.log("here item ",item);
        
        return item.id !== id;
        
      }
      );
     
    localStorage.setItem('panier',JSON.stringify(this.panier))

    this.produit = JSON.parse(localStorage.getItem('panier') || ' []');
    this.nombre=Number(localStorage.getItem('nombre') || ' []');
    this.communService.deleteProduit()
    this.totalprix();
  }
  totalprix() {
    this.totalPrice = 0
    this.produit.forEach((item) => {
      console.log("here item : ", item);

      this.totalPrice = this.totalPrice + (Number(item.quantite_commande) * Number(item.prix));
    });
    let newdate = new Date()
    let commande = {
      date: this.datePipe.transform(newdate, 'yyyy-MM-dd'),

      prix_total: this.totalPrice.toString(),
      quantite_total:  JSON.parse(localStorage.getItem('panier') || ' []').length,

    }

    localStorage.setItem('commande', JSON.stringify(commande));
  }
  plus(){
    this.communService.deleteProduit()
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
        this.commandeService.saveDetailcommande(detail_commande, item.id, res.id).subscribe((result: any) => {

          console.log("detai:", result)
        })
        this.plus()
      })
    }) 
    this.produit.forEach(element => {
      console.log("element is ", element);
      this.produitService.updateQuantiteProduit(element, element.id).subscribe((result1: any) => {
        element.quantite = element.quantite + Number(element.quantite - element.quantite_commande)
        console.log('here condition');

        console.log("detail:", result1)
        console.log("quantity:", this.quantite)
        this.totalprix();
        localStorage.removeItem('panier');
        localStorage.setItem('nombre','0');
       this.plus()

      });
    this.router.navigateByUrl('/pdf')
    })
  }
  
 eventOnChange(event:any){
    this.panier = JSON.parse(localStorage.getItem("panier") || "[]")
   

    this.panier.forEach(element => {
      console.log("element is ",element);
      if(element.id == event.target.id)
      element.quantite_commande = Number(event.target.value)  
      
    });
   
    localStorage.setItem('panier',JSON.stringify(this.panier))
 
    
    //   produitUpdated['quantite_commande'] = event.target.value;
    //   console.log('panier is',this.panier);
      
    this.produit = JSON.parse(localStorage.getItem('panier') || ' []');
    this.totalprix();
    
  }
}