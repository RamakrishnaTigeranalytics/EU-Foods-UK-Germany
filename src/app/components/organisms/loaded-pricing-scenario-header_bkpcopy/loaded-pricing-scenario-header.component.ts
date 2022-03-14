import { Component, Output, EventEmitter, ViewChild, OnInit, Input,SimpleChanges } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CheckboxModel, ListPromotion, MetaInfo, PricingModel, PricingPromoModel } from '@core/models';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ModalService } from '@molecules/modal/modal.service';
import {PricingService,OptimizerService,} from "@core/services"
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
 
// import {FlatTreeControl} from "@angular/cdk/tree"
import {MatAccordion} from '@angular/material/expansion';
import * as FileSaver from 'file-saver';
import * as utils from "@core/utils"
 
import {DatePickerComponent} from 'ng2-date-picker';
import * as moment from 'moment';

 
   
@Component({
    selector: 'nwn-loaded-pricing-scenario-header',
    templateUrl: './loaded-pricing-scenario-header.component.html',
    styleUrls: ['./loaded-pricing-scenario-header.component.css'],
})
export class LoadedPricingScenarioHeaderComponent implements OnInit {
    datePickerConfig = {
        min : '1-1-2022',
        max : '31-12-2022'
    }
    rets = ['Orbit OTC' ]
    panels = ["Tander" , "Lenta" , "Pyatraochka"]
    disable_button = true
    disable_save_download = true
    @ViewChild(MatAccordion) accordion: MatAccordion;
    @ViewChild('dayPicker') datePicker: DatePickerComponent;
    step = 0;
    uploaded_file:any = null
    mindate = "01-01-2022"

    open(element) { 
         //console.log(element , "");
        (element as DatePickerComponent).api.open()
       
    }  
    close() { this.datePicker.api.close(); }



  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
    
    
    selectedIndex!: number;
    treemode = false
    
    
     
  
     
    constructor( private formBuilder: FormBuilder,
        private toastr: ToastrService,private pricingService : PricingService ,
        private modalService: ModalService,
        private optimizeService : OptimizerService) {
           
        this.pricingForm = this.formBuilder.group({
            // e.account_name  :new FormGroup({
            products : this.formBuilder.array([])
        // })

    })
    this.lenta  = this.pricingForm.get('products') as FormArray
    
}
    @Input()
    pricingArray : PricingModel[] = []

    

    @Input()
    count_ret : any
    @Input()
    showtbas= false
    unique_retailers : any[] = []
    lpi = 0
    rsp = 0
    cogs = 0
    elasticity = 0
    currentProduct:any = null
    currentProductGroup:CheckboxModel[] = []
    pricingForm : FormGroup
    lenta : FormArray
    selected_main_product : string;
    selected_sub_product : string;
    displayProduct:any[]= []
    ret = ['abc']
    chosen_promotion : ListPromotion = null as any
    applyAllMetric = "List Price"
    date_form = {
        "index" : null,
        "metric_type" : null
    }


    addRet(){
        this.ret = [...this.ret , 'abd']
        this.getTabLength()
    }

    @Output()
    modalEvent = new EventEmitter<string>();

    @Output()
    simulateResetEvent = new EventEmitter<any>()

    @Output()
    loadScenarioEvent = new EventEmitter<any>()

    @Output()
    removeRetailerEvent = new EventEmitter()

    selectedDate;

   

    removeProductEvent(index , retailer){
        //console.log(index , "event")
        //console.log(retailer , "product of")
        //console.log(this.lenta.value , "array values")
        this.removeRetailerEvent.emit({
            "product" : {
                "retailer" : retailer,
                "product" : this.lenta.value[index]["product_group"]
            }
        })
    } 
    removeRetailer(retailer){
        this.removeRetailerEvent.emit({
            "retailer" : {
                "retailer" : retailer,
               
            }
        })

    }
    closeModal($event){
        this.uploadFile()
        this.modalService.close($event)
    }
    downloadWeekly(){
        
        this.pricingService.downloadPricingWeekly(this.pricingForm.value).subscribe(data=>{
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
            // //console.log(data , "download api called and returned...")
            this.toastr.success('File Downloaded Successfully','Success');
            FileSaver.saveAs(
                blob,
                'pricingWeekly' + '_export_' + new Date().getTime() + 'xlsx'
                )
                ,(err:any)=>{
                    this.toastr.warning(err.error,'Failed');
                }
        })
    }

