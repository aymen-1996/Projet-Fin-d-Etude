import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StatistiqueService } from 'src/app/services/statistique.service';
import * as Highcharts from 'highcharts';
import { ActivatedRoute } from '@angular/router';
import { FournisseurService } from 'src/app/services/fournisseur.service';

@Component({
  selector: 'app-statbyfour',
  templateUrl: './statbyfour.component.html',
  styleUrls: ['./statbyfour.component.css']
})
export class StatbyfourComponent implements OnInit {
  dateArray: any;
  sommeArray: [] = [];
  sommeArray1: [] = [];
  totalPrice:number=0
  fournisseur:any;
  aff: boolean = false;
  id=this.activatedRoute.snapshot.params['id']
  srcImageFournisseur:string = "http://localhost:8080/fournisseur/files/"
quantprodvent:number=0
  commandeParSemaine: any;
  constructor(private statistiqueService: StatistiqueService, private datePipe: DatePipe,private activatedRoute:ActivatedRoute , private fournisseurService:FournisseurService) { }

  ngOnInit(): void {
this.fournisseurById()
this.totalprix()
console.log("ccccc",this.totalprix())
   
  }
  fournisseurById(){
    this.fournisseurService.getById(this.id).subscribe((res:any)=>{
      this.fournisseur=res
      this.srcImageFournisseur=this.srcImageFournisseur + this.fournisseur.image
      console.log("src image",this.srcImageFournisseur)
      console.log("fournisseur",this.fournisseur)
      
    });
    
  }
  totalprix() {
    this.totalPrice = 0
    this.quantprodvent = 0
    this.commandeParSemaine.forEach((item) => {
      if (item.article.fournisseur.id == this.id ) {
    this.quantprodvent= this.quantprodvent + Number(item.quantite_commande)       
     this.totalPrice = this.totalPrice + Number(item.quantite_commande * item.article.prix)
      console.log("here item : ", item);
  }});
   
  
  }
  
  Datecmd(event: any) {

    let dateNow = new Date(event.target.value)
    let startDate = {
      date: new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate() - dateNow.getDay() ),
      dateEnd: new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate() - dateNow.getDay() + 7)
    }

    this.statistiqueService.Datecmd(startDate).subscribe(
      (res: any) => {
        console.log("add :", res);
        this.commandeParSemaine = res;

        let obgSomme: [] = [];
        let obgSomme1: [] = [];

        let objDate = [];
       // dateNow.setDate(startDate.date.getDate() - 1)
        dateNow.setDate(dateNow.getDate() - dateNow.getDay()-1);

        for (var i = 0; i < 7; i++) {
          let dateFormDate = new Date(dateNow.setDate(dateNow.getDate() + 1))
          let dateCase = this.datePipe.transform(dateFormDate, 'yyyy-MM-dd').toString()
          obgSomme[dateCase] = 0;
          obgSomme1[dateCase] = 0;

          objDate.push(dateCase);
          this.commandeParSemaine.forEach(item => {
            let date1 = new Date(item.commande.date);
            let date2 = new Date(dateFormDate)
            if (date1.getTime() == date2.getTime() && item.article.fournisseur.id == this.fournisseur.id) {              
              obgSomme[dateCase] = obgSomme[dateCase] + item.quantite_commande * item.article.prix
            }
            
          });
        }

        console.log("here table of date : ", objDate);
        console.log('table is ', obgSomme);
        this.sommeArray = []
        objDate.forEach(element => {
          this.sommeArray.push(obgSomme[element]);
        });
        this.dateArray = objDate;
        let options: any = {
          Chart: {
            type: 'column',
            height: 700
          },
          title: {
            text: this.fournisseur.nom +this.fournisseur.prenom
          },
          credits: {
            enabled: false
          },
          xAxis: {
            categories: objDate,
            tickmarkPlacement: 'on',
            title: {
              enabled: false
            }
          },
          series: [{
            name: 'Mes ventes',
            data: this.sommeArray
          },
          ],
          colors: [ '	rgb(255,204,102)'],
        
            tooltip: {
                backgroundColor: '#FCFFC5'
            }
        }

        this.aff = true
        setTimeout(() => {
          Highcharts.chart('container', options)
        }, 10)
        this.totalprix()
      })

      





  }

}
