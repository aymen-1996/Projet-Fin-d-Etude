import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-updatenavfoot',
  templateUrl: './updatenavfoot.component.html',
  styleUrls: ['./updatenavfoot.component.css']
})
export class UpdatenavfootComponent implements OnInit {

  produit: any
  formNavfoot: FormGroup
  id = this.activatedRoute.snapshot.params['id']

  constructor(private formBuilder: FormBuilder,
    private produitService: ProduitService,
    private activatedRoute: ActivatedRoute,
    private route:Router
    ) { }

  ngOnInit(): void {

    this.NavfootById();

    this.formNavfoot = this.formBuilder.group({
      semainedebut: "",
      semainefin:"",
      numtel:"",
      weekenddebut: "",
      weekendfin: "",
      color:""
    })
    
  }

  updateNavfoot() {
    this.produitService.updatenavfoot(this.formNavfoot.value, this.id).subscribe((res: any) => {
      console.log("nav is",res)
      this.route.navigateByUrl('/navfoot')
    });
    console.log("formNavfoot is",this.formNavfoot.value)
  }
  NavfootById() {
    this.produitService.getanavfootid(1).subscribe(
      (res: any) => {
        this.produit = res
        
      }
    );
  }

}
