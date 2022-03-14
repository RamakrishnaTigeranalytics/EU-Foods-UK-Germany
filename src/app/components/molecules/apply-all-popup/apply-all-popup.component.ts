import { Component, Input, Output , EventEmitter } from '@angular/core';
import { CheckboxModel } from '@core/models';

@Component({
    selector: 'apply-all-popup',
    templateUrl: './apply-all-popup.component.html',
    styleUrls: ['./apply-all-popup.component.css'],
})
export class ApplyAllPopupComponent {

    @Input() metric;
    @Output()
    applyCloseEvent= new EventEmitter()

    @Input()
    group:CheckboxModel[] = []

    @Input()
    datePickerConfig:any = null

    applyElasticity = 0;
    applyDate;
    tpr_constant = false

    valueChange($event , is_tpr){
        // console.log($event)
        // console.log(is_tpr , "istpr")
        if(is_tpr){
            this.tpr_constant = is_tpr
            return
        }
        this.group.find(d=>d.value == $event['value'])!['checked'] = $event['checked']
        // console.log(this.group)
    }

    applyAllClose(form){
        // console.log(form , "form values raw")
        // console.log(form.value , "form values")
        // console.log(this.group , "group after checkeing ")
        // date: Moment, applyElasticity: 2
        // console.log(form , "apply close form")
        this.applyCloseEvent.emit({
            "metric" : this.metric,
             "value" : form.value,
             "products" : this.group,
             "tpr_constant" : this.tpr_constant
        })
        this.applyElasticity = 0
        this.applyDate = null
        // form.resetForm()

    }

}
