import { Component,Input, Output,EventEmitter, OnInit,SimpleChanges   } from '@angular/core';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { OptimizerService } from '@core/services/optimizer.service';
// import { EventEmitter } from 'stream';

@Component({
    selector: 'nwn-mac-popup',
    templateUrl: './mac-popup.component.html',
    styleUrls: ['./mac-popup.component.css'],
})
export class MacPopupComponent {

    

    @Input()
    floor = 0
    @Input()
    ceil = 2
    @Input()
    steps = 0.1

    @Input()
    label = ""

    @Input()
    value : number = 1

    @Input()
    ip_val : any = {
        'mac' : 0,
        'rp' : 0
    }
   
    @Output()
    configChangeEvent = new EventEmitter()
    
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
    
    constructor(public optimize:OptimizerService){}

    sliderChangeEvent($event){
        // this.configChangeEvent.emit({
        //     "label" : this.label,
        //     "event" : $event
        // })


    }
    get_popup_id(label){
        let ret = ''
        if(label == 'MAC'){
            ret = 'mac-popup'
        }
        if(label == 'Trade margin'){
            ret = 'retailer-popup'
        }
        if(label == 'Trade expense'){
            ret = 'te-popup'
        }
        if(label == 'MAC, % NSV'){
            ret = 'mac-per-popup'
        }
        if(label == 'TM, % RSV'){
            ret = 'rp-per-popup'
        }
        return ret
    }
    apply(){
        this.configChangeEvent.emit({
            "id" : this.get_popup_id(this.label),
            "label" : this.label,
            "event" : this.value

        })
    }
      ngOnChanges(changes: SimpleChanges) {
        // console.log(changes , "property changes")
    for (let property in changes) {
        
        if (property === 'ip_val') {
          
this.value = 1
         
        }
    }
}
    
}
