import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FournisseurService } from '../services/fournisseur.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user:any
  role:any
  fournisseur:any
  srcImageFournisseur:string = "http://localhost:8080/fournisseur/files/"
  formFournisseur:FormGroup
  id = this.activatedRoute.snapshot.params['id']
  constructor(private formBuilder: FormBuilder,private fournisseurService:FournisseurService,private activatedRoute:ActivatedRoute, private route: Router) { }



  ngOnInit(): void {
    console.log(localStorage.getItem('user'))


    this.fournisseur = JSON.parse(localStorage.getItem('user') || '{}');
      console.log(this.id)
    this.role =localStorage.getItem('role')

    console.log("role: ",this.role);
  }
 
  

}
