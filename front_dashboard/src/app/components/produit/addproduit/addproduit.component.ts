import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategorieService } from 'src/app/services/categorie.service';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { ProduitService } from 'src/app/services/produit.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-addproduit',
  templateUrl: './addproduit.component.html',
  styleUrls: ['./addproduit.component.css']
})
export class AddproduitComponent implements OnInit {

  text: string = "text pardefaut"
  produits:any
  categories:any
  formProduit:FormGroup
  fileUpload:Array<File>=[];
  fournisseur:any
  submitted: boolean = false
  id=this.activatedRoute.snapshot.params['id']
  srcImageFournisseur:string = "http://localhost:8080/fournisseur/files/"

  constructor(private formBuilder:FormBuilder,private userService:UserService,private fournisseurService:FournisseurService, private produitService:ProduitService, private categorieService:CategorieService,private route: Router , private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('user'))


    this.fournisseur = JSON.parse(localStorage.getItem('user') || '{}');
      console.log(this.id)
      this.fournisseurById()
    
this.formProduit=this.formBuilder.group({
  libelle: ['', [Validators.required,Validators.minLength(4)]],
      description:['', [Validators.required,Validators.minLength(6)]],
      quantite: ['', [Validators.required]],
      prix: "",
      image:"",
      categorie:"",
      fournisseur:""

})

this.getAllproduits();
this.getAllcategories();
}
handleFileInput(files: any) {
  this.fileUpload = <Array<File>>files.target.files;
  console.log(this.fileUpload)}

addProduit() {
  console.log(this.formProduit.value)
  this.submitted=true;
  if (this.formProduit.invalid) {
    return;
  }
  let formData = new FormData();
  formData.append("libelle", this.formProduit.value.libelle);
  formData.append("description", this.formProduit.value.description);
  formData.append("quantite", this.formProduit.value.quantite);
  formData.append("prix", this.formProduit.value.prix);
  formData.append("categorie", this.formProduit.value.categorie);
  formData.append("fournisseur", this.formProduit.value.fournisseur);
  formData.append("file",this.fileUpload[0]);

  this.produitService.saveProduit(formData,this.formProduit.value.categorie,this.formProduit.value.fournisseur
    ).subscribe(
    (res: any) => {
      console.log("add :",res)
      this.getAllproduits();
    });
    this.route.navigateByUrl('listproduit')
    
    
  }
  getAllproduits(){
    this.produitService.getAllProduit().subscribe((res:any)=>{
       this.produits=res
       console.log("produits : ", res)
     });
     
   }
    getAllcategories(){
      this.categorieService.getAllCategorie().subscribe((res:any)=>{
         this.categories=res;
         console.log("categories : ", res);
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