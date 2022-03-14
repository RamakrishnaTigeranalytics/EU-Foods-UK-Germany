import { Component, OnInit, AfterViewInit, ViewChild, ElementRef,Output,EventEmitter, Input } from '@angular/core';
import { CheckboxModel, HierarchyCheckBoxModel, PriceSimulated } from '@core/models';
import {PricingService} from "@core/services"
import  * as Utils from "@core/utils"
import { timeStamp } from 'console';
import { retry } from 'rxjs/operators';

@Component({
    selector: 'nwn-pricing-scenario-builder-tabs',
    templateUrl: './pricing-scenario-builder-tabs.component.html',
    styleUrls: ['./pricing-scenario-builder-tabs.component.css'],
})
export class PricingScenarioBuilderTabsComponent implements OnInit {
    @ViewChild('scrollOne') scrollOne: ElementRef;
    @ViewChild('scrollTwo') scrollTwo: ElementRef;
    @ViewChild('scrollOneOP') scrollOneOP: ElementRef;
    @ViewChild('scrollTwoOP') scrollTwoOP: ElementRef;
    translate_y: string = '';
    currentTranslateRate: string = '';
    format = "absolute"
    abs_selected:string = "selected"
    per_selected:string = "unselected"
    count = 0
    @Input()
    currency
    constructor(private elRef: ElementRef , private pricingService : PricingService) {}

    public weeklyTableWidth: any;
    public weeklyTableHeight: any;
    public aggregatedGraphWidth: any;
    baselineLiftChartData:any = []
    plChartData:any = []
    units:any
    inc_units:any
    lsv:any
    nsv:any
    cogs:any
    mac:any
    rsv:any
    cutomer_margin :any
    trade_expense :any
    tabular_data :any = null as any
    hierarchy_model:HierarchyCheckBoxModel[] = []
    price_simulated : PriceSimulated
    
    @Output()
    modalEvent = new EventEmitter()

    ngOnInit(): void {
        this.weeklyTableWidth = window.innerWidth - 155;
        this.weeklyTableHeight = window.innerHeight - 400;
        this.aggregatedGraphWidth = window.innerWidth - 155;
        // this.tabular_data = this.generateMock()
        this.pricingService.getPricingSimulatedObservable().subscribe(data=>{
            if(data){
                //console.log(data , "priing simulated")
                this.price_simulated = data
                this.generateGraphTableData(this.price_simulated)
                this.genrateHierachy()

            }
            else{


            }
        })
       
    }
    updateScroll(value:any){
        if(value == 'GraphBase'){
            const scrollOne = this.scrollOne.nativeElement as HTMLElement;
            const scrollTwo = this.scrollTwo.nativeElement as HTMLElement;

            scrollTwo.scrollLeft = scrollOne.scrollLeft;
        }
        else if(value == 'GraphSimulated'){
            const scrollOne = this.scrollOne.nativeElement as HTMLElement;
            const scrollTwo = this.scrollTwo.nativeElement as HTMLElement;

            scrollOne.scrollLeft = scrollTwo.scrollLeft;
        }
        else if(value == 'GraphOP'){
            const scrollOne = this.scrollOneOP.nativeElement as HTMLElement;
            const scrollTwo = this.scrollTwoOP.nativeElement as HTMLElement;

            scrollTwo.scrollLeft = scrollOne.scrollLeft;
        }
        else if(value == 'TableOP'){
            const scrollOne = this.scrollOneOP.nativeElement as HTMLElement;
            const scrollTwo = this.scrollTwoOP.nativeElement as HTMLElement;

            scrollOne.scrollLeft = scrollTwo.scrollLeft;
        }
      }

