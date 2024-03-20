import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  token:string=localStorage.getItem('token');
  httpOptions = {
    headers:new HttpHeaders({
      'Authorization':`Bearer `+this.token
    })
  };
 
  constructor(private http:HttpClient) { 
    
  }
  

getAllProduit(){
  return this.http.get(`${environment.baseURL}/article`,this.httpOptions)
}
getAllaff1(id:any){
  return this.http.get(`${environment.baseURL}/aff/${id}`,this.httpOptions)
}
getProduitfournisseur(id_fournisseur:any){
  return this.http.get(`${environment.baseURL}/article/lib/${id_fournisseur}`,this.httpOptions)
}
getProduitcategorie(id_categorie:any){
  return this.http.get(`${environment.baseURL}/article/cat/${id_categorie}`,this.httpOptions)
}
getAllProduitdes(){
  return this.http.get(`${environment.baseURL}/article/desc`,this.httpOptions)
}
getProduitasc(){
  return this.http.get(`${environment.baseURL}/article/asc`,this.httpOptions)
}

getById(id:any){
  return this.http.get(`${environment.baseURL}/article/${id}`,this.httpOptions)
}

deleteProduit(id:any){
  return this.http.delete(`${environment.baseURL}/article/${id}`,this.httpOptions)
}
updateProduit(produit:any , id:any){
  return this.http.put(`${environment.baseURL}/article/${id}`,produit,this.httpOptions)
}
getAllaff(){
  return this.http.get(`${environment.baseURL}/article/afft`,this.httpOptions)
}
getAllaffichage(){
  return this.http.get(`${environment.baseURL}/article/affichage`,this.httpOptions)
}

updateQuantiteProduit(produit:any , id:any){
  return this.http.put(`${environment.baseURL}/article/updateQuantite/${id}`,produit,this.httpOptions)
}
quantiteProduit(produit:any , id:any){
  return this.http.put(`${environment.baseURL}/article/update/${id}`,produit,this.httpOptions)
}
getanavfootid(id:any){
  return this.http.get(`${environment.baseURL}/navfoot/${id}`,this.httpOptions)
}
updatenavfoot(navfoot:any , id:any ){
  return this.http.put(`${environment.baseURL}/navfoot/${id}`,navfoot,this.httpOptions)
}
}
