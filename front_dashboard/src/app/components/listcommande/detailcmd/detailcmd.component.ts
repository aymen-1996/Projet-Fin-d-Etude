import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommandeService } from 'src/app/services/commande.service';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-detailcmd',
  templateUrl: './detailcmd.component.html',
  styleUrls: ['./detailcmd.component.css']
})
export class DetailcmdComponent implements OnInit {
  commandes:any
  fournisseur:any
  commande:any
  id=this.activatedRoute.snapshot.params['id']
  srcImageProduit:string = "http://localhost:8080/article/files/"

  constructor(private commandeService:CommandeService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.id)
    this.getAllcommande()
   
  }
  
  
  commandeById(){
    this.commandeService.commandeByid(this.id).subscribe((res:any)=>{
      this.commande=res
      console.log("src image",this.srcImageProduit)
      console.log("produit",this.commande)
    });
  }
  getAllcommande(){
    
    this.commandeService.getProduitcommande(this.id).subscribe((res:any)=>{
      this.commandes=res;
       console.log("commande : ", res);
       
     })
   }
}