    filterApply($event){

        
        


// debugger
let selected:any =  [].concat.apply([],
    this.hierarchy_model.filter(d=>d.checked).map(
    d=>d.child.filter(d=>d.checked).map(
        d=>(
            {"retailer" : (d.id as string).split(d.value)[0] , "product" : d.value}
            )
        ) 
        ) as any[]
)
      
//console.log(selected , "selected....")
// debugger
let filtered :PriceSimulated = {"base" : [] , "simulated" : []};

filtered['base'] = this.price_simulated.base.filter(d=>selected.filter(s=>(s.retailer == d.account_name) && (s.product == d.product)).length > 0)
// this.price_simulated.base.filter(d=>selected.includes(s=>(s.retailer == d.account_name) && (s.product == d.product)))
// this.price_simulated.base.filter(d=>selected.includes(s=>(s.retailer == d.account_name) && (s.product == d.product)))
filtered['simulated']  = this.price_simulated.simulated.filter(d=>selected.filter(s=>(s.retailer == d.account_name) && (s.product == d.product)).length > 0)
// this.price_simulated.simulated.filter(d=>selected.includes(s=>(s.retailer == d.account_name) && (s.product == d.product)))
// this.hierarchy_model.filter(d=>d.checked)
        // this.hierarchy_model.filter(d=>d.checked)
        // this.price_simulated.base.forEach((d,i)=>{

        //     this.price_simulated.base[i].account_name

        // })
        // let filtered:PriceSimulated = this.price_simulated.base.filter()

        //console.log(filtered , "filteed data ...")

        this.generateGraphTableData(filtered)
        this.modalEvent.emit({
            "type" : "close",
            "id" : "summary-aggregate"
        })

    }

    _applyAll($event : HierarchyCheckBoxModel){
         
        this.hierarchy_model.forEach(d=>{
            d.checked = $event.checked
            d.child.forEach(v=>{
                v.checked = $event.checked
            })
        })
        //console.log(this.hierarchy_model , "apply alll methd")
    }

