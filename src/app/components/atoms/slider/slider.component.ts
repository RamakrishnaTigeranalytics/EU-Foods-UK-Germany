import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Options, LabelType } from '@angular-slider/ngx-slider';

@Component({
    selector: 'nwn-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.css'],
})
export class SliderComponent  implements OnInit{
    @Input()
    floor = 0
    @Input()
    ceil = 52
    @Input()
    steps = 1
    @Input()
    minValue = 0;

    @Input()
    maxValue = 0;

    @Output()
    sliderChangeEvent = new EventEmitter()

    @Input()
    options:Options = null as any
        // customValueToPosition : (val:number , minVal : number ,maxVal : number)=>{
        //     console.log(val , "customvaluetoposition")
        //     console.log(minVal , "minVal customvaluetoposition")
        //     console.log(maxVal , " maxVal customvaluetoposition")
        //     return val

        // } 
    // };
    changeSlider($event){
        // console.log($event , "$event")
        // console.log(this.minValue , "min value")
        // console.log(this.maxValue , "max value")
         setTimeout(()=>{
                this.sliderChangeEvent.emit({
                    "min_val" : this.minValue,
                    "max_val" : this.maxValue
                })
    

            },500)
    }
    ngOnInit(){
        // setTimeout(()=>{
        //     this.options.floor = 0
        //     this.options.ceil = 1
        //     this.options.step = 0.1

        // },5000)
    }


}
