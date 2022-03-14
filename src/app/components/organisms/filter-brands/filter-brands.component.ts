import { Component, OnInit,Input,EventEmitter, Output,SimpleChanges  } from '@angular/core';
import { CheckboxModel, FilterModel } from '@core/models';
import { SimulatorService } from '@core/services/simulator.service';
import {ModalApply} from "../../../shared/modal-apply.component"

@Component({
  selector: 'nwn-filter-brands',
  templateUrl: './filter-brands.component.html',
  styleUrls: ['./filter-brands.component.css']
})
export class FilterBrandsComponent extends ModalApply implements OnInit {

  @Input()
  pricing = false

  all_ : CheckboxModel = {"value" : "All" , "checked" : false}

  // brandFormatSelectedPricing :any[] = []

  @Input()
  brands:Array<CheckboxModel> = []
  @Input()
  filter_model : FilterModel

  @Output()
  brandChange = new EventEmitter()

  @Input()
  count_ret : any = null

  placeholder:any = 'Search brands'
  constructor(public restApi: SimulatorService) {
    super()
   }

  ngOnInit(): void {
    this.restApi.ClearScearchText.asObservable().subscribe(data=>{
      console.log(data , "DATAAAA")
      if(data=="filter-brands"){
        // debugger
        // console.log(data,"from modal apply")
      this.searchText = ""
      if(this.count_ret){
        if(this.count_ret["brand"].length == 0){
          this.all_.checked = false
          this.brands.forEach(element => {
            element.checked = false
            
            
          });
           
          
          
        }
        this.brands.forEach(d=>d.checked = this.count_ret['brand'].includes(d.value))
        if(this.brands.length == this.count_ret['brand'].length){
          this.all_.checked = true
        }
        else{
          this.all_.checked = false
        }


      }
      else{
        if(this.filter_model.brand == "Brands"){

          this.brands.forEach(element => {
            element.checked = false
            
          });
          this.valueChangeSelect({...this.retailerSelected , ...{"checked" : false}})
        }

      }
     
      
      }
      
    })
  }
  allselect($event){
     
    if($event.checked){
     
      // this.brandFormatSelectedPricing = []
       
       this.brands.forEach(d=>{
         d.checked = true
        //  this.brandFormatSelectedPricing.push(d.value)
       })
       this.all_ = {...this.all_ , ...{"checked": true}}
    }
    else{
     
      // this.brandFormatSelectedPricing = []
      this.brands.forEach(d=>{
        d.checked = false
        
      })
      this.all_ = {...this.all_ , ...{"checked": false}}

    }
     
    
  }
  valueChangeSelectPricing(event:any){
    this.brands.filter(d=>d.value == event.value)[0].checked = event.checked
     
    if(event.checked){
      // if(!(event.value in this.brandFormatSelectedPricing)){
      //   this.brandFormatSelectedPricing.push(event.value)

      // }
    }
    else{
      this.all_ = {...this.all_ , ...{"checked": false}}
      
      // this.brandFormatSelectedPricing = this.brandFormatSelectedPricing.filter(d=>d!=event.value)
    }
    
     


  }
  
  valueChangeSelect(event:any){
    this.retailerSelected = event
    this.brandChange.emit(event)
  }
  apply(id){
    if(this.pricing){
      this.filterApply.emit({"key" : "Brands" , "values" : this.brands.filter(d=>d.checked).map(d=>d.value)})

    }
    else{
      this.filterApply.emit({"key" : "Brands" })

    }


    
    this.closeModal.emit(id)
    this.searchText = ""
  }

  ngOnChanges(changes: SimpleChanges) {
 
    for (let property in changes) {
        if (property === 'filter_model') {
        //  console.log(this.count_ret)
        //  console.log(this.brands)
         if(this.count_ret){
           if(this.count_ret.brand.length  == 0){
             this.all_.checked = false
           }
         }
            
            // console.log("count_retfilter model ...")
            
           
        } 
    }
}


}
