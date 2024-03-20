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
  saveDetailcommande(detail_article:any, id_article:any ,id_commande:any){
    return this.http.post(`${environment.baseURL}/detail_article/${id_article}/${id_commande}`, detail_article ,this.httpOptions)

}
savecommande(commande:any, id_client:any ){
  return this.http.post(`${environment.baseURL}/commande/${id_client}`, commande ,this.httpOptions)
}
getAllcommande(id_client:any){
  return this.http.get(`${environment.baseURL}/commande/livraison/${id_client}`,this.httpOptions)
}
getProduitcommande(id_commande:any){
  return this.http.get(`${environment.baseURL}/detail_article/${id_commande}`,this.httpOptions)
}
getProduitdetialcmd(id_article:any){
  return this.http.get(`${environment.baseURL}/detail_article/${id_article}`,this.httpOptions)
}
getById(id:any){
  return this.http.get(`${environment.baseURL}/commande/${id}`,this.httpOptions)
}
detailById(id:any){
  return this.http.get(`${environment.baseURL}/detail_article/detail/${id}`,this.httpOptions)
}
deletecommande(id:any){
  return this.http.delete(`${environment.baseURL}/commande/${id}`,this.httpOptions)
}
deleteDetailcommande(id:any){
  return this.http.delete(`${environment.baseURL}/detail_article/detail_commande/${id}`,this.httpOptions)
}
}