    downloadPricing(){
        if(this.disable_save_download){
            return
        }
        this.pricingService.downloadPricing().subscribe(data=>{
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
            //console.log(data , "download api called and returned...")
            this.toastr.success('File Downloaded Successfully','Success');
            FileSaver.saveAs(
                blob,
                'pricing' + '_export_' + new Date().getTime() + 'xlsx'
                )
                ,(err:any)=>{
                    this.toastr.warning(err.error,'Failed');
                }
        })
    }

    saveScenario($event){
        //console.log(this.pricingForm.value , "....pricing from value....")
        if($event['type'] == "saveas"){
            $event['name']
            $event['comments']
            let form = {
                "name" : $event['name'],
                "comments" : $event["comments"],
                'value':this.pricingForm.value


            }
            this.pricingService.savePricingScenario(form).subscribe(data=>{
                if(data){
                    this.toastr.success('Scenario Saved Successfully','Success')
                    this.modalService.close('save-scenario')
                    let promotion : ListPromotion = {
                        "id" : data['saved_id'],
                        "name" : $event['name'],
                        "comments" : $event['comments'],
                        "scenario_type" : "pricing",
                    "meta" : this.getMetaArray(this.pricingForm.value)
    
                    }
                    
                   this.chosen_promotion = promotion

                    this.optimizeService.addPromotionList(promotion)

                }
                
            })
           

        }


    }
    getMetaArray(pricing_form){
        //console.log(pricing_form , "pricing form")
        
        let res:any= []
        pricing_form['products'].forEach(element => {
            res.push({
                "retailer" : element.account_name,
                "product_group" : element.product_group,
               
                "pricing" : {
                    "cogs_date" : element.cogs_date,
                    "list_price_date" : element.list_price_date,  
                    "rsp_date": element.rsp_date,
                    "promo_date" : element.promo_date,
                    "base_lpi" : element.list_price,
                    "base_rsp" : element.rsp,
                    "base_cogs" : element.cogs ,
                    "base_promo" : element.promo_price,

                    "lpi" : element.inc_list_price,
                    "rsp" : element.inc_rsp,
                    "cogs" : element.inc_cogs,
                    "promo" : element.inc_promo_price,
                    
                    "follow_competition" : element.follow_competition,
                    "inc_elasticity" : element.inc_elasticity,
                    "inc_net_elasticity":element.inc_net_elasticity,
                    "base_elasticity" : element.elasticity,
                    "base_net_elasticity":element.net_elasticity,
                    "is_tpr_constant":element.is_tpr_constant
                }
            })
            
        });
        return res

         
    }
    isCheckBoxModel(check:CheckboxModel[] , val){
        return check.find(c=>c.value == val)?.checked
       
    }

    applyCloseEvent($event){
        // //console.log($event , "Event..")
        // //console.log(this.currentProduct , "current  retailer")
        // $event['metric']
        // $event['value']["date"]
        // $event['value']["applyElasticity"]

        // $event['products']

        let ctrl =  this.lenta.controls.filter(d=>(d.get('account_name')?.value == this.currentProduct))
        ctrl = ctrl.filter(d=>this.isCheckBoxModel( $event['products'], d.get('product_group')?.value))
        // ctrl[0].controls.product_group.value

        ctrl.forEach(c=>{
            let patch = {}
            if($event['metric'] == 'Cogs'){
            //  patch['disable_cogs'] =  $event.checked
            patch['cogs_date'] = $event['value']["applyDate"]
            patch["inc_cogs"] =  $event['value']["applyElasticity"]   
 
            }
            else if($event['metric'] == 'List price'){
                // debugger
                // let base = c.value['list_price']
                // let percent =  
                patch['list_price_date'] = $event['value']["applyDate"]
                patch["inc_list_price"] =  $event['value']["applyElasticity"]            //  patch['disable_list_price'] =  $event.checked
 
            }else if($event['metric'] == 'Retail price'){
            //  patch['disable_rsp'] =  $event.checked
            patch['rsp_date'] = $event['value']["applyDate"]
            patch["inc_rsp"] =  $event['value']["applyElasticity"]     
 
            }else if($event['metric'] == 'Elasticity'){
             patch['disable_elasticity'] =  $event.checked
 
            }
            else if($event['metric'] == 'Promo price'){
                //console.log($event , "promo price event")
                patch['promo_date'] = $event['value']["applyDate"]
                patch["inc_promo_price"] =  $event['value']["applyElasticity"]  
                patch["is_tpr_constant"]  = $event["tpr_constant"]
 
            }
            c.patchValue(patch)
        
        })
        // //console.log(this.pricingForm.value , "ctrl vaues")
        this.modalService.close('apply-all-popup')
        
    }

