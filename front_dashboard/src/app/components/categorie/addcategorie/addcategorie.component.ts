import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-addcategorie',
  templateUrl: './addcategorie.component.html',
  styleUrls: ['./addcategorie.component.css']
})
export class AddcategorieComponent implements OnInit {
  text: string = "text pardefaut"
  formCategorie:FormGroup
  submitted: boolean = false


  constructor(private formBuilder:FormBuilder, private categorieService:CategorieService, private route: Router) { }

  ngOnInit(): void {
this.formCategorie=this.formBuilder.group({
  libelle: ['', [Validators.required,Validators.minLength(4)]],
  description: ['', [Validators.required,Validators.minLength(6)]],
})

this.getAllCategories();
}

addCategorie() {
 
  console.log(this.formCategorie.value)
  console.log(this.formCategorie.value)
  this.submitted=true;
  if (this.formCategorie.invalid) {
    return;
  }
  this.categorieService.saveCategorie(this.formCategorie.value).subscribe(
    (res: any) => {
      console.log("add :",res);
      this.getAllCategories();
      
    })
    this.route.navigateByUrl('/listcategorie')
  }
    getAllCategories() {
      this.categorieService.getAllCategorie().subscribe(
        (response: any) => console.log("produit is : ", response))
    }
  
  }