    _checkIfAllChildFalse(childern : CheckboxModel[]){
        // debugger
        let ret = true

        childern.forEach(d=>{
            //console.log(d.checked , "checked d")
            ret = d.checked
            if(d.checked){
                return
            }
             
             //console.log(ret , "setting retur n in llop")
        })
        //console.log(ret , "return value")
        return ret

    }

     
    hierarchyProductChange($event){
        
         
        if('product' in $event){  
            
            if($event.product.checked){
                let hier = this.hierarchy_model.filter(d=>d.value == $event.retailer.value)[0]
                hier.child.filter(d=>d.value == $event.product.value)[0].checked = true
                if(this._checkIfAllChildFalse(hier.child)){
                    // hier.checked = true

                }
                else{
                    // hier.checked = false
                }
            }
            else{
                let hier = this.hierarchy_model.filter(d=>d.value == $event.retailer.value)[0]
                hier.child.filter(d=>d.value == $event.product.value)[0].checked = false
                if(this._checkIfAllChildFalse(hier.child)){
                    // hier.checked = true

                }
                else{
                    // hier.checked = false
                }
                


            }

        }
        else{  
            if($event.value == "All"){
                this._applyAll($event)
            }
            else{
                let hier = this.hierarchy_model.filter(d=>d.value == $event.value)[0]
                hier.checked = $event.checked
                // if(!$event.checked){
                    hier.child.forEach(v=>{
                        v.checked = $event.checked
                    })


                // }
            }
            
            
            
            
        }
       


    }
    genrateHierachy(){ 
        this.count = 0
        this.hierarchy_model = []
        // this.hierarchy_model.push({"value" : "All" , "checked" : true,"child" : []})
        this.price_simulated.base.forEach(d=>{
            let hmodel = this.hierarchy_model.find(v=>v.value == d.account_name)
            if(hmodel){
                if(!hmodel.child.find(hm=>hm.value ==  d.product)){
                    hmodel.child.push({
                        "id" : d.account_name + d.product,
                        
                        "value" : d.product,
                        "checked" : true,
                    })

                }
                

            }
            else{
                this.count++

                this.hierarchy_model.push({
                    "value" : d.account_name,
                    "checked" : true,
                   
                    "child" :[{
                        "id" : d.account_name + d.product,
                        "value" : d.product,
                        "checked" : true
                    }]
                })

            }
       

        })
        this.config_ = {...this.config_ , ...{"placeholder" :  "Select("+ this.count + ")"}}
        
        //console.log(this.hierarchy_model , "hierarchy model in tabs")

        // this.hierarchy_model.push(
        //     {...d , ...{"child" : products.filter(p=>p.account_name == d.value)
        //     .map(m=>({"value" : m.product_group , "checked" : false,"id" : m.id}))}})

    }
    openModal(modal){
        this.modalEvent.emit({
            "type" : "open",
            "id" : modal
        })

    }
    genrate_table(data:PriceSimulated){
        // debugger
        let table_data = {
            // "All" : {
                

            // }
        }
        data.base.forEach((d , i)=>{
            if(d.product in table_data){
                table_data[d.product]["units"]["base"] = table_data[d.product]["units"]["base"] + data.base[i].total.units 
                table_data[d.product]["units"]["simulated"] = table_data[d.product]["units"]["simulated"] + data.simulated[i].total.units 

                table_data[d.product]["volume"]["base"] = table_data[d.product]["volume"]["base"] + data.base[i].total.volume 
                table_data[d.product]["volume"]["simulated"] = table_data[d.product]["volume"]["simulated"] + data.simulated[i].total.volume

                table_data[d.product]["cogs"]["base"] = table_data[d.product]["cogs"]["base"] + data.base[i].total.cogs 
                table_data[d.product]["cogs"]["simulated"] = table_data[d.product]["cogs"]["simulated"] + data.simulated[i].total.cogs 

                table_data[d.product]["lsv"]["base"] = table_data[d.product]["lsv"]["base"] + data.base[i].total.lsv 
                table_data[d.product]["lsv"]["simulated"] = table_data[d.product]["lsv"]["simulated"] + data.simulated[i].total.lsv 

                table_data[d.product]["nsv"]["base"] = table_data[d.product]["nsv"]["base"] + data.base[i].total.nsv 
                table_data[d.product]["nsv"]["simulated"] = table_data[d.product]["nsv"]["simulated"] + data.simulated[i].total.nsv 

                table_data[d.product]["te"]["base"] = table_data[d.product]["te"]["base"] + data.base[i].total.te 
                table_data[d.product]["te"]["simulated"] = table_data[d.product]["te"]["simulated"] + data.simulated[i].total.te 

                table_data[d.product]["rsv_w_o_vat"]["base"] = table_data[d.product]["rsv_w_o_vat"]["base"] + data.base[i].total.total_rsv_w_o_vat
                table_data[d.product]["rsv_w_o_vat"]["simulated"] = table_data[d.product]["rsv_w_o_vat"]["simulated"] + data.simulated[i].total.total_rsv_w_o_vat

                table_data[d.product]["mac"]["base"] = table_data[d.product]["mac"]["base"] + data.base[i].total.mac
                table_data[d.product]["mac"]["simulated"] = table_data[d.product]["mac"]["simulated"] + data.simulated[i].total.mac
    
            }
            else{
                table_data[d.product] = {
                    "units" : {
                        "base" : data.base[i].total.units,
                        "simulated" : data.simulated[i].total.units
                    },
                    "volume" : {
                        "base" : data.base[i].total.volume,
                        "simulated" : data.simulated[i].total.volume
                    },
                    "cogs" : {
                        "base" : data.base[i].total.cogs,
                        "simulated" : data.simulated[i].total.cogs
                    },
                    "lsv" : {
                        "base" : data.base[i].total.lsv,
                        "simulated" : data.simulated[i].total.lsv
                    },
                    "nsv" : {
                        "base" : data.base[i].total.nsv,
                        "simulated" : data.simulated[i].total.nsv
                    },
                    "mac" : {
                        "base" : data.base[i].total.mac,
                        "simulated" : data.simulated[i].total.mac
                    },
                    "mac_nsv" : {
                        "base" : data.base[i].total.mac_percent,
                        "simulated" : data.simulated[i].total.mac_percent
                    },
                    "te" : {
                        "base" : data.base[i].total.te,
                        "simulated" : data.simulated[i].total.te
                    },
                    "te_lsv" : {
                        "base" : data.base[i].total.te_percent_of_lsv,
                        "simulated" : data.simulated[i].total.te_percent_of_lsv
                    },
                    "te_unit" : {
                        "base" : data.base[i].total.te_per_unit,
                        "simulated" : data.simulated[i].total.te_per_unit
                    },
                    "roi" : {
                        "base" : data.base[i].total.roi,
                        "simulated" : data.simulated[i].total.roi
                    },
                    "lift" : {
                        "base" : data.base[i].total.lift,
                        "simulated" : data.simulated[i].total.lift
                    },
                    "asp" : {
                        "base" : data.base[i].total.asp,
                        "simulated" : data.simulated[i].total.asp
                    },
                    "promo_asp" : {
                        "base" : data.base[i].total.asp,
                        "simulated" : data.simulated[i].total.asp
                    },
                    "rsv_w_o_vat" : {
                        "base" : data.base[i].total.total_rsv_w_o_vat,
                        "simulated" : data.simulated[i].total.total_rsv_w_o_vat
                    },
                    "customer_margin" : {
                        "base" : data.base[i].total.rp,
                        "simulated" : data.simulated[i].total.rp
                    },
                    "customer_margin_rsv" : {
                        "base" : data.base[i].total.rp_percent,
                        "simulated" : data.simulated[i].total.rp_percent
                    },
                }

                
            }

        })
        //console.log(table_data , "TABLE DATA OBJECT...")
        for (let key in table_data) {
            table_data[key]['units'] = this.genrateCellData(table_data[key]['units']['base'],table_data[key]['units']['simulated'] , false  )
            table_data[key]['volume'] = this.genrateCellData(table_data[key]['volume']['base'],table_data[key]['volume']['simulated'] , false )
            table_data[key]['cogs'] = this.genrateCellData(table_data[key]['cogs']['base'],table_data[key]['cogs']['simulated'],this.currency )
            table_data[key]['lsv'] = this.genrateCellData(table_data[key]['lsv']['base'],table_data[key]['lsv']['simulated'],this.currency )
            table_data[key]['nsv'] = this.genrateCellData(table_data[key]['nsv']['base'],table_data[key]['nsv']['simulated'],this.currency )
            table_data[key]['mac'] = this.genrateCellData(table_data[key]['mac']['base'],table_data[key]['mac']['simulated'],this.currency )
            table_data[key]['mac_nsv'] = this.genrateCellData(table_data[key]['mac_nsv']['base'],table_data[key]['mac_nsv']['simulated'] ,false,true)
            table_data[key]['te'] = this.genrateCellData(table_data[key]['te']['base'],table_data[key]['te']['simulated'],this.currency )
            table_data[key]['te_lsv'] = this.genrateCellData(table_data[key]['te_lsv']['base'],table_data[key]['te_lsv']['simulated'],false,true )
            table_data[key]['te_unit'] = this.genrateCellData(table_data[key]['te_unit']['base'],table_data[key]['te_unit']['simulated'],false )
            table_data[key]['roi'] = this.genrateCellData(table_data[key]['roi']['base'],table_data[key]['roi']['simulated'] ,false)
            table_data[key]['lift'] = this.genrateCellData(table_data[key]['lift']['base'],table_data[key]['lift']['simulated'] ,false)
            table_data[key]['asp'] = this.genrateCellData(table_data[key]['asp']['base'],table_data[key]['asp']['simulated'] ,false)
            table_data[key]['promo_asp'] = this.genrateCellData(table_data[key]['promo_asp']['base'],table_data[key]['promo_asp']['simulated'],false )
            table_data[key]['rsv_w_o_vat'] = this.genrateCellData(table_data[key]['rsv_w_o_vat']['base'],table_data[key]['rsv_w_o_vat']['simulated'],this.currency )
            table_data[key]['customer_margin'] = this.genrateCellData(table_data[key]['customer_margin']['base'],table_data[key]['customer_margin']['simulated'] ,this.currency)
            table_data[key]['customer_margin_rsv'] = this.genrateCellData(table_data[key]['customer_margin_rsv']['base'],table_data[key]['customer_margin_rsv']['simulated'],false,true )
            
            // if (table_data.hasOwnProperty(key)) {
            //     debugger
                 
            // }
        }   
        //console.log(table_data , "TABLE DATA OBJECT CONVERTED...")
        return table_data
       
    }
    toggleAbsolute(type){
        if(type == "abs"){
            this.abs_selected = "selected"
            this.per_selected = "unselected"
            this.format = "absolute"
                    }
                    else{
                        this.per_selected = "selected"
            this.abs_selected = "unselected"
            this.format = "percent"
                        
                    }
    }

