import { Component,EventEmitter,Input, OnInit,Output,SimpleChanges } from '@angular/core';
import {MetaInfo} from "@core/models"

@Component({
    selector: 'nwn-pricing-product-popup',
    templateUrl: './pricing-product-popup.component.html',
    styleUrls: ['./pricing-product-popup.component.css'],
})
export class PricingProductPopupComponent {

    @Input()
    currency = ""

    @Input()
    metaInfo: MetaInfo[] = []

    @Output()
    pricingChooseEvent = new EventEmitter()

    selected_id : number

    toggleId(id){
        this.selected_id = id
    }

    loadScenario(){
        this.pricingChooseEvent.emit(this.selected_id)
    }
    
    
    
}
