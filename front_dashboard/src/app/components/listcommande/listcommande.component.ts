import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommandeService } from 'src/app/services/commande.service';
import { ProduitService } from 'src/app/services/produit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listcommande',
  templateUrl: './listcommande.component.html',
  styleUrls: ['./listcommande.component.css']
})
export class ListcommandeComponent implements OnInit {

commandes:any
commande:any
client:any
p:number=1;
formCommande:FormGroup
term:any
 
  constructor(private commandeService:CommandeService,private produitService:ProduitService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.formCommande=this.formBuilder.group({
      etat:''
    })
    this.getAllcommande();
  }
  
  getAllcommande(){
    
    this.commandeService.getAllcommande().subscribe((res:any)=>{
      this.commandes=res;
       console.log("commande : ", res);
       
     })
   }
   updateCommande(commande:any){
   this.formCommande.patchValue({
    etat: 'livré'
    })
     this.commandeService.updateCommande(this.formCommande.value, commande.id).subscribe((res: any) => {
      console.log("fournisseur", this.commandes)
     
      this.getAllcommande();
    });


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
      this.commandeService.getAllcommande().subscribe((res: any) => {
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
