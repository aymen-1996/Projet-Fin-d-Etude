import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cherchedat'
})
export class CherchedatPipe implements PipeTransform {
  transform(value:any,term:any ): any {
    if(term==null){
      return value;
    }else{
      return value.filter((item:any)=>(item.commande.date.includes(term)));
    }
  }
  }
