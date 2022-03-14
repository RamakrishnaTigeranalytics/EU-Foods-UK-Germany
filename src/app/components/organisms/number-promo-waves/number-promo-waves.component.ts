import { Component, Input , Output , EventEmitter,SimpleChanges } from '@angular/core';
import { Options, LabelType } from '@angular-slider/ngx-slider';

@Component({
    selector: 'nwn-number-promo-waves',
    templateUrl: './number-promo-waves.component.html',
    styleUrls: ['./number-promo-waves.component.css'],
})
export class NumberPromoWavesComponent {
    @Input()
    minValue = 0;

    @Input()
    maxValue = 52;

    @Input()
    floor = 0
    @Input()
    ceil = 52
    @Input()
    steps = 1

    @Input()
    basepromo = 0

    @Output()
    promoWaveEvent = new EventEmitter()


    @Input()
    options: Options = {
        floor: this.floor,
        ceil: this.ceil,
        step : this.steps,
        showSelectionBar: true,
        translate: (value: number, label: LabelType): string => {
            // console.log("value" , value)
            
            
            switch (label) {
                case LabelType.Ceil:
                    return value + ' weeks';
                case LabelType.Floor:
                    return value + ' weeks';
                default:
                    return '' + value;
            }
        },
    }
    duration_min = (this.basepromo - 3) 
    duration_max = this.basepromo + 3
    value = "0"

    sliderChangeEvent($event){
        this.duration_max = $event['max_val']
        this.duration_min = $event['min_val']
        // this.value = this.duration_min + " - " + this.duration_max
        if(this.duration_min > 0 && this.duration_min!=this.duration_max){
            this.value = this.duration_min + " - " + this.duration_max

        }
        else{
            this.value =  String(this.duration_max)
        }

        // this.promoWaveEvent.emit($event)

        // min_val: 0, max_val: 12
        // console.log($event , "slider change event")
    }
    apply(){
        this.promoWaveEvent.emit({
            "max_val" : this.duration_max,
            "min_val" : this.duration_min
        })

    }
    ngOnChanges(changes: SimpleChanges) {
 
        for (let property in changes) {
            if (property === 'basepromo') {
                this.duration_min = (this.basepromo - 3) 
                this.duration_max = this.basepromo + 3
                
                if(this.duration_min > 0){
                    this.value = this.duration_min + " - " + this.duration_max
        
                }
                else{
                    this.value =  String(this.duration_max)
                }
            } 
        }
    }


}
