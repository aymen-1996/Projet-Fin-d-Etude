import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  token:string=localStorage.getItem('token');
  httpOptions = {
    headers:new HttpHeaders({
      'Authorization':`Bearer `+this.token
    })
  };
  constructor(private http:HttpClient) { 
    
  }
  saveClient(client:any){
    return this.http.post(`${environment.baseURL}/client/img`, client)
  }
getAllClient(){
  return this.http.get(`${environment.baseURL}/client`,this.httpOptions)
}
getById(id:any){
  return this.http.get(`${environment.baseURL}/client/${id}`,this.httpOptions)
}

postClient(client:any){
  return this.http.post(`${environment.baseURL}/client/auth`, client)
}
postappUser(user:any){
  return this.http.post(`${environment.baseURL}/user/`, user)
}

}
