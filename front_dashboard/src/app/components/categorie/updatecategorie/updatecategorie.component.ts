import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-updatecategorie',
  templateUrl: './updatecategorie.component.html',
  styleUrls: ['./updatecategorie.component.css']
})
export class UpdatecategorieComponent implements OnInit {

 
  categorie: any
  formCategorie: FormGroup
  id = this.activatedRoute.snapshot.params['id']




  constructor(private formBuilder: FormBuilder,
    private categorieService: CategorieService,
    private activatedRoute: ActivatedRoute,
    private route:Router
    ) { }

  ngOnInit(): void {

    this.CategorieById();

    this.formCategorie = this.formBuilder.group({
      libelle: "",
      description: "",
    })
    
  }

  updateCategorie() {
    
    this.categorieService.updateCategorie(this.formCategorie.value, this.id).subscribe((res: any) => {
      
      console.log("categorie", this.categorie)
      this.route.navigateByUrl('/listcategorie')
    });
     console.log("here categorie to update : ",this.formCategorie.value);
  }


  CategorieById() {
    this.categorieService.getById(this.id).subscribe(
      (res: any) => {
        this.categorie = res
        console.log("categorie", this.categorie)
        
        
      }
    );
  }

}
