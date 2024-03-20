import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FournisseurService } from 'src/app/services/fournisseur.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  alert:boolean=false
  text: string = "text pardefaut"
  formFournisseur:FormGroup
  fileUpload:Array<File>=[];
  enable:boolean=false;
  submitted: boolean = false


  constructor(private formBuilder:FormBuilder, private fournisseurService:FournisseurService , private route: Router) { }

  ngOnInit(): void {
this.formFournisseur=this.formBuilder.group({
  nom: ['', [Validators.required,Validators.minLength(4)]],
      prenom:['', [Validators.required,Validators.minLength(4)]],
      mail:['', [Validators.required,Validators.email ]],
      password:['', [Validators.required,Validators.minLength(6)]],
      numtel:['', [Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
      compagnie:['', Validators.required],
      image:'', 

})

this.getAllFournisseur();
}
handleFileInput(files: any) {
  this.fileUpload = <Array<File>>files.target.files;
  console.log(this.fileUpload)}

addFournisseur() {
  console.log(this.formFournisseur.value)
  this.submitted=true;
  if (this.formFournisseur.invalid) {
    return;
    
  }
  let formData = new FormData();
  formData.append("nom", this.formFournisseur.value.nom);
  formData.append("prenom", this.formFournisseur.value.prenom);
  formData.append("mail", this.formFournisseur.value.mail);
  formData.append("password", this.formFournisseur.value.password);
  formData.append("numtel", this.formFournisseur.value.numtel);
  formData.append("compagnie", this.formFournisseur.value.compagnie);
  formData.append("file",this.fileUpload[0]);

  this.fournisseurService.saveUser(formData).subscribe(
    (res: any) => {
      console.log("add ");
      this.getAllFournisseur()
      window.scrollTo(0,0)
      this.alert=true
      this.formFournisseur.reset({})
    
    })
  }

    getAllFournisseur() {
      this.fournisseurService.getAllFournisseur().subscribe(
        (response: any) => console.log("fournisseur is : ", response))
    }
    closeAlert(){
      this.alert=false
    }
  }
