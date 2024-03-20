import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token:string=localStorage.getItem('token');
  httpOptions = {
    headers:new HttpHeaders({
      'Authorization':`Bearer `+this.token
    })
  };

  constructor(private http:HttpClient) { 
    
  }
  saveUser(user:any){
    return this.http.post(`${environment.baseURL}/user/img`, user)
  }
    saveFournisseur(fournisseur:any){
      return this.http.post(`${environment.baseURL}/fournisseur/img`, fournisseur)
}

getAllUser(){
  return this.http.get(`${environment.baseURL}/user`,this.httpOptions)
}
getAllFournisseur(){
  return this.http.get(`${environment.baseURL}/fournisseur`,this.httpOptions)
}
getById(id:any){
  return this.http.get(`${environment.baseURL}/user/${id}`,this.httpOptions)
}
deleteUser(id:any){
  return this.http.delete(`${environment.baseURL}/user/${id}`,this.httpOptions)
}
updateUser(user:any , id:any){
  return this.http.put(`${environment.baseURL}/user/${id}`,user,this.httpOptions)
}

postappUser(user:any){
  return this.http.post(`${environment.baseURL}/user/auth`, user)
}
updateFournisseur(user:any , id:any){
  return this.http.put(`${environment.baseURL}/fournisseur/enabel/${id}`,user,this.httpOptions)
}

}
