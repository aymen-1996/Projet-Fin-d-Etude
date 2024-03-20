import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {

  token:string=localStorage.getItem('token');
  httpOptions = {
    headers:new HttpHeaders({
      'Authorization':`Bearer `+this.token
    })
  };

  constructor(private  http:HttpClient) { }
  savestat( date:any){     
    return this.http.post(`${environment.baseURL}/commande/stat/commande`,date,this.httpOptions )

}

savestatInf( date:any){     
  return this.http.post(`${environment.baseURL}/commande/stat/commandeInf`,date,this.httpOptions )

}
Datecmd(datestart:any){
  return this.http.post(`${environment.baseURL}/commande/stat/commandeInf`,datestart,this.httpOptions)

}
Datecmd1(){
  return this.http.post(`${environment.baseURL}/commande/stat/commandeInf`,this.httpOptions)

}
}
