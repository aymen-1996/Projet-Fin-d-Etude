import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ProduitService } from 'src/app/services/produit.service';
import { CommandeService } from 'src/app/services/commande.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunService } from 'src/app/services/commun.service';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {
  term:string=""
  panier:any
  prix:any
  client:any
  commandes:any
  article:any
  produits:any
  quantite:number=1
  totalPrice:number=0
  quantite_commande:any
  nombreHome:number=0
  commande:any
  produit:any

  id = this.activatedRoute.snapshot.params['id']
  srcImageProduit:string = "http://localhost:8080/article/files/"

  constructor(private router:Router, private activatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
  window.scrollTo(0,0)
    this.client = JSON.parse(localStorage.getItem('user') || '{}');
    this.commande=JSON.parse(localStorage.getItem('commande'));
    this.produit = JSON.parse(localStorage.getItem('detail_commande')||'[]');
    this.article = JSON.parse(localStorage.getItem('article')||'[]');
    this.nombreHome = JSON.parse(localStorage.getItem('nombre') )

    console.log("local", this.produit)
    this.totalprix();
  

  }
  
 
  totalprix(){
    this.totalPrice=0;
    console.log("total", this.totalPrice)
    this.produit.forEach((item)=>{
     this.totalPrice+=(Number(item.quantite_commande)*Number(item.prix));
    
    });
 
  }

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
 
    this.router.navigateByUrl("/produit")
  }
 
}
  
  

