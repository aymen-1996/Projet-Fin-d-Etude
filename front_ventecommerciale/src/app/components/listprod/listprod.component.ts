import { isNgTemplate } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunService } from 'src/app/services/commun.service';
import { ProduitService } from 'src/app/services/produit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listprod',
  templateUrl: './listprod.component.html',
  styleUrls: ['./listprod.component.css']
})
export class ListprodComponent implements OnInit {
  produits: any
  srcImageProduit: string = "http://localhost:8080/article/files/"
  p: number = 1;
  panier = []
  total: number = 0
  produit: any
  testQuantite: boolean = false
  quantite_commande: any
  totalPrice: number = 0
  quantite: number = 1
  term: any
  prod: string[] = [];
  id = this.activatedRoute.snapshot.params['id']

  @Output() updateEvent = new EventEmitter();
  nombreListProd: number;



  constructor(private produitService: ProduitService,
    private communService: CommunService,
    private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    //  localStorage.setItem("panier","[]")
    console.log("here list filter");

    if (localStorage.getItem('nombre') == null)
      localStorage.setItem('nombre', '0');
    this.produits = localStorage.getItem("recherche")
    this.term = localStorage.getItem("recherche") || "";
    this.getAllproduitscat1();
  }

  getAllproduitscat1() {

    this.produitService.getAllProduit().subscribe((res: any) => {
      this.produits = res;
      console.log("produits : ", res);


    })
  }
  plus() {
    this.communService.editNombre();
  }
  async addTocart(produit: any) {
    var panier = JSON.parse(localStorage.getItem("panier") || '[]')


    console.log("produit issss", produit);

    console.log("here condition ", produit.quantite + 1, " and ", this.quantite);

    if (panier[0] !== null) {

      console.log("condition 1");

      panier.forEach(element => {
        console.log("element is ", element);
        console.log("produit a verifier  is ", produit);
        if (produit.id == element.id) {
          if (element.quantite < element.quantite_commande + Number(this.quantite)) {
            Swal.fire(
              'Pas de stock',
              '',
              'error'
            )
            console.log("here return ");
            this.testQuantite = true;
          }
        }
      });
    }
    if (produit.quantite + 1 <= this.quantite) {
      Swal.fire(
        'Pas de stock',
        '',
        'error'
      )
      console.log("here ");

      this.testQuantite = true;
    }


    if (this.testQuantite == false) {
      console.log("condition 2");

      console.log("produit id is ", produit)

      //var panier = JSON.parse(localStorage.getItem("panier") || "[]")
      var i = 0;
      const index = panier.findIndex((o: any) => o.id == produit.id)
      if (index > -1) {

        console.log("qunaite is ", panier[index].quantite_commande);
        i = await panier[index].quantite_commande;
        panier.splice(index, 1);
      }

      console.log("index is ", index);

      produit['quantite_commande'] = await Number(this.quantite) + Number(i);
      panier.push(produit)
      console.log("panier  is ", panier);
      localStorage.setItem('panier', JSON.stringify(panier))
      this.quantite = 1
      if (index < 0) {
        this.plus();
      }
    }
    this.testQuantite = false

  }

  eventOnChange(event: any) {
    console.log("here change", event.target.value);
    this.quantite = event.target.value

  }
  totalprix() {
    this.totalPrice = 0
    this.panier.forEach((item) => {
      this.totalPrice = (Number(item.quantite_commande) * Number(item.prix));
    });
  }

}
