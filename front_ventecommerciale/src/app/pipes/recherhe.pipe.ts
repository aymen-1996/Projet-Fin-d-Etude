import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recherhe'
})
export class RecherhePipe implements PipeTransform {

  transform(value:any,term:any ): any {
    console.log("this value is : ",value);
    
    if(term==null){
      return value;
    }else{
      return value.filter((item:any)=>(item.libelle.includes(term) ));
    }
  }

}
