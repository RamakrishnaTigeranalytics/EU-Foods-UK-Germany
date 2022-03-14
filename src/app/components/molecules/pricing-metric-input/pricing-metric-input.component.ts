import { Component, Input } from '@angular/core';
 
import { ControlValueAccessor,NG_VALUE_ACCESSOR, } from '@angular/forms'

@Component({
    selector: 'nwn-pricing-metric-input',
    templateUrl: './pricing-metric-input.component.html',
    styleUrls: ['./pricing-metric-input.component.css'],
    providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          multi:true,
          useExisting: PricingMetricInputComponent
        }
      ]
})
export class PricingMetricInputComponent implements ControlValueAccessor {
    constructor() {}
    @Input()
    percentage = false;

    @Input()
    counterPer = 0;
    @Input()
    label = "List Price"
    @Input()
    base = 0

    @Input()
    disable = false

    enabled = "abs"
    absenable = true

    toggleEnable(){
        this.absenable = !this.absenable

    }

    togglePercent(percent){
        
        // console.log(percent)
        if(percent == "skip"){
            // console.log("inside if")
            return
        }
        this.percentage = percent
        
       
        // this.percentage = !this.percentage
        // console.log(this.percentage , "curr percent ")
    }

    onChange = (quantity) => {
        // console.log(quantity , "onchange called")
    };

  onTouched = () => {};


    changeEnabled(type){
        this.enabled = type
        // if(type == 'per'){
        //     this.enabled = type

        // }
        // else{


        // }

    }
    writeValue(quantity: number) {
        //  console.log(quantity , "quantity")
        //  console.log(this.base , "base vlue")
        //  console.log(this.counter , "counter value")
        this.counter = quantity;
        this.counterPer = this.convertAbsolute(this.base , this.counter)
      }
    
      registerOnChange(onChange: any) {
        //   console.log("register on change" , onchange)
        this.onChange = onChange;
      }
    
      registerOnTouched(onTouched: any) {
        this.onTouched = onTouched;
      }

      
 
    counter = 0;

    increment() {
        if(this.disable){
            return
        }
       
        this.counter++;
        this.counterPer = this.convertAbsolute(this.base , this.counter)
        this.onChange(this.counter)
    }

    decrement() {
        if(this.disable){
            return
        }
        this.counter--;
        this.counterPer = this.convertAbsolute(this.base , this.counter)
        this.onChange(this.counter)
    }
    convertAbsolute(base , per){
        base = Number(base)
        // console.log(base , "base")
        // console.log(per , "per")
        let abs = base + (base * per)/100
        // console.log(abs , "abs")
        // console.log(typeof(abs) , "type abs")

        return Number(abs.toFixed(2))

    }
    convertPercent(inc , base){
        base = Number(base)
        let per = ((inc - base)/base) * 100
        return Number(per.toFixed(2))

    }

    config = {
        weekDayFormat: 'd',
        weekDayFormatter: (num) => {
            if (num === 0) {
                return 'S';
            } else if (num === 1) {
                return 'M';
            } else if (num === 2) {
                return 'T';
            } else if (num === 3) {
                return 'W';
            } else if (num === 4) {
                return 'T';
            } else if (num === 5) {
                return 'F';
            } else if (num === 6) {
                return 'S';
            } else {
                return 'S';
            }
        },
    };
}
