import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StatistiqueService } from 'src/app/services/statistique.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dateArray: any;
  sommeArray: [] = [];
  sommeArray1: [] = [];
  totalPrice:number=0
  price:number=0
  quantprod:number=0
  quantprodvent:number=0
  test: boolean = false;
  test1: boolean = false;


  commandeParSemaine: any;
  constructor(private statistiqueService: StatistiqueService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    window.scrollTo(0,0)
    this.totalprix()

    this.totalprixAnnée()
  }

  totalprix() {
    this.totalPrice = 0
    this.quantprodvent = 0
    this.commandeParSemaine.forEach((item) => {
      
    this.quantprodvent= this.quantprodvent + Number(item.quantite_commande)       
     this.totalPrice = this.totalPrice + Number(item.quantite_commande * item.article.prix)
      console.log("here item : ", item);
  });
   
  
  }
  totalprixAnnée() {
    this.price = 0
    this.quantprod = 0
    this.commandeParSemaine.forEach((item) => {
      
    this.quantprod= this.quantprod + Number(item.quantite_commande)       
     this.price = this.price + Number(item.quantite_commande * item.article.prix)
      console.log("here item : ", item);
  });
   
  
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
          let dateCase = this.datePipe.transform(dateFormDate, 'dd-MM-yyyy').toString()
          obgSomme[dateCase] = 0;
          obgSomme1[dateCase] = 0;

          objDate.push(dateCase);
          this.commandeParSemaine.forEach(item => {
            let date1 = new Date(item.commande.date);
            let date2 = new Date(dateFormDate)
            if (date1.getDay() == date2.getDay()) {
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
            text: 'les ventes'
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
            name: 'Vente par semaine',
            data: this.sommeArray
          },
          ],
          tooltip: {
            valueSuffix: ' dinars'
          }
        }

        this.test = true
        setTimeout(() => {
          Highcharts.chart('container', options)
        }, 10)
        this.totalprix()
      })

   





  }

  Datecmd1(event: any) {

    let dateNow = new Date(event.target.value)
    let startDate = {
      date: new Date(dateNow.getFullYear(),  dateNow.getMonth() - dateNow.getUTCMonth()),
      dateEnd: new Date(dateNow.getFullYear(), dateNow.getMonth()- dateNow.getUTCMonth() + 12,)
    }
    
    this.statistiqueService.Datecmd(startDate).subscribe(
      (res: any) => {
        console.log("add :", res);
        this.commandeParSemaine = res;

        let obgSomme: [] = [];
        let objDate = [];
        //dateNow.setDate(startDate.date.getDate() - 1)
        dateNow.setMonth(dateNow.getMonth() - dateNow.getUTCMonth()-1);

        for (var i = 0; i < 12; i++) {
          let dateFormDate = new Date(dateNow.setMonth(dateNow.getMonth() + 1))
          let dateCase = this.datePipe.transform(dateFormDate, 'MMM,y').toString()
          obgSomme[dateCase] = 0;
          objDate.push(dateCase);
          this.commandeParSemaine.forEach(item => {
            let date1 = new Date(item.commande.date);
            let date2 = new Date(dateFormDate)
            if (date1.getMonth() == date2.getMonth()) {
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
           
         
            chart: {
              type: 'column'
            },
        
            xAxis: {    // the 'x' axis or 'category' axis.
                categories: objDate
            },
        
            title: {
                text: 'Les ventes par mois'
            },
        
            series: [{
              name: 'Vente par mois',
              data: this.sommeArray
            },
            ],
           
            colors: [ '#87CEFA'],
        
            tooltip: {
              valueSuffix: ' dinars'
            }
          }
          
        
        this.test1 = true
        setTimeout(() => {
          Highcharts.chart('barChart',options)

        }, 10)
        this.totalprixAnnée()

      })
    




  }
  

}