    selectionChanged($event:any){
        //console.log($event , "selection evet")
        //console.log(this.tabular_data , "tabular ata ")
        // {
        //     _id: 'totalvalue',
        //     index: 0,
        //     name: 'Total value',
        // },
        // {
        //     _id: 'perton',
        //     index: 1,
        //     name: 'Per ton',
        // },
        // {
        //     _id: 'perunit',
        //     index: 1,
        //     name: 'Per unit',
        // },

        // "base" : base_predicted,
        // "simulated" : simulated_prediced,
        // "converted_base": Utils.formatPlain(base_predicted,false,false),
        // "converted_simulated": Utils.formatPlain(simulated_prediced,false,false),
        // "percent": "(" + Utils.percentageDifference(simulated_prediced,base_predicted) + "%)",
        // "converted_difference": "(" + Utils.formatPlain(simulated_prediced-base_predicted,false,false) + ")",
        // "arrow": simulated_prediced > base_predicted ?  'carret-up' : 'carret-down',
        // "color": Utils.colorForDifference(base_predicted , simulated_prediced) 
        if($event.value._id == "perton"){

            for (let key in this.tabular_data) {
                ['te' , 'rsv_w_o_vat','customer_margin','lsv','nsv'].forEach(metric=>{

                    let keytonbase = Utils._divide(this.tabular_data[key][metric]['base'],this.tabular_data[key]['volume']['base'])
                    let keytonsim = Utils._divide(this.tabular_data[key][metric]['simulated'],this.tabular_data[key]['volume']['simulated'])
                    let diff = keytonsim - keytonbase
                    
                    
                    // debugger
                   this.tabular_data[key][metric]["converted_base"] = Utils.formatPlain(keytonbase,this.currency,false)
                   this.tabular_data[key][metric]["converted_simulated"] = Utils.formatPlain(keytonsim,this.currency,false)
                   this.tabular_data[key][metric]["converted_difference"] = "(" + Utils.formatPlain(diff,false,false) + ")"
                //    this.tabular_data[key]['te']["converted_simulated"] = Utils.formatPlain(keytonsim,false,false)

                })
                
               
            //    table_data[key]['te']
            }
            // this.tabular_data
            //console.log(this.tabular_data , "tabular data ")
            
        }
        else if($event.value._id == "perunit"){
            // [this.trade_expense].forEach(data=>{
            //    //console.log(data , "perunit")

            // })
            for (let key in this.tabular_data) {
                ['te' , 'rsv_w_o_vat','customer_margin','lsv','nsv'].forEach(metric=>{
                
                let keytonbase = Utils._divide(this.tabular_data[key][metric]['base'],this.tabular_data[key]['units']['base'])
                let keytonsim = Utils._divide(this.tabular_data[key][metric]['simulated'],this.tabular_data[key]['units']['simulated'])
                let diff = keytonsim - keytonbase
                
                
                // debugger
               this.tabular_data[key][metric]["converted_base"] = Utils.formatPlain(keytonbase,false,false)
               this.tabular_data[key][metric]["converted_simulated"] = Utils.formatPlain(keytonsim,false,false)
               this.tabular_data[key][metric]["converted_difference"] = "(" + Utils.formatPlain(diff,false,false , metric == 'nsv' ? true : false) + ")"
            //    this.tabular_data[key]['te']["converted_simulated"] = Utils.formatPlain(keytonsim,false,false)
            //    table_data[key]['te']
            })
        }
            // this.tabular_data
            //console.log(this.tabular_data , "tabular data ")
            
        }
        else{
            for (let key in this.tabular_data) {
                ['te' , 'rsv_w_o_vat','customer_margin','lsv','nsv'].forEach(metric=>{
                
                let keytonbase = this.tabular_data[key][metric]['base'] 
                let keytonsim = this.tabular_data[key][metric]['simulated']
                let diff = keytonsim - keytonbase
                
                
                // debugger
               this.tabular_data[key][metric]["converted_base"] = Utils.formatPlain(keytonbase,false,false)
               this.tabular_data[key][metric]["converted_simulated"] = Utils.formatPlain(keytonsim,false,false)
               this.tabular_data[key][metric]["converted_difference"] = "(" + Utils.formatPlain(diff,false,false) + ")"
            //    this.tabular_data[key]['te']["converted_simulated"] = Utils.formatPlain(keytonsim,false,false)
            //    table_data[key]['te']
            })
        }
            // [this.trade_expense].forEach(data=>{
            //      //console.log(data , "totalvalue")
 
            //  })
             

        }
        

    }

