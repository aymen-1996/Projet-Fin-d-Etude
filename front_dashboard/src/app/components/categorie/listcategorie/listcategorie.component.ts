import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-listcategorie',
  templateUrl: './listcategorie.component.html',
  styleUrls: ['./listcategorie.component.css']
})
export class ListcategorieComponent implements OnInit {

  
  categories:any
  p:number=1;
  term:String="";
  formcat:FormGroup




  
  constructor(private catgorieService:CategorieService ) { }

  ngOnInit(): void {
    this.getAllcategories();
  }
  
  getAllcategories(){
   this.catgorieService.getAllCategorie().subscribe((res:any)=>{
      this.categories=res;
      console.log("categories : ", res);
    })
  }
 deleteCategorie(id:any){
  this.catgorieService.deleteCategorie(id).subscribe(
    (res: any) => {
      console.log("deleted");
      this.getAllcategories();
    })
    
 }
 
}