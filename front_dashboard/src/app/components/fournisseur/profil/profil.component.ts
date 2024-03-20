import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FournisseurService } from 'src/app/services/fournisseur.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  alert:boolean=false
  fournisseur:any
  id=this.activatedRoute.snapshot.params['id']
  srcImageFournisseur:string = "http://localhost:8080/fournisseur/files/"
  formFournisseur: FormGroup
  hidden:boolean=false;
  submitted: boolean = false

  constructor(private formBuilder: FormBuilder,private fournisseurService:FournisseurService,private activatedRoute:ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    console.log(this.id)
    this.fournisseurById()
    
    this.formFournisseur = this.formBuilder.group({
      nom: "",
      prenom: "",
      mail:['', [Validators.required,Validators.email ]],
      compagnie:"",
      password: "",
      numtel: "",
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

  updateFournisseur() {  
    this.submitted=true;
    if (this.formFournisseur.invalid) {
      return;  
    }
    this.fournisseurService.updateFournisseur(this.formFournisseur.value, this.id).subscribe((res: any) => {
      
      console.log("user", this.fournisseur)
      window.scrollTo(0,0)
      this.alert=true
      this.formFournisseur.reset({})
    });
     console.log("here user to update : ",this.formFournisseur.value);
  }


  update(){
    this.hidden=true
    this.formFournisseur.patchValue({
      nom:this.fournisseur.nom,
      prenom:this.fournisseur.prenom,
      mail:this.fournisseur.mail,
      compagnie:this.fournisseur.compagnie,
      password:this.fournisseur.password,
      numtel:this.fournisseur.numtel
    })
  }
  closeAlert(){
    this.alert=false
  }
    
  }