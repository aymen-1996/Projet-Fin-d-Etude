import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CommandeService } from 'src/app/services/commande.service';

@Component({
  selector: 'app-detailcommande',
  templateUrl: './detailcommande.component.html',
  styleUrls: ['./detailcommande.component.css']
})
export class DetailcommandeComponent implements OnInit {
  commandes:any
  
  produit:any
  commande:any
  client
  quantite:number=1
  id:string=this.activatedRoute.snapshot.params['id']
  srcImageProduit:string = "http://localhost:8080/article/files/"

  constructor( private activatedRoute:ActivatedRoute,private route:Router , private commandeService:CommandeService,private scroller: ViewportScroller) { }

  ngOnInit(): void {
    window.scrollTo(0,0)
  this.getAllproduitscommande();

  }
  commandeById(){
    this.commandeService.getById(this.id).subscribe((res:any)=>{
      this.commande=res
    });
  }

  getAllproduitscommande(){
    this.commande=JSON.parse(localStorage.getItem('commande'))
    this.commandeService.getProduitcommande(this.id ).subscribe((res:any)=>{
      this.commandes=res;
       console.log("commandes : ", res);
       
     })
   }
   
  }
 
  