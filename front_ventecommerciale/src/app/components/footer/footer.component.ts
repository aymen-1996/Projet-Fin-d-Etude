import { Component, OnInit } from '@angular/core';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  produit:any

  constructor(private produitService:ProduitService) { }

  ngOnInit(): void {
    this.navfootById()
  }
  navfootById(){
    this.produitService.getanavfootid(1).subscribe((res:any)=>{
      this.produit=res
      console.log("produit",this.produit)
    });
  }
}
