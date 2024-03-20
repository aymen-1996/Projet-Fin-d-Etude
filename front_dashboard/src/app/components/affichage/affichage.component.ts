import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-affichage',
  templateUrl: './affichage.component.html',
  styleUrls: ['./affichage.component.css']
})
export class AffichageComponent implements OnInit {

  produits:any
  aff:any
  id=this.activatedRoute.snapshot.params['id']
  srcImageProduit:string = "http://localhost:8080/article/files/"
  term:String="";
  p:number=1;
  formproduit:FormGroup


  constructor(private FormBuilder: FormBuilder, private activatedRoute:ActivatedRoute, private produitService: ProduitService,private route:Router) { }

  ngOnInit(): void {
    this.getAllaff();
    
  }
 
  
  getAllaff(){
    this.produitService.getAllaff().subscribe((res:any)=>{
       this.aff=res
       console.log("produits : ", res)
     });
     
   }
    
 }