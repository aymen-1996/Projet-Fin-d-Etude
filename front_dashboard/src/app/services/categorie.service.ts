import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  token:string=localStorage.getItem('token');
  httpOptions = {
    headers:new HttpHeaders({
      'Authorization':`Bearer `+this.token
    })
  };


  constructor(private http:HttpClient) { 
    
  }
  saveCategorie(categorie:any){
    return this.http.post(`${environment.baseURL}/categorie`, categorie,this.httpOptions)

}
getAllCategorie(){
  return this.http.get(`${environment.baseURL}/categorie`,this.httpOptions)
}
getById(id:any){
  return this.http.get(`${environment.baseURL}/categorie/${id}`,this.httpOptions)
}
deleteCategorie(id:any){
  return this.http.delete(`${environment.baseURL}/categorie/${id}`,this.httpOptions)
}
updateCategorie(categorie:any , id:any){
  return this.http.put(`${environment.baseURL}/categorie/${id}`,categorie,this.httpOptions)
}
}