    removeDate(index , v){
        let patch = {

        }
        if(v == 'list_price_date'){
            patch['list_price_date'] = null
        }
        else if(v == 'cogs_date'){
            patch['cogs_date'] = null
        }
        else if(v == 'rsp_date'){
            patch['rsp_date'] = null
        }
        else if(v == 'promo_date'){
            patch['promo_date'] = null

        }
        
        // debugger
        this.lenta.at(index).patchValue(patch)

    }

    applyallOpen($event , product){
        // //console.log($event , "event")
        // //console.log(product , "product..")
        this.currentProduct = product
        this.currentProductGroup = [...this.currentProductGroup,...this.lenta.value.filter(
            d=>d.account_name == product).map(d=>({
            "value" : d.product_group , "checked" : true
        }))]
        this.currentProductGroup =[...new Set(this.currentProductGroup.map(v=>v.value))].map(e=>({"value" : e,"checked" : true}))
        // debugger
        // //console.log(this.currentProductGroup , "currentproductgroup")
    
    //    let update =  this.lenta.value.find(d=>(d.account_name === product))

       let ctrl =  this.lenta.controls.filter(d=>(d.get('account_name')?.value == product))
    //    //console.log(ctrl , "update form valus..")

       ctrl.forEach(c=>{
           let patch = {}
           if($event.value == 'Elasticity'){
                patch['follow_competition'] =  $event.checked
                
    
               }
        //    if($event.value == 'Cogs'){
        //     patch['disable_cogs'] =  $event.checked

        //    }
        //    else if($event.value == 'List price'){
        //     patch['disable_list_price'] =  $event.checked

        //    }else if($event.value == 'Retail price'){
        //     patch['disable_rsp'] =  $event.checked

        //    }else if($event.value == 'Elasticity'){
        //     patch['follow_competition'] =  $event.checked
        //     // return

        //    }
        //    else{
        //     patch['disable_promo'] =  $event.checked

        //    }
           c.patchValue(patch)
       
       })
    //    debugger
       
        if($event.checked){
            this.applyAllMetric = $event.value
            if($event.value != 'Elasticity'){
               
                this.sendMessage('apply-all-popup')

            }
           
        }
        
        // sendMessage()"

    }
    openSavePopup(modal){
        if(this.disable_save_download){
            return 
        }
        this.sendMessage(modal)
    }

    fileUpload($event){
        //console.log($event , "iploadfile even")
        this.uploaded_file = $event
        
    }
    uploadFile(){
        this.pricingService.uploadWeeklyPricing(this.uploaded_file).subscribe(data=>{
            //console.log(data , "uploaded file data return")
            if(data){
                data.forEach(element => {

                    let ctrl =  this.lenta.controls.find(d=>(d.get('account_name')?.value == element['Account name']) &&
                    (d.get('product_group')?.value == element['Product group']))

                    ctrl?.patchValue({
                        
                        inc_cogs : element['Inc COGS %'],
                        inc_list_price :  element['Inc List Price %'],
                        inc_rsp : element['Inc Retail Price %']
    
    
                    })

                    
                
                })

            }

           
            
        })
 }

    sendMessage(modalType: string): void {
        // if(modalType == )
        this.modalEvent.emit(modalType);
    }
    subProductSelectEvent(event){
        //console.log(event , "sub product event...")
        this.selected_sub_product = event
        this.currentProduct = this.selected_main_product + this.selected_sub_product
        // //console.log(this.selected_sub_product , "selected sub product")
    }
    selectMainProduct(product){
        this.selected_main_product = product
        // //console.log(this.selected_main_product , "selected main product...")
    }
    onTabChanged(e){
        this.selected_main_product = this.displayProduct[e.index]
        this.currentProduct = this.selected_main_product + this.selected_sub_product
        // //console.log(this.displayProduct[e.index] , "display producr") 
        // e.index
        // //console.log(e, "tab event...")
        //console.log(this.selected_main_product)
    }

    // sho and hide more action menu
    isShowDivIf = true;

