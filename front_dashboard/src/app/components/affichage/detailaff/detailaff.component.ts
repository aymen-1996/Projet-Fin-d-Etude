import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-detailaff',
  templateUrl: './detailaff.component.html',
  styleUrls: ['./detailaff.component.css']
})
export class DetailaffComponent implements OnInit {

  produit:any
  produits:any
  formProduit: FormGroup
  id_publication:any
  id=this.activatedRoute.snapshot.params['id']
  srcImageProduit:string = "http://localhost:8080/article/files/"
  hidden:boolean=false;

  constructor(private formBuilder: FormBuilder,private produitService:ProduitService,private activatedRoute:ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    console.log(this.id)
    this.produitById()
    this.getAllproduits()
    
    this.formProduit = this.formBuilder.group({
     id_publication:""
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
  updateaff() {
    this.produitService.updateaff(this.formProduit.value, this.id).subscribe((res: any) => {
     
      console.log("produit", this.id_publication)
      this.route.navigateByUrl('/affichage')
     
    });
     console.log("here produit to update : ",this.formProduit.value);
  }
  getAllproduits(){
    
    this.produitService.getAllProduit().subscribe((res:any)=>{
      this.produits=res;
       console.log("produits : ", res);
       
     })
   }
   affichage(){
    console.log("select value is : ",this.formProduit.value.produit)
  }
  }