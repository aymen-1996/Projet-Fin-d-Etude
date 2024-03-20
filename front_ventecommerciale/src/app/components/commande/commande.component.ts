import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommandeService } from 'src/app/services/commande.service';
import { ProduitService } from 'src/app/services/produit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
  client: any
  commandes: any
  produit: any
  detailCommande: any;
  quantite: number = 1
  commande: any
  id: string = this.activatedRoute.snapshot.params['id']
  constructor(private commandeService: CommandeService, private activatedRoute: ActivatedRoute, private produitService: ProduitService) { }

  ngOnInit(): void {
    this.client = JSON.parse(localStorage.getItem('user') || '{}');
    this.detailCommande = JSON.parse(localStorage.getItem('detail_commande') || ' []');
    console.log("cllllll", this.client)
    this.getAllcommande();

  }
  getAllcommande() {

    this.commandeService.getAllcommande(this.client.id).subscribe((res: any) => {
      this.commandes = res;
      console.log("commande : ", res);

    })
  }
  annulercommande(id_commande: any) {
    Swal.fire({
      title: 'Tu peux annuler commande?',
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, annuler comande!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.commandeService.getAllcommande(this.client.id).subscribe((res: any) => {
          this.commandes = res;
          console.log("commande : ", res);
    
    
 
        this.commandeService.getProduitcommande(id_commande).subscribe((res: any) => {
          this.commande = res
          this.getAllcommande()
          this.commande.forEach(element => {
            this.commandeService.deleteDetailcommande(element.id).subscribe((result: any) => {
              this.commandeService.deletecommande(element.commande.id).subscribe((res1: any) => {
                console.log("detai:", res1)
              })
              console.log("detai:", result)
              this.getAllcommande()
            })
        
            this.produitService.quantiteProduit(element, element.article.id).subscribe((result1: any) => {
              element.quantite = element.quantite + Number(element.quantite + element.quantite_commande)
              console.log('here condition');
    
              console.log("detail:", result1)
              console.log("quantity:", this.quantite)
              this.getAllcommande()
            });
          })
        })    })
  
        Swal.fire(
          'Anuler !',
          'Votre commande a été annulé.',
          'success'
        )
      }
    })
    
    
  }
}


