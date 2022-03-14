import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'siFilter' })
export class SIPipe implements PipeTransform {
   
  transform(val:any): string {
      // console.log(val , "sipipe val")
      if(val){
          if(val.si < 0.95 ){
            return "lowholidayweek"

          }
          else if (val.si < 1.05){

            return "meediumholidayweek"
          }
          else{
            return "highholidayweek"

          }
      }
      return "lowholidayweek"
      
  }
}

