import { Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class CommunService{
  constructor(){}
  private nombre = new BehaviorSubject<number>(Number(localStorage.getItem('nombre')));
  castnombre = this.nombre.asObservable();

  editNombre(){ 
    this.nombre.next(Number(localStorage.getItem('nombre'))+1);
  let somme = JSON.parse(localStorage.getItem('panier') || ' []').length;
    localStorage.setItem('nombre',somme.toString() )
  }
  deleteProduit(){
    this.nombre.next(Number(localStorage.getItem('nombre')))
  }
}
