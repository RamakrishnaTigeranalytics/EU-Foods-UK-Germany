import { Input } from "@angular/core";
import { Component, } from '@angular/core';
import { ControlValueAccessor,NG_VALUE_ACCESSOR, } from '@angular/forms'


@Component({
    selector: 'nwn-price-elasticity',
    templateUrl: './price-elasticity.component.html',
    styleUrls: ['./price-elasticity.component.css'],
    providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          multi:true,
          useExisting: PriceElasticityComponent
        }
      ]
})
export class PriceElasticityComponent implements ControlValueAccessor  {
    constructor() {}

    @Input() showBase = true

    @Input()
    counter:number = 0;
    @Input()
    base = 0

    @Input()
    step = 1

    onChange = (quantity) => {};

  onTouched = () => {};


    increment() {
      console.log("increment clicked")
      console.log(this.counter , "counter values...")
        this.counter = this.counter + this.step;
        this.counter = Number((this.counter).toFixed(2))
        console.log(this.counter)
        this.onChange(this.counter)
    }

    onInputChange(val){
      if(val){
      
      this.counter = val;
      
      
      this.onChange(this.counter)
      
  }
      // console.log(val , "ip value...")
  }

    decrement() {
        this.counter = this.counter - this.step;
        this.counter = Number((this.counter).toFixed(2))
        this.onChange(this.counter)
    }
    writeValue(quantity: number) {
      
      // console.log("priceelasticitycomponentwritevalue" , quantity)
        this.counter = quantity;
        // console.log("priceelasticitycomponentwritevalueccc" , this.counter)

      }
    
      registerOnChange(onChange: any) {
        this.onChange = onChange;
        // if (this.counter == null) {
        //   this.onChange(0);
        //  }
      }
    
      registerOnTouched(onTouched: any) {
        this.onTouched = onTouched;
      }

}
