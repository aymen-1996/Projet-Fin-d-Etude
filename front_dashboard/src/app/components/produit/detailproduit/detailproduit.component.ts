import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-detailproduit',
  templateUrl: './detailproduit.component.html',
  styleUrls: ['./detailproduit.component.css']
})
export class DetailproduitComponent implements OnInit {
  produits:any
  fournisseur:any
  produit:any
  formProduit: FormGroup
  id=this.activatedRoute.snapshot.params['id']
  srcImageProduit:string = "http://localhost:8080/article/files/"
  hidden:boolean=false;

  constructor(private formBuilder: FormBuilder,private produitService:ProduitService,private activatedRoute:ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.fournisseur = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(this.id)
    this.produitById()
   
    
    this.formProduit = this.formBuilder.group({
      libelle: "",
      description: "",
      quantite: "",
      prix: "",
    })
    
  }
  
  
  produitById(){
    this.produitService.getById(this.id).subscribe((res:any)=>{
      this.produit=res
      this.srcImageProduit=this.srcImageProduit + this.produit.image
      console.log("src image",this.srcImageProduit)
      console.log("produit",this.produit)
    });
  }
  updateProduit() {
    
    this.produitService.updateProduit(this.formProduit.value, this.id).subscribe((res: any) => {
      
      console.log("produit", this.produit)
      this.route.navigateByUrl('/listproduit')
     
    });
     console.log("here produit to update : ",this.formProduit.value);
  }
  update(){
    this.hidden=true
    this.formProduit.patchValue({
      libelle:this.produit.libelle,
      description:this.produit.description,
      quantite:this.produit.quantite,
      prix:this.produit.prix,
    })
  }
    
  }
