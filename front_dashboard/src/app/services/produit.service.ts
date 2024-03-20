import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  saveProduit(produit:any, id_categorie:any ,id_fournisseur:any ){
    return this.http.post(`${environment.baseURL}/article/img/${id_categorie}/${id_fournisseur}`, produit,this.httpOptions)

}
getAllProduit(){
  return this.http.get(`${environment.baseURL}/article`,this.httpOptions)
}
getAllaff(){
  return this.http.get(`${environment.baseURL}/aff`,this.httpOptions)
}
getaffid(id:any){
  return this.http.get(`${environment.baseURL}/aff/${id}`,this.httpOptions)
}

getanavfootid(id:any){
  return this.http.get(`${environment.baseURL}/navfoot/${id}`,this.httpOptions)
}
getAllProduitdes(){
  return this.http.get(`${environment.baseURL}/article/desc`,this.httpOptions)
}
getProduitfournisseur(id:any){
  return this.http.get(`${environment.baseURL}/article/lib/${id}`,this.httpOptions)
}

getAllProduitfinstock(id_fournisseur:any){
  return this.http.get(`${environment.baseURL}/article/stock/${id_fournisseur}`,this.httpOptions)
}
getAllProduitfour(id_fournisseur:any){
  return this.http.get(`${environment.baseURL}/article/lib/${id_fournisseur}`,this.httpOptions)
}
getAllProduittop5(id_fournisseur:any){
  return this.http.get(`${environment.baseURL}/article/ascfour/${id_fournisseur}`,this.httpOptions)
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
quantiteProduit(produit:any , id:any){
  return this.http.put(`${environment.baseURL}/article/update/${id}`,produit,this.httpOptions)
}
updateaff(aff:any , id:any ){
  return this.http.put(`${environment.baseURL}/aff/${id}`,aff,this.httpOptions)
}
updatenavfoot(navfoot:any , id:any ){
  return this.http.put(`${environment.baseURL}/navfoot/${id}`,navfoot,this.httpOptions)
}
}
