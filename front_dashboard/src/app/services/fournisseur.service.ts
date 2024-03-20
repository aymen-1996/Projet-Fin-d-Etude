import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  token:string=localStorage.getItem('token');
  httpOptions = {
    headers:new HttpHeaders({
      'Authorization':`Bearer `+this.token
    })
  };


  constructor(private http:HttpClient) { 
    
  }
  saveUser(user:any){
    return this.http.post(`${environment.baseURL}/fournisseur/img`, user)
  }
    saveFournisseur(fournisseur:any){
      return this.http.post(`${environment.baseURL}/fournisseur/img`, fournisseur)
}

getAllFournisseur(){
  return this.http.get(`${environment.baseURL}/fournisseur`,this.httpOptions)
}
sendMail(){
  return this.http.get(`${environment.baseURL}/mail`,this.httpOptions)
}
getById(id:any){
  return this.http.get(`${environment.baseURL}/fournisseur/${id}`,this.httpOptions)
}
deleteFournisseur(id:any){
  return this.http.delete(`${environment.baseURL}/fournisseur/${id}`,this.httpOptions)
}
updateFournisseur(fournisseur:any , id:any){
  return this.http.put(`${environment.baseURL}/fournisseur/${id}`,fournisseur,this.httpOptions)
}
mail(fournisseur:any , id:any){
  return this.http.put(`${environment.baseURL}/mail/${id}`,fournisseur,this.httpOptions)
}
postFournisseur(fournisseur:any){
  return this.http.post(`${environment.baseURL}/fournisseur/auth`, fournisseur)
}
getAllFournisseurnoAct(){
  return this.http.get(`${environment.baseURL}/fournisseur/enabelf`,this.httpOptions)
}
getAllFournisseurAct(){
  return this.http.get(`${environment.baseURL}/fournisseur/enabelt`,this.httpOptions)
}



}
