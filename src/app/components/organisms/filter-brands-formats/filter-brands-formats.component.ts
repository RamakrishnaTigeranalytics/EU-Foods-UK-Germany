import { Component, OnInit,Input,EventEmitter, Output  } from '@angular/core';
import { CheckboxModel, FilterModel } from '@core/models';
import { SimulatorService } from '@core/services/simulator.service';
import {ModalApply} from "../../../shared/modal-apply.component"

@Component({
  selector: 'nwn-filter-brands-formats',
  templateUrl: './filter-brands-formats.component.html',
  styleUrls: ['./filter-brands-formats.component.css']
})
export class FilterBrandsFormatsComponent extends ModalApply  implements OnInit {

  
  @Input()
  pricing = false

  all_ : CheckboxModel = {"value" : "All" , "checked" : false}
  @Input()
  brand_formats:Array<CheckboxModel> = []
  @Input()
  filter_model : FilterModel
  @Input()
  count_ret : any = null

  // brandFormatSelectedPricing :any[] = []

  @Output()
  brandFormatChange = new EventEmitter()

  placeholder:any = 'Search brand formats'

  constructor(public restApi: SimulatorService) { 
    super()
  }

  ngOnInit(): void {
    this.restApi.ClearScearchText.asObservable().subscribe(data=>{
      if(data=="filter-brand-formats"){
        // console.log(data,"from modal apply")
        this.searchText = ""
        if(this.count_ret){
           
          if(this.count_ret["brand_format"].length == 0){
            this.all_.checked = false
            this.brand_formats.forEach(element => {
              element.checked = false
              
              
            });
             
            
            
          }
          this.brand_formats.forEach(d=>d.checked = this.count_ret['brand_format'].includes(d.value))
          if(this.brand_formats.length == this.count_ret['brand_format'].length){
            this.all_.checked = true
          }
          else{
            this.all_.checked = false
          }
  
        }
        else{
          if(this.filter_model.brand_format == "Brand Formats"){
  
            this.brand_formats.forEach(element => {
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
       
       this.brand_formats.forEach(d=>{
         d.checked = true
        //  this.brandFormatSelectedPricing.push(d.value)
       })
       this.all_ = {...this.all_ , ...{"checked": true}}
    }
    else{
     
      // this.brandFormatSelectedPricing = []
      this.brand_formats.forEach(d=>{
        d.checked = false
        
      })
      this.all_ = {...this.all_ , ...{"checked": false}}

    }
     
    
  }
  valueChangeSelectPricing(event:any){
    this.brand_formats.filter(d=>d.value == event.value)[0].checked = event.checked
     
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
    this.brandFormatChange.emit(event)
  }
  apply(id){
    if(this.pricing){
      this.filterApply.emit({"key" : "Brand Formats" , "values" : this.brand_formats.filter(d=>d.checked).map(d=>d.value)})

    }
    else{
      this.filterApply.emit({"key" : "Brand Formats"})

    }

    
    this.closeModal.emit(id)
    this.searchText = ""
  }

}
