import { Component,Input,forwardRef} from '@angular/core';
import { ControlValueAccessor,NG_VALUE_ACCESSOR,FormGroup, FormControl, Validators } from '@angular/forms'
import { SimulatorService } from '@core/services';

@Component({
    selector: 'nwn-promo-elasticity',
    templateUrl: './promo-elasticity.component.html',
    styleUrls: ['./promo-elasticity.component.css'],
    providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => PromoElasticityComponent),
          multi: true
        }
      ]
})
export class PromoElasticityComponent {
  @Input()
  steps: number | 0.01 | 0.1 = 0.1

    constructor(public simulatorService: SimulatorService) {
      // this.simulatorService.promoElasticityValue.asObservable().subscribe(data=>{
      //   if(data != ''){
      //     this.name = Number((data).toFixed(1));  
      //   }
      // })
    }
    disable = false
    counter = 0;
    
    _name = 0;

    get name(): number {
        return this._name;
      }
    
      set name(value: number) {
        this._name = value;
        this.propagateChange(this._name);
      }
      writeValue(value: number) {
        if (value !== undefined) {
          this.name = value;
        }
      }
      propagateChange = (_: any) => { };
  propagateTouched = (_: any) => { };
  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) {
    this.propagateTouched = fn;
  }

  touched($event) {
    this.propagateTouched($event);
  }


    onInputChange(val){
        this._name = Number(val)
        // console.log(val , "promo elsticity change")

    }

    increment() {
        if(this.name != 0 || this.name > 0){
            this.disable = false
        }
        this.name = Number((this.name + this.steps).toFixed(2));
        // console.log(this.name)
        // this.simulatorService.setPromoElasticityValueObservable(this.name)
    }

    decrement() {
        if(this.name == 0 || this.name < 0){
            this.name = 0
            this.disable = true
            return 
        }
        this.name = Number((this.name - this.steps).toFixed(2));
        // console.log(this.name)
        // this.simulatorService.setPromoElasticityValueObservable(this.name)
    }


}
