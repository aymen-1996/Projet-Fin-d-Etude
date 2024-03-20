import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-fournisseurnoactive',
  templateUrl: './fournisseurnoactive.component.html',
  styleUrls: ['./fournisseurnoactive.component.css']
})
export class FournisseurnoactiveComponent implements OnInit {
  fournisseurs:any
  srcImageUser:string = "http://localhost:8080/fournisseur/files/"
  test:boolean=false
  formFournisseur: FormGroup
  id = this.activatedRoute.snapshot.params['id']
  p:number=1;


  constructor(private fournisseurService:FournisseurService , private formBuilder:FormBuilder ,private activatedRoute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.getAllfournisseursnoactive();

    this.formFournisseur=this.formBuilder.group({
      enabel:''
    })
  }
  getAllfournisseursnoactive(){
    
    this.fournisseurService.getAllFournisseurnoAct().subscribe((res:any)=>{
       this.fournisseurs=res;
       console.log("fournisser:",res)
     })
   }

   
   deleteFournisseur(id:any){
    this.fournisseurService.deleteFournisseur(id).subscribe(
      (res: any) => {
        console.log("deleted",res);
        this.getAllfournisseursnoactive();
      })
      
   }
   updateFournisseur(fournisseur:any){
    console.log("fournisseur enable : ",fournisseur);
   this.formFournisseur.patchValue({
      enabel : true
    })
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, acceptez-le!'
    }).then((result) => {
      if (result.isConfirmed) {
  
        this.fournisseurService.mail(this.formFournisseur.value, fournisseur.id).subscribe((res: any) => {
        
          console.log("fournisseur", this.fournisseurs)
          this.getAllfournisseursnoactive()
        });
  
        Swal.fire(
          'Accepter!',
          'Fournisseur a été accepté.',
          'success'
        )
      }
    })
  
   

}}
