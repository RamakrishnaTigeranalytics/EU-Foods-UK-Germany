import { Component , Input, OnInit } from '@angular/core';
import { ModalService } from '@molecules/modal/modal.service';
import {OptimizerService} from '../../../core/services/optimizer.service'
import { ListPromotion} from "../../../core/models"
import { tickStep } from 'd3';
import { SimulatorService } from '@core/services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'nwn-compare-promo-scenario',
    templateUrl: './compare-promo-scenario.component.html',
    styleUrls: ['./compare-promo-scenario.component.css'],
})
export class ComparePromoScenarioComponent implements OnInit {

    list_promotion:Array<ListPromotion> = []
    list_promotion_promo:Array<ListPromotion> = []
    list_promotion_optimizer:Array<ListPromotion> = []
    selected_id:Array<number> = []
    @Input()
    openTab = 2;
    @Input()
    currency;
    searchText = ''
    promotion_viewed:ListPromotion = null as any
    constructor(private toastr: ToastrService,private modal : ModalService,private optimize : OptimizerService,public restApi: SimulatorService){
        this.optimize.fetch_load_scenario()
    }
    ngOnInit(): void {
        this.restApi.ClearScearchText.asObservable().subscribe(data=>{
            //console.log(data,"from modal apply")
            this.searchText = ""
          })
        this.optimize.getListObservation().subscribe(data=>{
            if(data){
                //console.log(data , "list promotions")
                this.list_promotion = data
                this.list_promotion_promo = this.list_promotion.filter(data=>data.scenario_type == "promo")
                this.list_promotion_optimizer = this.list_promotion.filter(data=>data.scenario_type == "optimizer")
            }
        })
    }
    toggleTabs($tabNumber: number): void {
        this.openTab = $tabNumber;0
    }
    toggleId($event){
        //console.log($event , "toggle event")
        if($event.checked){
            this.selected_id.push($event.value)

        }
        else{
            this.selected_id = this.selected_id.filter(n=>n!=$event.value)
        }
        // if(this.selected_id.includes(id)){
        //     this.selected_id = this.selected_id.filter(n=>n!=id)
        // }
        // else{
        //     this.selected_id.push(id)
        // }
        //console.log(this.selected_id , "selected id selecting")

    }
    inputChangeEvent($event){
        this.searchText = $event
    }
    infoClicked($event){
    this.promotion_viewed = $event
    this.modal.open('promo-simulator-popup-compare')
        //console.log($event , "Event")
    }
    openComparePopup(){
        //console.log(this.selected_id , "selected id..........................")
        if(this.selected_id.length >= 1){
            this.optimize.setCompareScenarioIdObservable(this.selected_id)
            //console.log(this.selected_id , "selected save id")
            this.modal.close('compare-promo-scenario')
            // this.modal.open('compare-scenario-popup')
        }
        else{
            this.toastr.error("Please select atleast one scenarios to compare")
        }
    }
}
