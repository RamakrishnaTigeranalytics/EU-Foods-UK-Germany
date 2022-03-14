import { Component, OnInit, Input ,EventEmitter, Output} from '@angular/core';
import { CheckboxModel, FilterModel } from '@core/models';
import { SimulatorService } from '@core/services/simulator.service';
import {ModalApply} from "../../../shared/modal-apply.component"
@Component({
  selector: 'nwn-filter-stragetic-cells',
  templateUrl: './filter-stragetic-cells.component.html',
  styleUrls: ['./filter-stragetic-cells.component.css']
})
export class FilterStrageticCellsComponent extends ModalApply implements OnInit {

  @Input()
  pricing = false

  all_ : CheckboxModel = {"value" : "All" , "checked" : false}
  // brandFormatSelectedPricing :any[] = []
  @Input()
  stragetic_cells:Array<CheckboxModel> = []
  @Output()
  strategicCellChange = new EventEmitter()
  @Input()
  filter_model : FilterModel

  @Input()
  count_ret : any = null

  placeholder:any = 'Search strategic cells'
  // retailerSelected:any = ''
  constructor(public restApi: SimulatorService) { 
    super()
  }

  ngOnInit(): void {
    this.restApi.ClearScearchText.asObservable().subscribe(data=>{
      if(data=="filter-stragetic-cells"){
        // console.log(data,"from modal apply")
      this.searchText = ""

      if(this.count_ret){
        if(this.count_ret["strategic_cell"].length == 0){
          this.all_.checked = false
          this.stragetic_cells.forEach(element => {
            element.checked = false
            
            
          });
           
          
          
        }
        this.stragetic_cells.forEach(d=>d.checked = this.count_ret['strategic_cell'].includes(d.value))
        if(this.stragetic_cells.length == this.count_ret['strategic_cell'].length){
          this.all_.checked = true
        }
        else{
          this.all_.checked = false
        }


      }
      else{
        if(this.filter_model.strategic_cell == "Strategic cells"){

          this.stragetic_cells.forEach(element => {
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
       
       this.stragetic_cells.forEach(d=>{
         d.checked = true
        //  this.brandFormatSelectedPricing.push(d.value)
       })
       this.all_ = {...this.all_ , ...{"checked": true}}
    }
    else{
     
      // this.brandFormatSelectedPricing = []
      this.stragetic_cells.forEach(d=>{
        d.checked = false
        
      })
      this.all_ = {...this.all_ , ...{"checked": false}}

    }
     
    
  }
  valueChangeSelectPricing(event:any){
    this.stragetic_cells.filter(d=>d.value == event.value)[0].checked = event.checked
     
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
    this.strategicCellChange.emit(event)
   
  }
  apply(id){
    if(this.pricing){
      this.filterApply.emit({"key" : "Strategic cells" , "values" : this.stragetic_cells.filter(d=>d.checked).map(d=>d.value)})

    }
    else{
      this.filterApply.emit({"key" : "Strategic cells"})

    }

   
    this.closeModal.emit(id)
    this.searchText = ""
  }
  
 
}
