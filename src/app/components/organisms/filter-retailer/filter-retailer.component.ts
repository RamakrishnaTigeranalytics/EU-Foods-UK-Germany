import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, Input,EventEmitter, Output  } from '@angular/core';
import { SimulatorService } from '@core/services/simulator.service';
import { tickStep } from 'd3';
import {CheckboxModel, FilterModel} from "../../../core/models"
import {ModalApply} from "../../../shared/modal-apply.component"

@Component({
  selector: 'nwn-filter-retailer',
  templateUrl: './filter-retailer.component.html',
  styleUrls: ['./filter-retailer.component.css']
})
export class FilterRetailerComponent extends ModalApply implements OnInit  {
  // checked = fals searchText = "";
  @Input()
  pricing = false

  all_ : CheckboxModel = {"value" : "All" , "checked" : false}

  @Input()
  retailers:Array<CheckboxModel> = []
  @Input()
  cont:Array<any> = []
  @Output()
  retailerChange = new EventEmitter()
  @Input()
  filter_model : FilterModel
  @Input()
  count_ret : any = null
  
  placeholder:any = 'Search retailers'
  retailerSelected:any = ''
  // retailerSelectedPricing :any[] = []

  constructor(public restApi: SimulatorService) {
    super()
   }

  ngOnInit(): void {
    this.restApi.ClearScearchText.asObservable().subscribe(data=>{
      
      if(data=="filter-retailer"){
        
      this.searchText = ""
      if(this.count_ret){
        
        if(this.count_ret["retailers"].length == 0){
          this.all_.checked = false
          this.retailers.forEach(element => {
            element.checked = false
            // this.valueChangeSelect({"value" : element.value,"checked" : false})

            
          });
           
          
          
        }
        this.retailers.forEach(d=>d.checked = this.count_ret['retailers'].includes(d.value))
        if(this.retailers.length == this.count_ret['retailers'].length){
          this.all_.checked = true
        }
        else{
          this.all_.checked = false
        }

      }
      else{
        if(this.filter_model.retailer == "Retailers"){
    
  
          this.retailers.forEach(element => {
            element.checked = false
            
          });
          
          this.valueChangeSelect({...this.retailerSelected , ...{"checked" : false}})
        }

      }

     

      }
    
      
      

    })
    // console.log(this.cont , "cont value in filters")
  }
  allselect($event){
     
    if($event.checked){
     
      // this.retailerSelectedPricing = []
       
       this.retailers.forEach(d=>{
         d.checked = true
        //  this.retailerSelectedPricing.push(d.value)
       })
       this.all_ = {...this.all_ , ...{"checked": true}}
    }
    else{
     
      // this.retailerSelectedPricing = []
      this.retailers.forEach(d=>{
        d.checked = false
        
      })
      this.all_ = {...this.all_ , ...{"checked": false}}

    }
     
    
  }
  valueChangeSelectPricing(event:any){
    this.retailers.filter(d=>d.value == event.value)[0].checked = event.checked
     
    if(event.checked){
      // if(!(event.value in this.retailerSelectedPricing)){
      //   this.retailerSelectedPricing.push(event.value)

      // }
    }
    else{
      this.all_ = {...this.all_ , ...{"checked": false}}
      
      // this.retailerSelectedPricing = this.retailerSelectedPricing.filter(d=>d!=event.value)
    }
    
     


  }
  valueChangeSelect(event:any){
    this.retailerSelected = event
    this.retailerChange.emit(event)
   
  }
  apply(id){
    if(this.pricing){
      this.filterApply.emit({"key" : "Retailer" , "values" : this.retailers.filter(d=>d.checked).map(d=>d.value)})
      

    }
    else{
      this.filterApply.emit({"key" : "Retailer"})

    }

    
    this.closeModal.emit(id)
    this.searchText = ""
  }


}
