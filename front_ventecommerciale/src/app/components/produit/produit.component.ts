import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunService } from 'src/app/services/commun.service';
import { ProduitService } from 'src/app/services/produit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {

  testQuantite:boolean=false;
  pub1: any;
  pub2:any;
  quantite:number=1
  pub1Id: any;
  pub2Id: any;
  id = this.activatedRoute.snapshot.params['id']
  produits: any
  prodasc: any
  nombreHome:number=0
  srcImageProduit: string = "http://localhost:8080/article/files/"
  srcImageProduit1: string = "http://localhost:8080/article/files/"
  p: number = 1;

  constructor(private produitService: ProduitService, private route: Router, private activatedRoute: ActivatedRoute,private communService:CommunService) {

  }

  ngOnInit(): void {
    this.getpub1()
    this.getpub2()
  this.getAllproduitsdes();
    this.getAllproduitsasc();
  
   
  }
  

  getpub1() {
    console.log("herer pub 1");

    this.produitService.getAllaff1(1).subscribe((res: any) => {
      console.log("pub1 is ", res);
      this.pub1Id = res;
      this.produitService.getById(this.pub1Id.id_publication).subscribe((resultat: any) => {
        console.log("here produit pub1 : ", resultat);
        this.pub1=resultat;

      })

    })
  }
  getpub2() {
    console.log("herer pub 2");

    this.produitService.getAllaff1(2).subscribe((res: any) => {
      console.log("pub2 is ", res);
      this.pub2Id = res;
      this.produitService.getById(this.pub2Id.id_publication).subscribe((resultat: any) => {
        console.log("here produit pub2 : ", resultat);
        this.pub2=resultat;

      })

    })
  }
  getAllproduitsdes() {
    this.produitService.getAllProduitdes().subscribe((res: any) => {
      this.produits = res;
      console.log("produits : ", res);
    })
  }
  getAllproduitsasc() {
    this.produitService.getProduitasc().subscribe((res: any) => {
      this.prodasc = res;
      console.log("produits : ", res);
    })
  }
  navigateProduitCategory(id: any) {
    this.route.navigateByUrl("/detailproduit/" + id)

  }
  plus(){
    this.communService.editNombre();
  }
 
  async addTocart(produit: any) {
    this.nombreHome=0;
    var panier=JSON.parse(localStorage.getItem("panier")||'[]')

    console.log("produit issss",produit);
    
console.log("here condition ",produit.quantite+1," and ",this.quantite);

   if(panier[0] !== null) {

    console.log("condition 1");
    
    panier.forEach(element => {
      console.log("element is ",element);
      console.log("produit a verifier  is ",produit);
      if(produit.id==element.id){
        if(element.quantite<element.quantite_commande+Number(this.quantite) ){
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
 this.nombreHome;

  }
   eventOnChange(event:any){
    console.log("here change",event.target.value);
    this.quantite =event.target.value
    
  }
}
