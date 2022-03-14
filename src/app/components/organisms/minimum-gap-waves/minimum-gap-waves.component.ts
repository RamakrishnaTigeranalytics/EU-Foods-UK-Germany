import { Component,Output , EventEmitter, Input,SimpleChanges } from '@angular/core';
import { Options, LabelType } from '@angular-slider/ngx-slider';

@Component({
    selector: 'nwn-minimum-gap-waves',
    templateUrl: './minimum-gap-waves.component.html',
    styleUrls: ['./minimum-gap-waves.component.css'],
})
export class MinimumGapWavesComponent {


    @Input()
    floor = 1
    @Input()
    ceil = 52
    @Input()
    steps = 1

    @Output()
    paramGapEvent = new EventEmitter()
    @Input()
    basepromo = 0
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
    minGapWaves:any = 0

    sliderChangeEvent($event){
        // console.log(this.minGapWaves)
        this.duration_max = this.minGapWaves
        this.duration_min = this.minGapWaves
        if(this.duration_min > 0 && this.duration_min!=this.duration_max){
            this.value = this.duration_min + " - " + this.duration_max
        }
        else{
            this.value =  String(this.duration_max)
        }
        // this.value = this.duration_min + " - " + this.duration_max
        // this.paramGapEvent.emit($event)

        // min_val: 0, max_val: 12
        // console.log($event , "slider change event")
    }

    apply(){
        // debugger
    //     this.duration_min = (this.basepromo - 3) 
    // this.duration_max = this.basepromo + 3
        this.paramGapEvent.emit({
            "max_val" : this.duration_max,
            "min_val" : this.duration_min
        })

    }
    ngOnChanges(changes: SimpleChanges) {
 
        for (let property in changes) {
            if (property === 'basepromo') {
                // this.value = "1"
                this.duration_min = (this.basepromo - 3) 
                this.duration_max = (this.basepromo - 3) 
                this.value =  String(this.duration_min)
                this.minGapWaves = this.duration_min
                // this.duration_max = this.basepromo + 3
                // if(this.duration_min > 0 && this.duration_min!=this.duration_max){
                //     this.value = this.duration_min + " - " + this.duration_max
                // }
                // else{
                //     this.value =  String(this.duration_max)
                // }
                // if(this.duration_min < 0) {
                //     this.duration_min = 0
                // }
                
                
                // if(this.duration_min > 0){
                //     this.value = this.duration_min + " - " + this.duration_max
        
                // }
                // else{
                //     this.value =  String(this.duration_max)
                // }
            } 
        }
    }

}
