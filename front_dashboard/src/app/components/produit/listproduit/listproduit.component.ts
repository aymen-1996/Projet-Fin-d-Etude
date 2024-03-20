import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from 'src/app/services/produit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listproduit',
  templateUrl: './listproduit.component.html',
  styleUrls: ['./listproduit.component.css']
})
export class ListproduitComponent implements OnInit {

  produits:any
  srcImageProduit:string = "http://localhost:8080/article/files/"
  term:String="";
  p:number=1;
  formproduit:FormGroup
  fournisseur:any;

  constructor(private FormBuilder: FormBuilder, private activatedRoute:ActivatedRoute, private produitService: ProduitService,private route:Router) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('user'))


  this.fournisseur = JSON.parse(localStorage.getItem('user') || '{}');
  this.getAllproduitsfour();
  }
 
  getAllproduitsfour(){
    
    this.produitService.getAllProduitfour(this.fournisseur.id).subscribe((res:any)=>{
      this.produits=res;
       console.log("produits : ", res);
       
     })
   }

 deleteProduit(id:any){


  Swal.fire({
    title: 'Êtes-vous sûr?',
    text: "Vous ne pourrez pas revenir en arrière !",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {

      this.produitService.deleteProduit(id).subscribe(
        (res: any) => {
          console.log("deleted");
          this.getAllproduitsfour();
        })

      Swal.fire(
        'Supprimé !',
        'Votre produit a été supprimé.',
        'success'
      )
    }
  })




    
 }
 

 
}