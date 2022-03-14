import { Component, OnInit,Input,Output,EventEmitter, SimpleChanges } from '@angular/core';
// import { IMyDpOptions } from 'mydatepicker';

@Component({
    selector: 'nwn-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
    @Input()
    datePickerConfig:any = null

    @Output()
    applyCloseEvent= new EventEmitter()

    @Input()
    applyDate

    @Input()
    date_form = {
        "index" : null,
        "metric_type" : null
    }

    constructor() {}
   
    ngOnInit(): void {}

    applyAllClose(form){
        this.applyCloseEvent.emit({
            
             "value" : form.value,
             "date_form" :this.date_form
             
        })

    }
    ngOnChanges(changes : SimpleChanges) :void
    {   
        for (let property in changes) {
            if (property === 'applyDate'){
                this.applyDate = changes[property].currentValue

            }

        }
        // console.log(changes , "changes in datepopup")
    }

}
