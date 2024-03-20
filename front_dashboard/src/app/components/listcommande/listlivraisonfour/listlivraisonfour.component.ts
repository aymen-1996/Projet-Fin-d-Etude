import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeService } from 'src/app/services/commande.service';

@Component({
  selector: 'app-listlivraisonfour',
  templateUrl: './listlivraisonfour.component.html',
  styleUrls: ['./listlivraisonfour.component.css']
})
export class ListlivraisonfourComponent implements OnInit {

  livraisons:any
 
  srcImageProduit:string = "http://localhost:8080/article/files/"
  fournisseur:any;
  p:number=1;
  term:any

  constructor( private activatedRoute:ActivatedRoute, private commandeService: CommandeService,private route:Router) { }

  ngOnInit(): void {

  this.fournisseur = JSON.parse(localStorage.getItem('user') || '{}');
  this.getAlllivraisonsfour();
  }
 
  getAlllivraisonsfour(){
    
    this.commandeService.getcmdfournisseur(this.fournisseur.id).subscribe((res:any)=>{
      this.livraisons=res;
       console.log("produits : ", res);
       
     })
   }
}
