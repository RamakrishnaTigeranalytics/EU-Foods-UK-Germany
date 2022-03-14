import { Component, OnInit,Output , EventEmitter } from '@angular/core';
import { ListPromotion } from '@core/models';
import { ModalService } from '@molecules/modal/modal.service';
import {OptimizerService , PricingService} from "@core/services"
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'nwn-compare-pricing-scenario',
  templateUrl: './compare-pricing-scenario.component.html',
  styleUrls: ['./compare-pricing-scenario.component.css']
})
export class ComparePricingScenarioComponent implements OnInit {

  // selectedIndex!: number;
  searchText : string = ""
  selected_id:Array<number> = []
  list_promotion:Array<ListPromotion> = []
  selected_promotion : ListPromotion = null as any

  
  @Output()
  load_scenario_event = new EventEmitter()

  constructor(private toastr: ToastrService,
    private modal : ModalService,private optimizerService : OptimizerService ,
     private pricingService : PricingService) { }

  ngOnInit(): void {
    
    this.optimizerService.getListObservation().subscribe(data=>{
      if(data){
          this.list_promotion = data.filter(data=>data.scenario_type == "pricing")
      }
      //console.log(data , "LIST PROMOTION observable")
  })
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

openComparePopup(){
  //console.log(this.selected_id , "selected id..........................")
  if(this.selected_id.length >= 1){
      this.pricingService.setCompareScenarioIdObservable(this.selected_id)
      //console.log(this.selected_id , "selected save id")
      this.modal.close('compare-pricing-scenario')
      // this.modal.open('compare-scenario-popup')
  }
  else{
      this.toastr.error("Please select atleast one scenarios to compare")
  }
}
inputChangeEvent($event){
  this.searchText = $event
}
  select(index: number,slected_promotion) {
    // this.selectedIndex = index;
    // this.selected_promotion = slected_promotion
}
}

