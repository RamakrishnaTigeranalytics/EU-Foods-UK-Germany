import { Component, OnInit , Input,SimpleChanges, Output , EventEmitter } from '@angular/core';
import { CheckboxModel, HierarchyCheckBoxModel, Product } from '@core/models';
import { SimulatorService } from '@core/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'nwn-add-new-pricingtool-popup',
  templateUrl: './add-new-pricingtool-popup.component.html',
  styleUrls: ['./add-new-pricingtool-popup.component.css']
})
export class AddNewPricingtoolPopupComponent implements OnInit {

  searchText  = ''

  all_ : CheckboxModel = {"value" : "All" , "checked" : false}

  @Input()
  heading = 'Add more'

  @Input()
  hierarchy_model : Array<HierarchyCheckBoxModel> = []

  @Input()
  count_ret:any
  @Input()
  filter_model

  



  @Output()
  hier_null = new EventEmitter()

  @Output()
  productChange = new EventEmitter()

  @Output()
  filterApply  = new EventEmitter()

  selectedHierModel:any[] = []

  // Product groups

  constructor(public restApi: SimulatorService,private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.restApi.ClearScearchText.asObservable().subscribe(data=>{
      
      this.searchText = ""
      if(data=="addnew-pricngtool"){
        //console.log(this.filter_model , "filter model...")
        //console.log(this.count_ret , "count ret.........")
        if(this.count_ret){
        if(this.count_ret["retailers"].length == 0){
         
          this.hierarchy_model.forEach(d=>{
            d.checked = false
            d.child.forEach(ch=>ch.checked = false)
            // this.productChange.emit({"value" : d.value , "checked" : false})
            
          })

        }
        if(this.count_ret["products"].length == 0){
          

          this.hierarchy_model.forEach(d=>{
            
              d.child.forEach(de=>{
                de.checked = false
              })
            
          })
        }

      }

      }
    })
  }

  inputChangeEvent($event){
    this.searchText = $event
  }

 
  validateHier(){
    let parent_valid = false
    let child_valid = false
    this.hierarchy_model.forEach(d=>{
      if(d.checked){
        parent_valid = true
        d.child.forEach(d=>{
          if(d.checked){
            child_valid = true

          }
        })
      }
    })
    if(!parent_valid){
      this.toastr.error("choose atleast one retailer")
      return

    }
    if(!child_valid){
      this.toastr.error("choose product for retailer")
      return
    }
   
    return parent_valid && child_valid
  }
  allselect($event){
     
    if($event.checked){
      this.hierarchy_model.forEach(d=>{
      
         d.checked = true
        d.child.forEach(ch=>{
          ch.checked = true
        })
      
    })
     
      
    }
    else{
      this.hierarchy_model.forEach(d=>{
      
        d.checked = false
       d.child.forEach(ch=>{
         ch.checked = false
       })
     
   })
     
     

    }
     
    
  }
  valueChangeSelect(event:any){
    // {"value" : '' , "checked" : false}
    // this.productChange.emit(event)
    let ret = this.hierarchy_model.filter(d=>d.value == event.value)[0]
    ret.checked = event.checked
   //console.log(event , "value change event..")
   
  }
  checkTrue(children:CheckboxModel[]){
    let ret = false
    children.forEach(d=>{
      if(d.checked){
        ret = true
      
      }
    })
return ret
  }
  valueChangeSelectProduct(event:any , retailer){
    // debugger
    // //console.log(event , "event")
    // //console.log(retailer , "retailer")
    // //console.log(this.hierarchy_model , "hier model init")
    
    let ret = this.hierarchy_model.filter(d=>d.value == retailer.value)[0]
    //console.log(ret , "ret...")
    
    ret.child.filter(ch=>ch.value == event.value)[0].checked = event.checked
    ret.checked = this.checkTrue(ret.child)
    // //console.log(ret , "retttt after fin")
    // //console.log()
    // if(this.checkTrue(ret.child)){
    //   ret.checked = true
    // }
    

    
    
// //console.log(this.hierarchy_model , "hier model")
    // retailer.checked = true
  }
  apply(){
    // //console.log(this.hierarchy_model , "hiermodel")
  
    // //console.log(data , "genrated data..")

    if(this.validateHier()){
      this.filterApply.emit({
      "key" : "Product groups",
       
    })
  }
    // }
    // this.filterApply.emit({
    //   "key" : "Product groups"
    // })
  }
  ngOnChanges(changes: SimpleChanges) {
   
    for (let property in changes) {
      if (property === 'heading') {
        if(changes[property].currentValue ==  "select retailer and product"){
          this.all_.checked = true
        }

      }}
    // //console.log(changes , "changes")
 
     
}

}
