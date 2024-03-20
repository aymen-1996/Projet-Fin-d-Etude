import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-navfoot',
  templateUrl: './navfoot.component.html',
  styleUrls: ['./navfoot.component.css']
})
export class NavfootComponent implements OnInit {
nav:any
  constructor(private formBuilder: FormBuilder,private produitService:ProduitService) { }
  formNavfoot: FormGroup
  ngOnInit(): void {
    this.navfootById()
    this.formNavfoot = this.formBuilder.group({
      semainedebut: "",
      semainefin:"",
      numtel:"",
      weekenddebut: "",
      weekendfin: "",
      
    })
  }
  navfootById(){
    this.produitService.getanavfootid(1).subscribe((res:any)=>{
      this.nav=res
      console.log("produit",this.nav)
    });
  }
 
}
