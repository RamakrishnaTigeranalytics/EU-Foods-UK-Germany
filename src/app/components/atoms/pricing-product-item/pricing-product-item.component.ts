import { Component, Input,Output , EventEmitter } from '@angular/core';
// import { timeStamp } from 'console';

@Component({
    selector: 'nwn-pricing-product-item',
    templateUrl: './pricing-product-item.component.html',
    styleUrls: ['./pricing-product-item.component.css'],
})
export class PricingProductItemComponent {
    @Input()
    type: 'default' | 'active' | 'filled' | 'filled-active' = 'default';
    @Input()
    size: 'sfi' = 'sfi';
    @Input()
    showClose: boolean = false;

    @Output()
    closeClickedEvent = new EventEmitter()

    closeClicked($event){
        this.closeClickedEvent.emit($event)

    }
}