    toggleDisplayDivIf() {
        this.isShowDivIf = !this.isShowDivIf;
    }

    // expand and collapse
    isExpand = false;
    expandHeader() {
        this.isExpand = !this.isExpand;
    }
    // get lenta():FormArray{
    //     // debugger
    //     return 
    // }

    products: any[] = [
        {
            productName: 'Walmart',
        },
        {
            productName: 'Target',
        },
        {
            productName: 'Kohl’s',
        },
        {
            productName: 'Home Depot',
        },
        {
            productName: 'Publix',
        },
        {
            productName: 'Dollar Tree',
        },
        {
            productName: 'Costco',
        },
        {
            productName: 'Target',
        },
    ];

    productItems: any[] = [
        {
            productItemName: 'Milkyway XXL',
        },
        {
            productItemName: 'Skittles XXL',
        },
        {
            productItemName: 'Juicy Fruit XXL',
        },
        {
            productItemName: 'Bounty XXL',
        },
        {
            productItemName: 'Orbit XXL',
        },
        {
            productItemName: 'Skittles XXL',
        },
        {
            productItemName: 'Juicy Fruit XXL',
        },
        {
            productItemName: 'Bounty XXL',
        },
    ];

    select(index: number) {
        this.selectedIndex = index;
    }

    openTab = 0;
    toggleTabs($tabNumber: number): void {
        this.openTab = $tabNumber;
    }
    applyDateTopopup(date , i , type , disable = false){
        if(disable){
            return
        }
      
        this.selectedDate= date
        this.date_form = {
            "index": i,
            "metric_type" : type
        }
        

       this.modalService.open("calendar-popup")
    }
    applyCloseEventCalendarPopup($event){
        let patch = {

        }
        if($event["date_form"]["metric_type"] == 'promo'){
            patch = {
                promo_date : $event["value"]["applyDate"]
            }

        }
        else if($event["date_form"]["metric_type"]=="cogs"){
            patch = {
                cogs_date : $event["value"]["applyDate"]
            }

        }
        else if($event["date_form"]["metric_type"]=="listprice"){
            patch = {
                list_price_date : $event["value"]["applyDate"]
            }

        }
        else if($event["date_form"]["metric_type"]=="retail"){
            patch = {
                rsp_date : $event["value"]["applyDate"]
            }

        }
        this.lenta.at($event["date_form"]["index"]).patchValue(patch)
        //console.log($event , "$event popup...")
        this.modalService.close('calendar-popup')
    }
    openInfoEvent($event){
        this.modalService.open($event)
    }

