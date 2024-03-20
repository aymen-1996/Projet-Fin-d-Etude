import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from 'src/app/services/categorie.service';
import { CommunService } from 'src/app/services/commun.service';
import { ProduitService } from 'src/app/services/produit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produitcategorie',
  templateUrl: './produitcategorie.component.html',
  styleUrls: ['./produitcategorie.component.css']
})
export class ProduitcategorieComponent implements OnInit {
  produits:any
  produit:any
  categories:any
  quantite:number=1
  p:number=1;
  id:string=this.activatedRoute.snapshot.params['id']
  srcImageProduit:string = "http://localhost:8080/article/files/"
  term:any;
  testQuantite:boolean=false
  formproduit:FormGroup
  categorie:any;
 
  constructor(private FormBuilder: FormBuilder, private activatedRoute:ActivatedRoute, private produitService: ProduitService,private route:Router, private categorieService:CategorieService,private communService:CommunService , private scroller: ViewportScroller) {
    this.route.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
   }
  }
  ngOnInit(): void {
    this.scroller.scrollToAnchor("categorie")
this.getAllproduitscat();
this.getAllcategories();
  console.log("console id is :",this.id);  
  }
 
  getAllproduitscat(){
    console.log("catprod",this.id)
    this.produitService.getProduitcategorie(this.id).subscribe((res:any)=>{
      this.produits=res;
       console.log("produits : ", res);
       
     })
   }
   getAllproduitscat1(){
    
    this.produitService.getAllProduit().subscribe((res:any)=>{
      this.produits=res;
       console.log("produits : ", res);
       
     })
   }
   getAllcategories(){
    this.categorieService.getAllCategorie().subscribe((res:any)=>{
       this.categories=res;
       console.log("categories : ", res);
     })

    } 

    navigateProduitCategory(id:any){
      console.log("here navigate id is ",id)

     this.route.navigateByUrl("/produitcat/"+id)

    }
    logout() {
      console.log("here logout")
      localStorage.removeItem('state');
      this.route.navigateByUrl('/login')
  
    }
    plus(){
      this.communService.editNombre();
    }
    async addTocart(produit: any) {
      var panier=JSON.parse(localStorage.getItem("panier")||'[]')

  
      console.log("produit issss",produit);
      
  console.log("here condition ",produit.quantite+1," and ",this.quantite);
  
     if(panier[0] !== null) {
  
      console.log("condition 1");
      
      panier.forEach(element => {
        console.log("element is ",element);
        console.log("produit a verifier  is ",produit);
        if(produit.id==element.id){
          if(element.quantite<element.quantite_commande+Number(this.quantite)){
            Swal.fire(
              'Pas de stock',
              '',
              'error'
            )
            console.log("here return ");
         this.testQuantite = true;
          }
        }
      });
     }
      if(produit.quantite+1 <= this.quantite){
        Swal.fire(
          'Pas de stock',
          '',
          'error'
        )
        console.log("here ");
        
        this.testQuantite = true;
      }
     
  
      if(this.testQuantite == false) {
      console.log("condition 2");
  
      console.log("produit id is ", produit)
      
      //var panier = JSON.parse(localStorage.getItem("panier") || "[]")
      var i = 0;
      const index = panier.findIndex((o:any) => o.id == produit.id)
      if(index>-1) {
       
        console.log("qunaite is ",panier[index].quantite_commande);
         i = await panier[index].quantite_commande;
        panier.splice(index,1);
      }
   
      console.log("index is ",index);
  
      produit['quantite_commande'] = await Number(this.quantite) + Number(i)  ;
      panier.push(produit)
      console.log("panier  is ", panier);
      localStorage.setItem('panier', JSON.stringify(panier))
      this.quantite=1
      if(index<0){
        this.plus();
      }
    }
      this.testQuantite = false
  
    }
     eventOnChange(event:any){
      console.log("here change",event.target.value);
      this.quantite =event.target.value
      
    }
}
