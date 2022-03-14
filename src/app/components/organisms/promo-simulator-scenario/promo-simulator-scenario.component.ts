import { Component,Input,Output,EventEmitter } from '@angular/core';
import { ListPromotion } from '@core/models';

@Component({
    selector: 'nwn-promo-simulator-scenario',
    templateUrl: './promo-simulator-scenario.component.html',
    styleUrls: ['./promo-simulator-scenario.component.css'],
})
export class PromoSimulatorScenarioComponent {

    @Input()
    currency

    @Input()
    promotion_viewed : ListPromotion = {
        "id" : 1,
        "name" : 'name',
        "comments" : "comments",
        "scenario_type" : "pricing",
        "meta" : [
            {
                "retailer" : "ret1",
                "product_group" : "ORBIT OTC",
                "pricing" : {
                    "cogs" : 23.33,
                    "lpi" : 23.45,
                    "rsp" : 22.33,
                    "inc_elasticity" : -2.03
                }
            },
            {
                "retailer" : "ret1",
                "product_group" : "ORBIT XXL",
                "pricing" : {
                    "cogs" : 23.33,
                    "lpi" : 23.45,
                    "rsp" : 22.33,
                    "inc_elasticity" : -2.03
                }
            }
        ]
    }
    leng = [1]
    @Output()
    deleteClicked =  new EventEmitter()
    @Output()
    confirmatonEventModal = new EventEmitter()
    deleteClickedEvent($event){
        this.deleteClicked.emit(this.promotion_viewed)

        // console.log(this.promotion_viewed , "delete event")
    }
    isArray(obj : any ) {
        return Array.isArray(obj)
     }

    buttonClickedEvent($event){
        console.log($event , "button clicked at delete alert")
        this.confirmatonEventModal.emit($event)

    }
}