    generateGraphTableData(data : PriceSimulated){
        this.tabular_data = this.genrate_table(data)
        
       
        let base_predicted = 0
        let simulated_prediced = 0
        let inc_base = 0
        let inc_sim = 0
        let rsv_base , rsv_sim , rp_base ,rp_sim , lsv_base , lsv_sim , te_base , te_sim,
            nsv_base , nsv_sim , cogs_base,cogs_sim,mac_base , mac_sim;
        rsv_base = rsv_sim = rp_base =rp_sim = lsv_base = lsv_sim = te_base = te_sim=
            nsv_base = nsv_sim = cogs_base=cogs_sim=mac_base = mac_sim= 0
        data.base.forEach((d , i)=>{
          
            base_predicted+=data.base[i].total.base_units
            simulated_prediced+=data.simulated[i].total.base_units
            inc_base+=data.base[i].total.increment_units
            inc_sim+=data.simulated[i].total.increment_units
            rsv_base+=data.base[i].total.total_rsv_w_o_vat
            rsv_sim+=data.simulated[i].total.total_rsv_w_o_vat
            rp_base+=data.base[i].total.rp
            rp_sim+=data.simulated[i].total.rp
            lsv_base+=data.base[i].total.lsv
            lsv_sim+=data.simulated[i].total.lsv
            te_base+=data.base[i].total.te
            te_sim+=data.simulated[i].total.te
            nsv_base+=data.base[i].total.nsv
            nsv_sim+=data.simulated[i].total.nsv
            cogs_base+=data.base[i].total.cogs
            cogs_sim+=data.simulated[i].total.cogs
            mac_base+=data.base[i].total.mac
            mac_sim+=data.simulated[i].total.mac


        })
        this.plChartData = [
            { group: 'RSV', base: rsv_base, simulated: rsv_sim },
            { group: 'Retailer Margin', base: rp_base, simulated: rp_sim},
            { group: 'GSV', base: lsv_base, simulated: lsv_sim },
            { group: 'Trade Expense', base: te_base, simulated: te_sim },
            { group: 'NSV', base: nsv_base, simulated: nsv_sim },
            { group: 'COGS', base: cogs_base ,  simulated: cogs_sim },
            { group: 'MAC', base: mac_base, simulated:mac_sim},
        ]
        this.baselineLiftChartData = [
            {
                group: 'Sales Units',
                baseline1: [base_predicted, inc_base],
                baseline2: [simulated_prediced,  inc_sim],
            },
        ];

        // this.baselineLiftChartData = this.baselineLiftChartData.map(a=>{
        //     var ret = {...a}
        //     ret.baseline1 = [base_predicted,inc_base] ,
        //     ret.baseline2  = [simulated_prediced,inc_sim]
        //     return ret
        // })
        this.units = {
            // "base"
            "converted_base": Utils.formatPlain(base_predicted,false,false),
            "converted_simulated": Utils.formatPlain(simulated_prediced,false,false),
            "percent": "(" + Utils.percentageDifference(simulated_prediced,base_predicted) + "%)",
            "converted_difference": "(" + Utils.formatPlain(simulated_prediced-base_predicted,false,false) + ")",
            "arrow": simulated_prediced > base_predicted ?  'carret-up' : 'carret-down',
            "color": Utils.colorForDifference(base_predicted , simulated_prediced) 
        }
        this.inc_units = {
            "converted_base": Utils.formatPlain(inc_base,false,false),
            "converted_simulated": Utils.formatPlain(inc_sim,false,false),
            "percent": "(" + Utils.percentageDifference(inc_sim,inc_base) + "%)",
            "converted_difference": "(" + Utils.formatPlain(inc_sim-inc_base,false,false) + ")",
            "arrow": inc_sim > inc_base ?  'carret-up' : 'carret-down',
            "color":Utils.colorForDifference(inc_base , inc_sim)
        }
        this.lsv = {
            "converted_base": Utils.formatPlain(lsv_base,this.currency,false),
            "converted_simulated": Utils.formatPlain(lsv_sim,this.currency,false),
            "percent": "(" + Utils.percentageDifference(lsv_sim,lsv_base) + "%)",
            "converted_difference": "(" + Utils.formatPlain(lsv_sim-lsv_base,false,false) + ")",
            "arrow": lsv_sim > lsv_base ?  'carret-up' : 'carret-down',
            "color": Utils.colorForDifference(lsv_base , lsv_sim) 
        }
        this.trade_expense = {
            "base" : te_base,
            "simulated" : te_sim,
            "converted_base": Utils.formatPlain(te_base,this.currency,false),
            "converted_simulated": Utils.formatPlain(te_sim,this.currency,false),
            "percent": "(" + Utils.percentageDifference(te_sim,te_base) + "%)",
            "converted_difference": "(" + Utils.formatPlain(te_sim-te_base,false,false) + ")",
            "arrow": te_sim > te_base ?  'carret-up' : 'carret-down',
            "color": Utils.colorForDifference(te_sim,te_base ) 
        }
        this.nsv = {
            "converted_base": Utils.formatPlain(nsv_base,this.currency,false),
            "converted_simulated": Utils.formatPlain(nsv_sim,this.currency,false),
            "percent": "(" + Utils.percentageDifference(nsv_sim,nsv_base) + "%)",
            "converted_difference": "(" + Utils.formatPlain(nsv_sim-nsv_base,false,false) + ")",
            "arrow": nsv_sim > nsv_base ?  'carret-up' : 'carret-down',
            "color": Utils.colorForDifference(nsv_base , nsv_sim) 
        }
        this.cogs = {
            "converted_base": Utils.formatPlain(cogs_base,this.currency,false),
            "converted_simulated": Utils.formatPlain(cogs_sim,this.currency,false),
            "percent": "(" + Utils.percentageDifference(cogs_sim,cogs_base) + "%)",
            "converted_difference": "(" + Utils.formatPlain(cogs_sim-cogs_base,false,false) + ")",
            "arrow": cogs_sim > cogs_base ?  'carret-up' : 'carret-down',
            "color": Utils.colorForDifference(cogs_base , cogs_sim) 
        }
        this.mac = {
            "converted_base": Utils.formatPlain(mac_base,this.currency,false),
            "converted_simulated": Utils.formatPlain(mac_sim,this.currency,false),
            "percent": "(" + Utils.percentageDifference(mac_sim,mac_base) + "%)",
            "converted_difference": "(" + Utils.formatPlain(mac_sim-mac_base,false,false) + ")",
            "arrow": mac_sim > mac_base ?  'carret-up' : 'carret-down',
            "color": Utils.colorForDifference(mac_base , mac_sim) 
        }
        this.rsv = {
            "converted_base": Utils.formatPlain(rsv_base,this.currency,false),
            "converted_simulated": Utils.formatPlain(rsv_sim,this.currency,false),
            "percent": "(" + Utils.percentageDifference(rsv_sim,rsv_base) + "%)",
            "converted_difference": "(" + Utils.formatPlain(rsv_sim-rsv_base,false,false) + ")",
            "arrow": rsv_sim > rsv_base ?  'carret-up' : 'carret-down',
            "color": Utils.colorForDifference(rsv_base , rsv_sim) 
        }
        this.cutomer_margin = {
            "converted_base": Utils.formatPlain(rp_base,this.currency,false),
            "converted_simulated": Utils.formatPlain(rp_sim,this.currency,false),
            "percent": "(" + Utils.percentageDifference(rp_sim,rp_base) + "%)",
            "converted_difference": "(" + Utils.formatPlain(rp_sim-rp_base,false,false) + ")",
            "arrow": rp_sim > rp_base ?  'carret-up' : 'carret-down',
            "color": Utils.colorForDifference(rp_base , rp_sim) 
        }
        

        // //console.log(this.plChartData , "plchatdata....")
        // //console.log(this.baselineLiftChartData , "baselinechart after simulated")

      
    }

