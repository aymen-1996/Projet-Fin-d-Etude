import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from 'src/app/services/produit.service';
import { ViewportScroller} from '@angular/common';
import { CommunService } from 'src/app/services/commun.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-detailproduit',
  templateUrl: './detailproduit.component.html',
  styleUrls: ['./detailproduit.component.css']
})
export class DetailproduitComponent implements OnInit {

  produit:any
  id=this.activatedRoute.snapshot.params['id']
  srcImageProduit:string = "http://localhost:8080/article/files/"
  hidden:boolean=false;
  quantite_commande:any
  quantite:number=1;
  testQuantite:boolean=true
  totalprice
panier:[]
  constructor(private produitService:ProduitService,private activatedRoute:ActivatedRoute, private route: Router , private scroller: ViewportScroller,private communService:CommunService) { }

  ngOnInit(): void {
    
//window.scrollTo(0,0)
this.scroller.scrollToAnchor("produit")


    console.log(this.id)
    this.produitById();
    
  }

  
  
  produitById(){
    this.produitService.getById(this.id).subscribe((res:any)=>{
      this.produit=res
      this.srcImageProduit=this.srcImageProduit + this.produit.image
      console.log("src image",this.srcImageProduit)
      console.log("produit",this.produit)
    });
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
    
  }}
