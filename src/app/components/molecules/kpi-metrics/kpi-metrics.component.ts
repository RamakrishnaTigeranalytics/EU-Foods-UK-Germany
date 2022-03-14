import { Component, OnInit, AfterViewInit, ViewChild, ElementRef,Input,SimpleChanges, Output,
EventEmitter } from '@angular/core';
import { LoadedScenarioModel , PromoSimulatedTotalModel , CompareMetricModel } from '@core/models';
import { ModalService } from '@molecules/modal/modal.service';
import * as Utils from "@core/utils"
// import { EventEmitter } from 'stream';
@Component({
    selector: 'nwn-kpi-metrics',
    templateUrl: './kpi-metrics.component.html',
    styleUrls: ['./kpi-metrics.component.css'],
})
export class KpiMetricsComponent implements OnInit, AfterViewInit {
    format = "absolute"
    @Input()
    pricing = false

    @Input()
    currency
    abs_selected:string = "selected"
    per_selected:string = "unselected"
    translate_y: string = '';
    currentTranslateRate: string = '';
    @Input()
    loaded_scenario:Array<LoadedScenarioModel | any> = []
    @Output()
    deleteCompareEvent  = new EventEmitter()
    units:CompareMetricModel = {"value" : [],"visible": false , key:"Units"}
    // units_compare:CompareMetricModel = {"value" : [],"visible": false}
    base_units:CompareMetricModel = {"value" : [],"visible": false , key:"Base Units"}
    increment_units :CompareMetricModel = {"value" : [],"visible": false,key:"Incremental Units"}
    volume:CompareMetricModel = {"value" : [],"visible": false,key:"Volume"}
    lsv:CompareMetricModel = {"value" : [],"visible": false,key:"GSV"}
    nsv:CompareMetricModel = {"value" : [],"visible": false,key:"NSV Units"}
    mac:CompareMetricModel = {"value" : [],"visible": false,key:"MAC"}
    cogs:CompareMetricModel = {"value" : [],"visible": false,key:"COGS"}
    mac_per_nsv:CompareMetricModel = {"value" : [],"visible": false,key:"MAC, %NSV"}
    te:CompareMetricModel = {"value" : [],"visible": false,key:""}
    te_per_lsv:CompareMetricModel = {"value" : [],"visible": false,key:"TE, % GSV"}
    te_per_unit:CompareMetricModel = {"value" : [],"visible": false,key:"TE / Unit"}
    roi:CompareMetricModel = {"value" : [],"visible": false,key:"ROI"}
    lift:CompareMetricModel = {"value" : [],"visible": false,key:"Lift %"}
    scenario_names:Array<any> = []
    asp:CompareMetricModel = {"value" : [],"visible": false,key:"ASP"}
    promo_asp:CompareMetricModel = {"value" : [],"visible": false,key:"Promo ASP"}
    rsv_w_o_vat:CompareMetricModel = {"value" : [],"visible": false,key:"RSV"}
    customer_margin:CompareMetricModel = {"value" : [],"visible": false,key:"Trade Margin"}
    rp_percent:CompareMetricModel = {"value" : [],"visible": false,key:"Trade Margin,%RSV"}
    all_metrics:Array<CompareMetricModel> = [this.base_units , this.units,this.increment_units , this.volume,
    this.nsv , this.lsv,this.mac,this.cogs , this.mac_per_nsv , this.promo_asp,this.te,this.te_per_lsv,this.te_per_unit,
    this.roi,this.lift,this.asp,this.rsv_w_o_vat,this.customer_margin,this.rp_percent

]
    // sales_metric:Array<CompareMetricModel> = [this.units_compare]

    // this.asp.push(this._generate_obj(element , "asp"))
    //             this.promo_asp.push(this._generate_obj(element , "asp"))
    //             this.rsv_w_o_vat.push(this._generate_obj(element , "total_rsv_w_o_vat"))
    //             this.customer_margin.push(this._generate_obj(element , "rp"))
    //             this.rp_percent
    constructor(private elRef: ElementRef,private modal : ModalService ,) {}

    public kpiTableWidth: any;
    public kpiTableHeight: any;

