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
getAllCategorie(){
  return this.http.get(`${environment.baseURL}/categorie`,this.httpOptions)
}
getById(id:any){
  return this.http.get(`${environment.baseURL}/categorie/${id}`,this.httpOptions)
}

}