    load_scenario_event($event){
        this.modalService.close('load-scenario-pricingtool-popup')
        this.chosen_promotion = $event as ListPromotion
       this.loadScenarioEvent.emit($event)
       //console.log(this.chosen_promotion , "chosen promotion.........")
    }
    clearFormArray = (formArray: FormArray) => {
        formArray = this.formBuilder.array([]);
      }
      _updatePromoPriceVar(e:PricingModel , form){
          if(e.tpr_discount){
form['promo_price'] = form['promo_price'] +  utils.reducePercent(e.retail_median_base_price_w_o_vat , e.tpr_discount)
form['promo_price_count'] = form['promo_price_count'] + 1
          }
          
      }
      _updateASPVar(e:PricingModel , form){
        if(e.tpr_discount){
form['asp'] = form['asp'] +  e.retail_median_base_price_w_o_vat
form['asp_count'] = form['asp_count'] + 1
        }
        
    }
    promo_changed($event , i){
        let base_rsp =  this.lenta.at(i).get('rsp')?.value
        let inc_rsp_per = this.lenta.at(i).get('inc_rsp')?.value
        let base_promo =  this.lenta.at(i).get('promo_price')?.value
        let inc_promo_per = this.lenta.at(i).get('inc_promo_price')?.value
        let tpr = utils.findPercentDifference(
            utils.increasePercent(base_rsp,inc_rsp_per),
            utils.increasePercent(base_promo , inc_promo_per)

        )
        this.lenta.at(i).patchValue({
         "avg_tpr" : tpr
     })



    }
      rsp_changed($event , i){
          let tpr_const = this.lenta.at(i).get('is_tpr_constant')?.value
          if(tpr_const){
              this.lenta.at(i).patchValue({
                  "inc_promo_price" : $event
              })
          }
          else{
            //   debugger
           let base_rsp =  this.lenta.at(i).get('rsp')?.value
           let inc_rsp_per = this.lenta.at(i).get('inc_rsp')?.value
           let base_promo =  this.lenta.at(i).get('promo_price')?.value
           let inc_promo_per = this.lenta.at(i).get('inc_promo_price')?.value
           let tpr = utils.findPercentDifference(
               utils.increasePercent(base_rsp,inc_rsp_per),
               utils.increasePercent(base_promo , inc_promo_per)

           )
           this.lenta.at(i).patchValue({
            "avg_tpr" : tpr
        })


          }
        //   //console.log(tpr_const , "tpr constant")
        //   //console.log($event , i , "rsp changed")
      }
      _populateForm(form){
          Object.values(form).forEach((e:any)=>{

            let tpr_avg = utils.findPercentDifference(utils._divide(e.asp ,e.asp_count ) , 
            utils._divide(e.promo_price ,e.promo_price_count ))
            //   debugger
              this.lenta.push(this.formBuilder.group({
                retailer : [e.retailer],
                account_name : [e.account_name],
                product_group : [e.product_group],
                list_price: [Number((utils._divide(e.list_price ,e.list_price_count )).toFixed(2))],
                inc_list_price : [0],
                cogs: [Number(utils._divide(e.cogs ,e.cogs_count )).toFixed(2)],
                inc_cogs: [0],
                elasticity : [Number((e.elasticity).toFixed(2))],
                net_elasticity : [Number((e.net_elasticity).toFixed(2))],
                inc_net_elasticity : [Number((e.net_elasticity).toFixed(2))],
                inc_elasticity : [Number((e.elasticity).toFixed(2))],
                rsp: [Number((utils._divide(e.rsp ,e.rsp_count )).toFixed(2))],
                promo_price : [Number((utils._divide(e.promo_price ,e.promo_price_count )).toFixed(2))],
                inc_promo_price : [0],
                inc_rsp: [0],
                follow_competition: [false],
                list_price_date :[null],
                cogs_date :[null],
                rsp_date :[null],
                promo_date : [null],
                disable_list_price : [false],
                disable_cogs : [false],
                disable_rsp : [false],
                disable_elasticity : [false],
                disable_promo : [tpr_avg ? false : true],
                is_tpr_constant : [false],
                avg_tpr : [tpr_avg]


              }))
          })

        //   this.lenta.valueChanges.subscribe(data=>{
        //       //console.log(data , "data value changes lenta")
        //       data.forEach((element , index) => {
                  
        //         //   this.lenta.at(index).patchValue({
        //         //       "inc_promo_price" : element.inc_rsp,
                    

        //         //   },
        //         //   {emitEvent: false})
                  
        //       });
        //   })
      }

