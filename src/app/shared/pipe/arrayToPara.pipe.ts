import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'paraPipe' })
export class ArrayToParaPipe implements PipeTransform {
   
  transform(val:Array<any>): string {
      // console.log(val , "sipipe val")
      if(val.length > 0){
return val.join(",")
           
      }
      return ""
      
  }
}

