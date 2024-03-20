import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FournisseurService } from 'src/app/services/fournisseur.service';

@Component({
  selector: 'app-listfournisseur',
  templateUrl: './listfournisseur.component.html',
  styleUrls: ['./listfournisseur.component.css']
})
export class ListfournisseurComponent implements OnInit {
  fournisseurs:any
  srcImageUser:string = "http://localhost:8080/fournisseur/files/"
  formFournisseur:FormGroup
  id = this.activatedRoute.snapshot.params['id']
  term:any
  p:number=1;

  constructor(private fournisseurService:FournisseurService , private formBuilder:FormBuilder,private activatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    this.getAllfournisseursactive();

    this.formFournisseur=this.formBuilder.group({
      enabel:''
    })
  }
  
  deleteFournisseur(id:any){
   this.fournisseurService.deleteFournisseur(id).subscribe(
     (res: any) => {
       console.log("deleted",res);
       this.getAllfournisseursactive();
     })
     
  }
  updateFournisseur(fournisseur:any){
    console.log("fournisseur enable : ",fournisseur);
   this.formFournisseur.patchValue({
    enabel: false
    })
     this.fournisseurService.updateFournisseur(this.formFournisseur.value, fournisseur.id).subscribe((res: any) => {
      
      console.log("fournisseur", this.fournisseurs)
      this.getAllfournisseursactive()
    });

 }
 getAllfournisseursactive(){
    
  this.fournisseurService.getAllFournisseurAct().subscribe((res:any)=>{
     this.fournisseurs=res;
     console.log("fournisser:",res)
   })
 }



}
