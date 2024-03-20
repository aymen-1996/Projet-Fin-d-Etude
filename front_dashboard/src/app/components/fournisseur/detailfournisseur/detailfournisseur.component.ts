import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-detailfournisseur',
  templateUrl: './detailfournisseur.component.html',
  styleUrls: ['./detailfournisseur.component.css']
})
export class DetailfournisseurComponent implements OnInit {
  fournisseur:any
  produits:any
  id=this.activatedRoute.snapshot.params['id']
  srcImageFournisseur:string = "http://localhost:8080/fournisseur/files/"
  srcImageProduit:string = "http://localhost:8080/article/files/"
 


  constructor(private fournisseurService:FournisseurService,private activatedRoute:ActivatedRoute, private produitService:ProduitService ) { }

  ngOnInit(): void {

    // this.getAllproduitsfour()
    console.log(this.id)
    this.fournisseurById()

  }
  fournisseurById(){
    this.fournisseurService.getById(this.id).subscribe((res:any)=>{
      this.fournisseur=res
      this.srcImageFournisseur=this.srcImageFournisseur + this.fournisseur.image
      console.log("src image",this.srcImageFournisseur)
      console.log("fournisseur",this.fournisseur)
      
    });
    
  }

      
  }