    groupPricing(){
        // debugger
        let mindate
        let maxdate
        
        //console.log(this.pricingArray , "pricing Array...")
        if(this.pricingArray.length > 0){
            mindate = new Date(this.pricingArray[0].date)
            maxdate = new Date(this.pricingArray[0].date)
            this.disable_button = false
            this.isExpand = true
        }
        else{
            this.disable_button = true
            this.isExpand = false

        }
        this.unique_retailers = []
       this.lenta.clear()
    
let form={

}
        this.pricingArray.forEach(e=>{
            let retailer = e.account_name + e.product_group
            // debugger
            if(retailer in form){
                form[retailer]["list_price"] = form[retailer]["list_price"] +  e.list_price ,
                form[retailer]["list_price_count"]  = form[retailer]["list_price_count"] + 1,
                form[retailer]["cogs"]  = form[retailer]["cogs"]+ e.cogs,
                form[retailer]["cogs_count"] = form[retailer]["cogs_count"] + 1,
                form[retailer]["rsp"]  = form[retailer]["rsp"]  +  e.retail_median_base_price_w_o_vat,
                form[retailer]["rsp_count"]  =  form[retailer]["rsp_count"]+ 1
            }
            else{
            form[retailer] = {
                "list_price" : e.list_price ,
                "list_price_count" : 1,
                "cogs" : e.cogs,
                "cogs_count" : 1,
                "rsp" : e.retail_median_base_price_w_o_vat,
                "rsp_count" : 1,
                "elasticity" : e.base_price_elasticity,
                // "net_elasticity" : e.net_elasticity,
                "promo_price" : 0,
                "promo_price_count" : 0,
                "asp" : 0,
                "asp_count" : 0,
                "retailer" : e.account_name + e.product_group,
                "account_name" : e.account_name,
                "product_group" : e.product_group,
            }    
            }
            this._updatePromoPriceVar(e, form[retailer])
            this._updateASPVar(e, form[retailer])
           
        

             
            e.date = new Date(e.date)
            if(e.date < mindate){
                mindate = e.date
            }
            if(e.date > maxdate){
                maxdate = e.date
            }
           
          
            
             
        })
        if(this.pricingArray.length > 0){
            // debugger
            this.datePickerConfig = {
                ...this.datePickerConfig,
               ...{ min : `${mindate.getDate()}-${mindate.getMonth()+1}-${mindate.getFullYear()}`,
                  max : `${maxdate.getDate()}-${maxdate.getMonth()+1}-${maxdate.getFullYear()}`
          
               }
              };
              //console.log(mindate , "datepickconfig mindate")
              //console.log(maxdate , "datepickconfig maxdate")
              //console.log(this.datePickerConfig , "datepickconfig")
            //   this.selectedDate = `${mindate.getDate()}-${mindate.getMonth()+1}-${mindate.getFullYear()}`

        }
        else{
            this.datePickerConfig = {
                min : '1-1-2022',
                max : '31-12-2022'
            }

        }
         
       
        this._populateForm(form)
        //console.log(form , "formpromopriceinclusion")
        // debugger
        if(this.chosen_promotion){
            if(utils.isArray(this.chosen_promotion.meta)){
                (this.chosen_promotion.meta as MetaInfo[]).forEach(m=>{
                    let pricing = m.pricing as PricingPromoModel
                   let ctrl =  this.lenta.controls.find(d=>(d.get('account_name')?.value == m.retailer) &&
                    (d.get('product_group')?.value == m.product_group))
                    //console.log(ctrl , "contol chosen")
    
                  
                
                    ctrl?.patchValue({
                        list_price_date : pricing.list_price_date ? moment(pricing.list_price_date , "YYYY-MM-dd"):pricing.list_price_date,
                        cogs_date :pricing.cogs_date ? moment(pricing.cogs_date, "YYYY-MM-dd") :pricing.cogs_date,
                        rsp_date :pricing.rsp_date ? moment(pricing.rsp_date, "YYYY-MM-dd"): pricing.rsp_date,
                        promo_date : pricing.promo_date,
                        inc_cogs : pricing.cogs,
                        inc_list_price : pricing.lpi,
                        inc_rsp :pricing.rsp,
                        inc_promo_price : pricing.promo,
                        follow_competition : pricing.follow_competition,
                        inc_net_elasticity : pricing.inc_net_elasticity,
                        inc_elasticity : pricing.inc_elasticity
    
    
    
    
                    })
                    let base_rsp =  ctrl?.get('rsp')?.value
                    let inc_rsp_per = ctrl?.get('inc_rsp')?.value
                    let base_promo =  ctrl?.get('promo_price')?.value
                    let inc_promo_per = ctrl?.get('inc_promo_price')?.value
                    let tpr = utils.findPercentDifference(
                        utils.increasePercent(base_rsp,inc_rsp_per),
                        utils.increasePercent(base_promo , inc_promo_per)
         
                    )
                    ctrl?.patchValue({
                     "avg_tpr" : tpr
                 })
    
                })
                
            }
            
            // let ret = (this.chosen_promotion.meta as MetaInfo[]).find(d=>d.retailer == e.account_name && d.product_group == e.product_group)
        }
       
        this.unique_retailers = this.lenta.value
        //console.log(this.unique_retailers , "unique retailers/...")
        if(this.unique_retailers.length > 0){
            this.currentProduct = this.unique_retailers[0]['retailer']
            this.selected_main_product = this.unique_retailers[0]['account_name']
            this.selected_sub_product = this.unique_retailers[0]['product_group']
            this.currentProduct = this.selected_main_product + this.selected_sub_product
            
        }
      
        

        // //console.log(arr , "final array unique")
        //console.log(this.pricingForm , "pricing form values")
        // //console.log)
     
        // pricingForm.get('Lenta').controls.get('products')'
        this.displayProduct = this.pricingForm.controls.products.value.map(d=>d.account_name)
        this.displayProduct =  [...new Set(this.displayProduct)]
        if(this.displayProduct.length > 0){

            this.isExpand = true
        }
        else{
            this.isExpand = false
        }
       
      


    }
    
   
    simulatePrice(value){
        
        if(value == 'reset'){
            this.chosen_promotion = null as any
            this.simulateResetEvent.emit({
                "type" : value,
                'data' : this.pricingForm.value
            })

        }
        else{
            if(this.disable_button){
                return 
            }
            this.simulateResetEvent.emit({
                "type" : value,
                'data' : this.pricingForm.value
            })

        }
       

    }
   