    @ViewChild('tabularSummary', { static: false }) tabularSummary: any;
    scrolling_table: any;

    ngAfterViewInit() {
        // this.slider = this.elRef.nativeElement.querySelector('.slide');
        this.scrolling_table = this.elRef.nativeElement.querySelector('.weeklyScenariotable');
        this.scrolling_table.addEventListener('scroll', this.freeze_pane_listener(this.scrolling_table));
    }

    freeze_pane_listener(what_is_this: { scrollTop: string; scrollLeft: string }) {
        return () => {
            var i;
            var self = this;
            self.translate_y = '';

            var translate_y = 'translate(0px,' + what_is_this.scrollTop + 'px)';
            var translate_x = 'translate(' + what_is_this.scrollLeft + 'px)';
            var translate_xy = 'translate(' + what_is_this.scrollLeft + 'px,' + what_is_this.scrollTop + 'px)';

            self.currentTranslateRate = what_is_this.scrollLeft;

            var fixed_vertical_elts = document.getElementsByClassName(
                'freeze_vertical',
            ) as HTMLCollectionOf<HTMLElement>;
            var fixed_horizontal_elts = document.getElementsByClassName(
                'freeze_horizontal',
            ) as HTMLCollectionOf<HTMLElement>;
            var fixed_both_elts = document.getElementsByClassName('freeze') as HTMLCollectionOf<HTMLElement>;

            for (i = 0; i < fixed_horizontal_elts.length; i++) {
                // fixed_horizontal_elts[i].style.webkitTransform = translate_x;
                fixed_horizontal_elts[i].style.transform = translate_x;
            }
            for (i = 0; i < fixed_vertical_elts.length; i++) {
                // fixed_vertical_elts[i].style.webkitTransform = translate_y;
                fixed_vertical_elts[i].style.transform = translate_y;
            }
            for (i = 0; i < fixed_both_elts.length; i++) {
                // fixed_both_elts[i].style.webkitTransform = translate_xy;
                fixed_both_elts[i].style.transform = translate_xy;
            }
        };
    }

