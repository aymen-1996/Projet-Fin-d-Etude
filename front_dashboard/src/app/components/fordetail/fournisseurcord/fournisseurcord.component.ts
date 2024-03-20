import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FournisseurService } from 'src/app/services/fournisseur.service';

@Component({
  selector: 'app-fournisseurcord',
  templateUrl: './fournisseurcord.component.html',
  styleUrls: ['./fournisseurcord.component.css']
})
export class FournisseurcordComponent implements OnInit {
  fournisseur:any
  produits:any
  id=this.activatedRoute.snapshot.params['id']
  srcImageFournisseur:string = "http://localhost:8080/fournisseur/files/"
  srcImageProduit:string = "http://localhost:8080/article/files/"

  constructor(private formBuilder: FormBuilder,private fournisseurService:FournisseurService,private activatedRoute:ActivatedRoute) { }

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
