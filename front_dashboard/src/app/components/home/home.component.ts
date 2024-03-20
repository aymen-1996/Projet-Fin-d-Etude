import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentification.service';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { ProduitService } from 'src/app/services/produit.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  role:any
  produits:any
  fournisseur:any
  srcImageProduit:string = "http://localhost:8080/article/files/"
  srcImageFournisseur:string = "http://localhost:8080/fournisseur/files/"
  formFournisseur:FormGroup
  currentUser: User;
  id = this.activatedRoute.snapshot.params['id']
  constructor(private authService:AuthenticationService,private formBuilder: FormBuilder,private fournisseurService:FournisseurService,private produitService:ProduitService,private activatedRoute:ActivatedRoute, private route: Router) { 
   
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
    console.log(localStorage.getItem('user'))


  this.fournisseur = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(this.id)
    this.role =localStorage.getItem('role')
    this.getAllproduitsfinstock()
  }
  


logout() {
  this.authService.logout();
  this.route.navigate(['/login']);
}
  getAllproduitsfinstock(){
    
    this.produitService.getAllProduitfinstock(this.fournisseur.id).subscribe((res:any)=>{
      this.produits=res;
       console.log("produits : ", res);
       
     })
   }
   

}