    singleSelect: any = [];
    config = {
        displayKey: 'name', // if objects array passed which key to be displayed defaults to description
        search: true,
        
    };
    config_ = {
       
        placeholder: 'Select (0)',
    };

    productsValues = [
        {
            _id: 'all',
            index: 0,
            name: 'All',
        },
        {
            _id: 'wallmart',
            index: 1,
            name: 'Wallmart',
        },
        {
            _id: 'target',
            index: 2,
            name: 'Target',
        },
    ];

    tabularSummaryVlaues = [
        {
            _id: 'totalvalue',
            index: 0,
            name: 'Total value',
        },
        {
            _id: 'perton',
            index: 1,
            name: 'Per ton',
        },
        {
            _id: 'perunit',
            index: 1,
            name: 'Per unit',
        },
    ];

    openTab = 1;
    toggleTabs($tabNumber: number): void {
        this.openTab = $tabNumber;
    }
    genrateCellData(base_predicted ,simulated_prediced ,is_curr, per=false ){
         
        return  {
            "base" : base_predicted,
            "simulated" : simulated_prediced,
            "converted_base": Utils.formatPlain(base_predicted,is_curr,per),
            "converted_simulated": Utils.formatPlain(simulated_prediced,is_curr,per),
            "percent": "(" + Utils.percentageDifference(simulated_prediced,base_predicted) + "%)",
            "converted_difference": "(" + Utils.formatPlain(simulated_prediced-base_predicted,false,false) + ")",
            "arrow": simulated_prediced > base_predicted ?  'carret-up' : 'carret-down',
            "color": Utils.colorForDifference(base_predicted , simulated_prediced) 
        }

    }
    generateTableularUnits(){
        // return {
        //     "units" : this.genrateCellData(1,1),
        //     "volume" : this.genrateCellData(1,1),
        //     "lsv" : this.genrateCellData(1,1),
        //     "nsv" : this.genrateCellData(1,1),
        //     "mac_nsv" : this.genrateCellData(1,1),
        //     "te" : this.genrateCellData(1,1),
        //     "te_lsv" : this.genrateCellData(1,1),
        //     "te_unit" : this.genrateCellData(1,1),
        //     "roi" : this.genrateCellData(1,1),
        //     "lift" : this.genrateCellData(1,1),
        //     "asp" : this.genrateCellData(1,1),
        //     "promo_asp" : this.genrateCellData(1,1),
        //     "rsv_w_o_vat" : this.genrateCellData(1,1),
        //     "customer_margin" : this.genrateCellData(1,1),
        //     "customer_margin_rsv" : this.genrateCellData(1,1)
        // }
    }

    generateMock(){
      
        return {
            "All" : this.generateTableularUnits(),
             "ORBIT OTC" : this.generateTableularUnits(),
             "ORBIT XXL" : this.generateTableularUnits(),
             "BIG BARS" : this.generateTableularUnits()

        }
    }
}
