import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-fordetail',
  templateUrl: './fordetail.component.html',
  styleUrls: ['./fordetail.component.css']
})
export class FordetailComponent implements OnInit {
  fournisseur:any
  produits:any
  id=this.activatedRoute.snapshot.params['id']
  srcImageFournisseur:string = "http://localhost:8080/fournisseur/files/"
  srcImageProduit:string = "http://localhost:8080/article/files/"
  formFournisseur: FormGroup
  hidden:boolean=false;

  constructor(private formBuilder: FormBuilder,private fournisseurService:FournisseurService,private activatedRoute:ActivatedRoute, private produitService:ProduitService ,private route: Router) { }

  ngOnInit(): void {

    this.fournisseur = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(this.id)
    this.fournisseurById()
    this.getAllproduitsfour()
    
    this.formFournisseur = this.formBuilder.group({
      nom: "",
      prenom: "",
      mail: "",
      compagnie:"",
      password: "",
      numtel: "",
    })

  }
  getAllproduitsfour(){
    
    this.produitService.getAllProduittop5(this.id).subscribe((res:any)=>{
      this.produits=res;
       console.log("produits2222 : ", res);
       
     })
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
