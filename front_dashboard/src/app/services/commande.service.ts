import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  token:string=localStorage.getItem('token');
  httpOptions = {
    headers:new HttpHeaders({
      'Authorization':`Bearer `+this.token
    })
  };

  constructor(private http:HttpClient) { }
  getAllcommande(){
    return this.http.get(`${environment.baseURL}/commande`,this.httpOptions)
  }
 commandeByid(id:any){
    return this.http.get(`${environment.baseURL}/commande/${id}`,this.httpOptions)
  }
  getcmdfournisseur(id_fournisseur:any){
    return this.http.get(`${environment.baseURL}/detail_article/detailcmd/${id_fournisseur}`,this.httpOptions)
  }
  getProduitcommande(id_commande:any){
    return this.http.get(`${environment.baseURL}/detail_article/${id_commande}`,this.httpOptions)
  }
  updateCommande(commande:any , id:any){
    return this.http.put(`${environment.baseURL}/commande/${id}`,commande,this.httpOptions)
  }
  deletecommande(id:any){
    return this.http.delete(`${environment.baseURL}/commande/${id}`,this.httpOptions)
  }
  deleteDetailcommande(id:any){
    return this.http.delete(`${environment.baseURL}/detail_article/detail_commande/${id}`,this.httpOptions)
  }
  }


