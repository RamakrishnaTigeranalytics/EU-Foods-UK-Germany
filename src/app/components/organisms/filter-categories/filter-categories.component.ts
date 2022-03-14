import { Component, OnInit,Input,EventEmitter, Output  } from '@angular/core';
import { SimulatorService } from '@core/services/simulator.service';
import {CheckboxModel, FilterModel} from "../../../core/models"
import {ModalApply} from "../../../shared/modal-apply.component"

@Component({
  selector: 'nwn-filter-categories',
  templateUrl: './filter-categories.component.html',
  styleUrls: ['./filter-categories.component.css']
})
export class FilterCategoriesComponent extends ModalApply  implements OnInit {

  @Input()
  pricing = false

  all_ : CheckboxModel = {"value" : "All" , "checked" : false}

  @Input()
  categories:Array<CheckboxModel> = []
  @Input()
  filter_model : FilterModel
  @Input()
  count_ret : any = null

  // categorySelectedPricing :any[] = []
  

  @Output()
  categoryChange = new EventEmitter()
  	
  placeholder:any = 'Search categories'
  constructor(public restApi: SimulatorService) { 
    super()
  }

  ngOnInit(): void {
    this.restApi.ClearScearchText.asObservable().subscribe(data=>{
      if(data == "filter-categories"){
        // console.log(data,"from modal apply")
      this.searchText = ""

      if(this.count_ret){
        
        if(this.count_ret["category"].length == 0){
          this.all_.checked = false
          this.categories.forEach(element => {
            element.checked = false
            
            
          });
           
          
          
        }
        this.categories.forEach(d=>d.checked = this.count_ret['category'].includes(d.value))
        if(this.categories.length == this.count_ret['category'].length){
          this.all_.checked = true
        }
        else{
          this.all_.checked = false
        }

      }
      else{
      if(this.filter_model.category == "Category"){

        this.categories.forEach(element => {
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
     
      // this.categorySelectedPricing = []
       
       this.categories.forEach(d=>{
         d.checked = true
        //  this.categorySelectedPricing.push(d.value)
       })
       this.all_ = {...this.all_ , ...{"checked": true}}
    }
    else{
     
      // this.categorySelectedPricing = []
      this.categories.forEach(d=>{
        d.checked = false
        
      })
      this.all_ = {...this.all_ , ...{"checked": false}}

    }
     
    
  }
  valueChangeSelectPricing(event:any){
    this.categories.filter(d=>d.value == event.value)[0].checked = event.checked
     
    if(event.checked){
      // if(!(event.value in this.categorySelectedPricing)){
      //   this.categorySelectedPricing.push(event.value)

      // }
    }
    else{
      this.all_ = {...this.all_ , ...{"checked": false}}
      
      // this.categorySelectedPricing = this.categorySelectedPricing.filter(d=>d!=event.value)
    }
    
     


  }
  valueChangeSelect(event:any){
    this.retailerSelected = event
    this.categoryChange.emit(event)
  }
  apply(id){
    if(this.pricing){
      this.filterApply.emit({"key" : "Category" , "values" :  this.categories.filter(d=>d.checked).map(d=>d.value)})

    }
    else{
      this.filterApply.emit({"key" : "Category"})

    }

   
    this.closeModal.emit(id)
    this.searchText = ""
  }


}