    getTabLength(){
        // debugger
        var itemsLength = $(".mat-tab-label").length;
        var itemSize = $(".mat-tab-label").outerWidth(true);
        var getMenuSize  = itemsLength * itemSize!
        var getMenuWrapperSize =  $(".mat-tab-label-container").outerWidth();
        //console.log(itemsLength, "itemsLength")
        //console.log(itemSize, "itemSize")
        if(getMenuSize > getMenuWrapperSize!){
            $(".mat-tab-header-pagination").css('display' , 'flex')
        }
        else{
            $(".mat-tab-header-pagination").css('display' , 'none')
        }
        

        // mat-tab-header-pagination-chevron
        // mat-tab-header-pagination-chevron
        // //console.log(getMenuWrapperSize , "menu wrapper ")
        // //console.log(getMenuSize , "get menu size...")
    }
    ngAfterViewInit() {
        this.getTabLength()
        // this.accordion.openAll()
        
    }

    tpr_change($event , i){
        //console.log($event , i , "event with i")
        // debugger;
        let pro = this.lenta.at(i).get('promo_price')?.value
        // if(!pro){
        //     return 
        // } 
        //console.log(pro , "promo price")
        this.lenta.at(i).patchValue({
            "disable_promo" : $event.checked
        })

        if($event.checked){
            let rsp_change = this.lenta.at(i).get('inc_rsp')?.value
            this.lenta.at(i).patchValue({
                "inc_promo_price" : rsp_change
            })
            let base_rsp =  this.lenta.at(i).get('rsp')?.value
           let inc_rsp_per = this.lenta.at(i).get('inc_rsp')?.value
           let base_promo =  this.lenta.at(i).get('promo_price')?.value
           let inc_promo_per = this.lenta.at(i).get('inc_promo_price')?.value
           let tpr = utils.findPercentDifference(
               utils.increasePercent(base_rsp,inc_rsp_per),
               utils.increasePercent(base_promo , inc_promo_per)

           )
           this.lenta.at(i).patchValue({
            "avg_tpr" : tpr
        })
    

        }
        // this.lenta.at(i).get('promo_price')?.disable();
//         if($event.checked){
//             this.lenta.get(i)?.patchValue({
//                 "disable_promo" : $event.checked
// })

//         }
//         else{
//             this.lenta.get(i)?.patchValue({
//                 "disable_promo" : $event.checked
// })

//         }
        
    }

    ngOnInit() {
        this.pricingService.getPricingSimulatedObservable().subscribe(data=>{
            if(data){
this.disable_save_download = false
this.isExpand = false
            }
            else{
                this.disable_save_download = true
            }
        })

        // this.lenta.valueChanges.subscribe(data=>{
           
        //     data.forEach((element , index) => {
        //         //console.log(element , index , "element and index...")
        //         if(element.is_tpr_constant){
        //             this.lenta.at(index).patchValue({
        //                 "disable_promo" : true
        //             })

        //         }
        //         else{
        //             this.lenta.at(index).patchValue({
        //                 "disable_promo" : false
        //             })

        //         }
                
        //     });

        // })
        
    

        // this.pricingForm.valueChanges.subscribe(data=>{
        //     //console.log(data , "data ...form changes")
        //     // if(data['products']['is_tpr_constant']){

        //     // }
        //     // else{

        //     // }
        //     // //console.log(data , "values changes form prcing form....")
        // })
    }
    ngOnChanges(changes : SimpleChanges) :void{
        for (let property in changes) {
            if (property === 'pricingArray') {
                this.pricingArray = changes[property].currentValue
                this.groupPricing()

            }
            // if (property === 'count_ret') {
            //     //console.log(changes[property].currentValue , "count_ret")
            //     // this.pricingArray = changes[property].currentValue
            //     // this.groupPricing()

            // }
    }
    }
}
