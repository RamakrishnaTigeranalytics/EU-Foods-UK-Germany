import { Component, OnInit,Input,EventEmitter, Output } from '@angular/core';
import { SimulatorService } from '@core/services/simulator.service';
import { CheckboxModel, FilterModel } from 'src/app/core/models';
import {ModalApply} from "../../../shared/modal-apply.component"
@Component({
  selector: 'nwn-filter-product-groups',
  templateUrl: './filter-product-groups.component.html',
  styleUrls: ['./filter-product-groups.component.css']
})
export class FilterProductGroupsComponent extends ModalApply implements OnInit {

  @Input()
  pricing = false

  @Input()
  product_groups:Array<CheckboxModel> = []
  @Input()
  filter_model : FilterModel

  @Input()
  count_ret : any = null

  @Output()
  productChange = new EventEmitter()

  all_ : CheckboxModel = {"value" : "All" , "checked" : false}

  productSelected:any = ''

  placeholder:any = 'Search product groups'
  constructor(public restApi: SimulatorService) { 
    super()
  }

  ngOnInit(): void {
    this.restApi.ClearScearchText.asObservable().subscribe(data=>{
      // console.log(data , "data...closing modal")
      if(data=="filter-product-groups"){
      //   console.log(data,"from modal apply")
      // console.log(this.product_groups , "produt groups clear search")
      this.searchText = ""
      if(this.count_ret){
        if(this.count_ret["products"].length == 0){
          this.all_.checked = false
          this.product_groups.forEach(element => {
            element.checked = false
            
            
          });
           
          
          
        }
        this.product_groups.forEach(d=>d.checked = this.count_ret['products'].includes(d.value))
        if(this.product_groups.length == this.count_ret['products'].length){
          this.all_.checked = true
        }
        else{
          this.all_.checked = false
        }


      }
      else{
        if(this.filter_model.brand == "Product groups"){

          this.product_groups.forEach(element => {
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
       
       this.product_groups.forEach(d=>{
         d.checked = true
        //  this.brandFormatSelectedPricing.push(d.value)
       })
       this.all_ = {...this.all_ , ...{"checked": true}}
    }
    else{
     
      // this.brandFormatSelectedPricing = []
      this.product_groups.forEach(d=>{
        d.checked = false
        
      })
      this.all_ = {...this.all_ , ...{"checked": false}}

    }
     
    
  }
  valueChangeSelect(event:any){
    this.productSelected = event
    this.productChange.emit(event)
  }
  apply(id){

    this.filterApply.emit({"key" : "Product groups"})
    this.closeModal.emit(id)
    this.searchText = ""
  }

}