    ngOnInit(): void {
        this.kpiTableWidth = window.innerWidth - 155;
        this.kpiTableHeight = window.innerHeight - 250;
        console.log(this.loaded_scenario , "loaded scenario data in kpy metic child component")
        // this.generate_metrics(this.loaded_scenario)

        // this.loaded_scenario[0].base.weekly[0].predicted_units
        // this.loaded_scenario[0].base.weekly[0].incremental_unit
        // this.loaded_scenario[0].base.weekly[0].base_unit
        // debugger
    }
    removeMetrics(id){
        this.scenario_names = this.scenario_names.filter(val=>val.id!=id)
        this.all_metrics.forEach(data=>{
            data.value = data.value.filter(d=>d.id!=id)
        }

        )
        
    }
    removeCompareEvent($event){
        this.removeMetrics($event.id)
        // this.loaded_scenario = this.loaded_scenario.filter(data=>data.scenario_id != $event.id)
        this.deleteCompareEvent.emit($event)
        // console.log($event)
        
    }
    openModal(){
        this.modal.open('manage-metrics')
    }

    toggleAbsolute(type:string){
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

    _generate_obj(element:LoadedScenarioModel , key:keyof PromoSimulatedTotalModel,per:boolean = false ,is_curr:boolean = true){
        let base = element.base.total[key]
                let simulated = element.simulated.total[key]
                let difference = simulated - base
                let percent = 0
                if(per){
                    percent =difference

                }
                else{
                    percent = (difference/base) * 100

                }
                


     let ret =  {
         "id" : element.scenario_id,
            "base" : base,
            "simulated" : simulated,
            "base_perton" : base,
            "simulated_perton" : simulated,
            "base_perunit" : base,
            "simulated_petunit" : simulated,
            "difference" : difference,
            "percent" :"(" + Utils.percentageDifference(simulated,base) + "%)",
            "converted_base" : Utils.formatPlain(base ,this.currency,per),
            "converted_simulated" : Utils.formatPlain(simulated , this.currency,per),
            "converted_difference" : Utils.formatPlain(difference,this.currency,per),
            "arrow" : difference < 0 ? "carret-down" : "carret-up",
            "color" : difference < 0 ? "red" : "green"

        }
        // "percent" : Utils.convertCurrency(percent , true),
        // "converted_base" : Utils.convertCurrency(base , per,this.currency),
        // "converted_simulated" : Utils.convertCurrency(simulated , per,this.currency),
        // "converted_difference" : Utils.convertCurrency(difference,per,this.currency),
        let rev_color = ["te","te_percent_of_lsv","te_per_unit"]
        if(rev_color.includes(key)){
            ret["color"] =  difference > 0 ? "red" : "green"
        }
        return ret
        // this.te.value.push(this._generate_obj(element , "te"))
        // this.te.visible = true
        // this.te_per_lsv.value.push(this._generate_obj(element , "te_percent_of_lsv", true))
        // this.te_per_lsv.visible = true
        // this.te_per_unit.value.push(this._generate_obj(element , "te_per_unit"))

    }
    metricChanges(e:Array<string>){
        // console.log(this.all_metrics , "all metrics")
        this.all_metrics.forEach(element=>{
             if(e.includes(element.key as string)){
                 element.visible = true

             }
             else{
                 element.visible = false
             }
        })

        // console.log(e , "selected metrics in kpi compoannt")
        
    }
    selectionChanged($event:any){
        if($event.value._id == "perton"){
            [this.mac,this.cogs , this.rsv_w_o_vat,this.customer_margin , this.lsv , this.te , this.nsv].forEach(data=>{
               data.value.forEach(val=>{
                   let vol = this.volume.value.find(v=>v.id == val.id)
                
                      val.base_perton = val.base/vol.base
                      val.simulated_perton = val.simulated/vol.simulated
                      val.difference = val.simulated_perton - val.base_perton,
                    //   val.percent = Utils.formatPlain((val.difference/val.base_perton)*100,false,true ),
                      val.percent = "(" + Utils.percentageDifference(val.simulated_perton,val.base_perton ) + "%)",
                      val.converted_base = Utils.formatPlain(val.base_perton,this.currency , false ),
                      val.converted_simulated = Utils.formatPlain(val.simulated_perton,this.currency , false),
                      val.converted_difference = Utils.formatPlain(val.difference,this.currency , false)
               }) 

            })
            
        }
        else if($event.value._id == "perunit"){
            [this.mac ,this.cogs ,this.rsv_w_o_vat,this.customer_margin , this.lsv , this.te , this.nsv].forEach(data=>{
               data.value.forEach(val=>{
                   let vol = this.units.value.find(v=>v.id == val.id)
                
                      val.base_perunit = val.base/vol.base
                      val.simulated_perunit = val.simulated/vol.simulated
                      val.difference = val.simulated_perunit - val.base_perunit,
                      val.percent = "(" + Utils.percentageDifference(val.simulated_perton,val.base_perton ) + "%)",
                    //   val.converted_base = Utils.convertCurrency(val.base_perunit ),
                    //   val.converted_simulated = Utils.convertCurrency(val.simulated_perunit),
                    //   val.converted_difference = Utils.convertCurrency(val.difference)
                    val.converted_base = Utils.formatPlain(val.base_perunit,this.currency,false ),
                    val.converted_simulated = Utils.formatPlain(val.simulated_perunit,this.currency,false),
                    val.converted_difference = Utils.formatPlain(val.difference,this.currency,false)
               }) 

            })
            
        }
        else{
            [this.mac ,this.cogs , this.rsv_w_o_vat,this.customer_margin , this.lsv , this.te , this.nsv].forEach(data=>{
                data.value.forEach(val=>{
                    val.difference = val.simulated - val.base,
                    val.percent = "(" + Utils.percentageDifference(val.simulated_perton,val.base_perton ) + "%)",
                    val.converted_base = Utils.formatPlain(val.base,this.currency,false),
                       val.converted_simulated = Utils.formatPlain(val.simulated,this.currency,false),
                       val.converted_difference = Utils.formatPlain(val.difference,this.currency,false)
                }) 
 
             })
             

        }
        
    }
    generate_metrics(loaded_scenario : Array<LoadedScenarioModel>){
        // this.scenario_names = []
         
        loaded_scenario.forEach(element => {
            if(this.scenario_names.find(d=>d.id == element.scenario_id)){
                return
            }

            let ele = {
                "id" : element.scenario_id,
                "name" : element.scenario_name,
                "comment" : element.scenario_comment,
                "retailer" : {
                    "account_name" : element.account_name,
                    "product_group" : element.product_group
                }
            }
            this.scenario_names.push(ele)
                // this.base_units.push(this._generate_obj(element , "base_units"))
                // this.units.push(this._generate_obj(element , "units"))
                
                this.units.value.push(this._generate_obj(element , "units", false,false))
                this.units.visible = true
                this.base_units.value.push(this._generate_obj(element , "base_units",false,false))
                this.base_units.visible = true
                this.increment_units.value.push(this._generate_obj(element , "increment_units",false,false))
                this.increment_units.visible = true
                this.volume.value.push(this._generate_obj(element , "volume",false,false))
                this.volume.visible = true
                this.lsv.value.push(this._generate_obj(element , "lsv"))
                this.lsv.visible = true
                this.nsv.value.push(this._generate_obj(element , "nsv"))
                this.nsv.visible = true
                this.mac.value.push(this._generate_obj(element , "mac"))
                this.mac.visible = true
                this.cogs.value.push(this._generate_obj(element , "cogs"))
                this.cogs.visible = true
                this.mac_per_nsv.value.push(this._generate_obj(element , "mac_percent", true))
                this.mac_per_nsv.visible = true
                this.te.value.push(this._generate_obj(element , "te"))
                this.te.visible = true
                this.te_per_lsv.value.push(this._generate_obj(element , "te_percent_of_lsv", true))
                this.te_per_lsv.visible = true
                this.te_per_unit.value.push(this._generate_obj(element , "te_per_unit"))
                this.te_per_unit.visible = true
                this.roi.value.push(this._generate_obj(element , "roi", true))
                this.roi.visible = true
                this.lift.value.push(this._generate_obj(element , "lift", true))
                this.lift.visible = true
                this.asp.value.push(this._generate_obj(element , "asp"))
                this.asp.visible = true
                // debugger;
                this.promo_asp.value.push(this._generate_obj(element , "asp"))
                this.promo_asp.visible = true
                this.rsv_w_o_vat.value.push(this._generate_obj(element , "total_rsv_w_o_vat"))
                this.rsv_w_o_vat.visible = true
                this.customer_margin.value.push(this._generate_obj(element , "rp"))
                this.customer_margin.visible = true
                this.rp_percent.value.push(this._generate_obj(element , "rp_percent", true))
                this.rp_percent.visible = true
                
                
                
                
                
                
                
            
            
           
            
        });
        

    }

    @ViewChild('kpiTableScroll', { static: false }) kpiTableScroll: any;
    scrolling_table: any;

    ngAfterViewInit() {
      
        // this.slider = this.elRef.nativeElement.querySelector('.slide');
        this.scrolling_table = this.elRef.nativeElement.querySelector('.kpiTableScroll');
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
    singleSelect: any = '';
    config = {
        displayKey: 'name', // if objects array passed which key to be displayed defaults to description
        search: false,
    };
    totalValue = [
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
    optionMetrics = [
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
            _id: 'oerunit',
            index: 1,
            name: 'Per unit',
        },
    ];
   

    generate_metrics_pricing(loaded_scenario : Array<LoadedScenarioModel|any>){
        
        // this.scenario_names = []
         
        loaded_scenario.forEach(element => {

            this._update_price_base(element)
            if(this.scenario_names.find(d=>d.id == element.scenario_id)){
                return
            }
            // debugger

            let ele = {
                "id" : element.scenario_id,
                "name" : element.scenario_name,
                "comment" : element.scenario_comment,
                "retailer" : {
                    "account_name" : element.base[0].account_name,
                    "product_group" : element.base[0].product
                }
            }
            this.scenario_names.push(ele)
                // this.base_units.push(this._generate_obj(element , "base_units"))
                // this.units.push(this._generate_obj(element , "units"))
                
                this.units.value.push(this._generate_obj_pricing(element , "units", false,false))
                this.units.visible = true
                this.base_units.value.push(this._generate_obj_pricing(element , "base_units",false,false))
                this.base_units.visible = true
                this.increment_units.value.push(this._generate_obj_pricing(element , "increment_units",false,false))
                this.increment_units.visible = true
                this.volume.value.push(this._generate_obj_pricing(element , "volume",false,false))
                this.volume.visible = true
                this.lsv.value.push(this._generate_obj_pricing(element , "lsv"))
                this.lsv.visible = true
                this.nsv.value.push(this._generate_obj_pricing(element , "nsv"))
                this.nsv.visible = true
                this.mac.value.push(this._generate_obj_pricing(element , "mac"))
                this.mac.visible = true
                this.cogs.value.push(this._generate_obj_pricing(element , "cogs"))
                this.cogs.visible = true
                this.mac_per_nsv.value.push(this._generate_obj_pricing(element , "mac_percent", true))
                this.mac_per_nsv.visible = true
                this.te.value.push(this._generate_obj_pricing(element , "te"))
                this.te.visible = true
                this.te_per_lsv.value.push(this._generate_obj_pricing(element , "te_percent_of_lsv", true))
                this.te_per_lsv.visible = true
                this.te_per_unit.value.push(this._generate_obj_pricing(element , "te_per_unit"))
                this.te_per_unit.visible = true
                this.roi.value.push(this._generate_obj_pricing(element , "roi", true))
                this.roi.visible = true
                this.lift.value.push(this._generate_obj_pricing(element , "lift", true))
                this.lift.visible = true
                this.asp.value.push(this._generate_obj_pricing(element , "asp"))
                this.asp.visible = true
                this.promo_asp.value.push(this._generate_obj_pricing(element , "asp"))
                this.promo_asp.visible = true
                this.rsv_w_o_vat.value.push(this._generate_obj_pricing(element , "total_rsv_w_o_vat"))
                this.rsv_w_o_vat.visible = true
                this.customer_margin.value.push(this._generate_obj_pricing(element , "rp"))
                this.customer_margin.visible = true
                this.rp_percent.value.push(this._generate_obj_pricing(element , "rp_percent", true))
                this.rp_percent.visible = true
           
            
        });
        

        
    }
    _update_price_base(element){
        // debugger
        let base ={
            "units" : 0,"base_units" : 0,"increment_units" : 0,"volume" : 0 , "lsv" : 0 , "nsv" : 0,"mac" : 0,
            "cogs" : 0,
            "mac_percent" : 0 , "te" : 0 , "te_percent_of_lsv": 0 , "te_per_unit" : 0 , "roi":0,"lift" : 0,
            "asp" : 0, "avg_promo_selling_price" : 0,"total_rsv_w_o_vat" : 0 , "rp" : 0, "rp_percent" :0


        }
        let sim = {
            "units" : 0,"base_units" : 0,"increment_units" : 0,"volume" : 0 , "lsv" : 0 , "nsv" : 0,"mac" : 0,
            "cogs" : 0,
            "mac_percent" : 0 , "te" : 0 , "te_percent_of_lsv": 0 , "te_per_unit" : 0 , "roi":0,"lift" : 0,
            "asp" : 0, "avg_promo_selling_price" : 0,"total_rsv_w_o_vat" : 0 , "rp" : 0, "rp_percent" :0
        }
        element.base.forEach((e,i) => {
            // debugger
           base['units']+= element.base[i].total['units']
           sim['units']+= element.simulated[i].total['units']
            
           base['base_units']+= element.base[i].total['base_units']
           sim['base_units']+= element.simulated[i].total['base_units']

           base['increment_units']+= element.base[i].total['increment_units']
           sim['increment_units']+= element.simulated[i].total['increment_units']

           base['volume']+= element.base[i].total['volume']
           sim['volume']+= element.simulated[i].total['volume']

           base['lsv']+= element.base[i].total['lsv']
           sim['lsv']+= element.simulated[i].total['lsv']

           base['nsv']+= element.base[i].total['nsv']
           sim['nsv']+= element.simulated[i].total['nsv']

           base['mac']+= element.base[i].total['mac']
           sim['mac']+= element.simulated[i].total['mac']

           base['cogs']+= element.base[i].total['cogs']
           sim['cogs']+= element.simulated[i].total['cogs']

           base['mac_percent']= element.base[i].total['mac_percent']
           sim['mac_percent']= element.simulated[i].total['mac_percent']

           base['te']+= element.base[i].total['te']
           sim['te']+= element.simulated[i].total['te']

           base['te_percent_of_lsv']= element.base[i].total['te_percent_of_lsv']
           sim['te_percent_of_lsv']= element.simulated[i].total['te_percent_of_lsv']

           base['te_per_unit']= element.base[i].total['te_per_unit']
           sim['te_per_unit']= element.simulated[i].total['te_per_unit']

           base['roi']= element.base[i].total['roi']
           sim['roi']= element.simulated[i].total['roi']

           base['lift']= element.base[i].total['lift']
           sim['lift']= element.simulated[i].total['lift']

           base['asp']= element.base[i].total['asp']
           sim['asp']= element.simulated[i].total['asp']

           base['avg_promo_selling_price']= element.base[i].total['avg_promo_selling_price']
           sim['avg_promo_selling_price']= element.simulated[i].total['avg_promo_selling_price']

           base['total_rsv_w_o_vat']+= element.base[i].total['total_rsv_w_o_vat']
           sim['total_rsv_w_o_vat']+= element.simulated[i].total['total_rsv_w_o_vat']

           base['rp']+= element.base[i].total['rp']
           sim['rp']+= element.simulated[i].total['rp']

           base['rp_percent']= element.base[i].total['rp_percent']
           sim['rp_percent']= element.simulated[i].total['rp_percent']
            
            
        });
        element.base['total'] = base
        element.simulated['total'] = sim
    }
    _generate_obj_pricing(element:any , key:keyof PromoSimulatedTotalModel,per:boolean = false ,is_curr:boolean = true){
        // debugger
        let base = parseFloat(element.base.total[key])
                let simulated = parseFloat(element.simulated.total[key])
                let difference = simulated - base
                let percent = 0
                if(per){
                    percent =difference

                }
                else{
                    percent = (difference/base) * 100

                }
                


     let ret =  {
         "id" : element.scenario_id,
            "base" : base,
            "simulated" : simulated,
            "base_perton" : base,
            "simulated_perton" : simulated,
            "base_perunit" : base,
            "simulated_petunit" : simulated,
            "difference" : difference,
            "percent" :"(" + Utils.percentageDifference(simulated,base) + "%)",
            "converted_base" : Utils.formatPlain(base ,this.currency,per),
            "converted_simulated" : Utils.formatPlain(simulated , this.currency,per),
            "converted_difference" : Utils.formatPlain(difference,this.currency,per),
            "arrow" : difference < 0 ? "carret-down" : "carret-up",
            "color" : difference < 0 ? "red" : "green"

        }
        // "percent" : Utils.convertCurrency(percent , true),
        // "converted_base" : Utils.convertCurrency(base , per,this.currency),
        // "converted_simulated" : Utils.convertCurrency(simulated , per,this.currency),
        // "converted_difference" : Utils.convertCurrency(difference,per,this.currency),
        let rev_color = ["te","te_percent_of_lsv","te_per_unit"]
        if(rev_color.includes(key)){
            ret["color"] =  difference > 0 ? "red" : "green"
        }
        return ret
        // this.te.value.push(this._generate_obj(element , "te"))
        // this.te.visible = true
        // this.te_per_lsv.value.push(this._generate_obj(element , "te_percent_of_lsv", true))
        // this.te_per_lsv.visible = true
        // this.te_per_unit.value.push(this._generate_obj(element , "te_per_unit"))

    }

    ngOnChanges(changes: SimpleChanges) {
 
        for (let property in changes) {
            if (property === 'loaded_scenario') {
                // console.log(this.pricing , "pricing............................................")
                
                this.loaded_scenario = changes[property].currentValue

                // console.log(this.loaded_scenario , "after delete loaded scenario")
                if(this.pricing){
                    this.generate_metrics_pricing(this.loaded_scenario)
                }
                else{
                    this.generate_metrics(this.loaded_scenario)

                }
               
                // 
               
            } 
        }
    }

}
