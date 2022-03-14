import { Component, Input } from '@angular/core';
 
import { ControlValueAccessor,NG_VALUE_ACCESSOR, } from '@angular/forms'

@Component({
    selector: 'nwn-pricing-metric',
    templateUrl: './pricing-metric.component.html',
    styleUrls: ['./pricing-metric.component.css'],
    providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          multi:true,
          useExisting: PricingMetricComponent
        }
      ]
})
export class PricingMetricComponent implements ControlValueAccessor {
    constructor() {}
    @Input()
    percentage = false;

    @Input()
    counterPer = 18.02;
    @Input()
    label = "List Price"
    @Input()
    base = 0

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

    onChange = (quantity) => {};

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
        this.counterPer = quantity;
      }
    
      registerOnChange(onChange: any) {
        this.onChange = onChange;
      }
    
      registerOnTouched(onTouched: any) {
        this.onTouched = onTouched;
      }

      decincrement(){
          if(this.absenable){
            this.incrementPer()

          }
          else{
              this.increment()

          }

      }
      decdecrement(){
        if(this.absenable){
            this.decrementPer()

        }
        else{
            this.decrement()
        }

      }

    incrementPer() {
        this.counterPer++;
        // console.log(this.counterPer , "counter per")
        // console.log(this.base , "base value")
        this.counter = this.convertPercent(this.counterPer , this.base)
        this.onChange(this.counterPer)
    }

    decrementPer() {
        this.counterPer--;
        // let per = ((this.counterPer - this.base)/this.base) * 100
        this.counter = this.convertPercent(this.counterPer , this.base)
        this.onChange(this.counterPer)
    }

    counter = 0;

    increment() {
       
        this.counter++;
        this.counterPer = this.convertAbsolute(this.counterPer , this.counter)
        this.onChange(this.counterPer)
    }

    decrement() {
        this.counter--;
        this.counterPer = this.convertAbsolute(this.counterPer , this.counter)
        this.onChange(this.counterPer)
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
