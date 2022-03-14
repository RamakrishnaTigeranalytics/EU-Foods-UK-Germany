import { Component , OnInit } from '@angular/core';
import {OptimizerService} from '../../../core/services/optimizer.service'
import { ListPromotion} from "../../../core/models"

@Component({
    selector: 'nwn-load-scenario-pricing',
    templateUrl: './load-scenario-pricing.component.html',
    styleUrls: ['./load-scenario-pricing.component.css'],
})  
export class LoadScenarioPricingComponent implements OnInit{
    list_promotion:Array<ListPromotion> = []

    constructor(private optimize : OptimizerService,){

    }

    ngOnInit(){

        // this.optimize.fetch_load_scenario().subscribe(data=>{
        //     this.list_promotion = data
        // })

    }

}
