import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'percentIncrease' })
export class PercentageIncrease implements PipeTransform {
   
  transform(base , percent): any {
      
       return base * (1 + percent/100)
      
  }
}

