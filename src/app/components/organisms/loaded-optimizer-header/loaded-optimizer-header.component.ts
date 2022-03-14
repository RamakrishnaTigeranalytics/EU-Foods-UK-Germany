import { Component, Output, EventEmitter, ViewChild, OnInit,Input ,SimpleChanges } from '@angular/core';
import { Router,NavigationEnd ,RoutesRecognized} from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {takeUntil} from "rxjs/operators"
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {AuthService, OptimizerService} from "@core/services"
import {OptimizerModel , ProductWeek , OptimizerConfigModel, FilterModel, ListPromotion} from "@core/models"
import * as Utils from "@core/utils"
import * as $ from 'jquery';
import { tickStep } from 'd3';
import { filter, pairwise } from 'rxjs/operators';
// import { Component, Output, EventEmitter, ViewChild, OnInit,Input } from '@angular/core';
// import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
// import {OptimizerService} from '../../../core/services/optimizer.service'
@Component({
    selector: 'nwn-loaded-optimizer-header',
    templateUrl: './loaded-optimizer-header.component.html',
    styleUrls: ['./loaded-optimizer-header.component.css'],
})
export class LoadedOptimizerHeaderComponent implements OnInit {
    private unsubscribe$: Subject<any> = new Subject<any>();
    optimizer_data : OptimizerModel = null as any
    quarter_year:any[] = []
    promotions : any[] = []
    selected_objective:string = ''
    duration_min = 0
    duration_max = 0
    param_gap_min = 0
    param_gap_max = 0
    min_week= 0
    max_week = 0
    selected_promotions:any[] = []

    product_week : ProductWeek[] = []
    @Input()
    title: string = 'Untitled';
    @Input()
    tenant: any;
    @Input()
    currency : any;
    @Input()
    status: 'string' | 'yettobesimulated' | 'viewmore' | 'viewless' = 'yettobesimulated';
    @Output()
    modalEvent = new EventEmitter<string>();
    @Output()
    modalClose = new EventEmitter()
    cumpulsory_week = 0
    cumpulsory_week_val:any[] = []
    ignored_week_val:any[] = []
    ignored_week = 0
    @Output()
    optimizeAndResetEvent = new EventEmitter()
    @Input()
    disable_button = true
    @Input()
    disable_save_download = true
    @Output()
    downloadEvent = new EventEmitter<any>();
    @Output()
    filterResetEvent = new EventEmitter()
    @Input()
    filter_model : FilterModel
    info_promotion : ListPromotion = null as any
    ip_val : any =  {
        'mac' : 0,
        'rp' : 0
    }
    week_validation = {
        "min_promo_gap" : this.param_gap_min,
        "max_promo_gap" : this.param_gap_max,
        "promo_max" : this.max_week,
        "promo_min" : this.min_week,
        "max_consecutive_promo" : this.duration_max,
        "min_consecutive_promo" : this.duration_min
    }

    optimizerMetrics:any = ''
    showAnimation = false

    ObjectiveFunction: any = {
        min_or_max : '',
        metric : ''
    }
    constructor(public optimize:OptimizerService,private router: Router,public auth:AuthService){

        router.events
        .pipe(filter((e: any) => e instanceof RoutesRecognized),
            pairwise()
        ).subscribe((e: any) => {
            console.log(e , "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
            if(e.length > 0){
                if((e[0] as RoutesRecognized).urlAfterRedirects == '/login'){
                    this.showAnimation  = true
                   
                    this.triggerAnimation()
                }
                // console.log((e[0] as RoutesRecognized).urlAfterRedirects,"eeeeeeeeeeeeeeeenavigation ends............................"); // previous url     
            }
           
        });

    }
    triggerAnimation(){
        setTimeout(()=>{
            $('#animated-tap').show();
            $('#glowbg').addClass('fab-bg glow')
        },1000)

        setTimeout(()=>{
            $('#animated-tap').hide();
            $('#glowbg').removeClass('fab-bg glow')
        },7000)
    }
    ngOnInit() {
    
        $('#animated-tap').hide();
        $('#glowbg').removeClass('fab-bg glow')
        if(this.auth.getShowArrow()){
            this.triggerAnimation()
            this.auth.setShowArrow(false)
        }
       
        this.optimize.getoptimizerDataObservable().pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(data=>{
            if(data){
                this.reset()
                console.log(data , "data of optimizer loaded ")
                this.disable_button = false
                this.isExpand = false
                this.optimizer_data = data
                this.set_week_validation_data()
                this.populatePromotion(this.optimizer_data.weekly)
                this.populateConfig(this.optimizer_data.data)
                if("meta" in data){
                    this.info_promotion = data["meta"]
                    this.title = data["meta"]["name"]
                }
            }
            else{
                this.reset()

            }
            
        })
        
    }
    copyBaseline(){
        console.log('copy baseline')
        this.duration_max = this.optimizer_data?.data.param_max_consecutive_promo
        this.duration_min = this.optimizer_data?.data.param_min_consecutive_promo
        this.param_gap_min = this.optimizer_data?.data.param_promo_gap
        this.param_gap_max = this.optimizer_data?.data.param_promo_gap
        this.max_week = this.optimizer_data?.data.param_no_of_promo
        this.min_week  = this.optimizer_data?.data.param_no_of_promo
        this.selected_promotions = this.promotions
        // this.selected_promotions = [...this.selected_promotions,...this.promotions]
        this.set_week_validation_data()
    }
    closeClicked($event){
        this.filterResetEvent.emit($event)
    }
    set_week_validation_data(){

        this.week_validation = {
            "max_consecutive_promo" : this.optimizer_data?.data.param_max_consecutive_promo,
            "min_consecutive_promo" : this.optimizer_data?.data.param_max_consecutive_promo, 
            "promo_max" : this.optimizer_data?.data.param_no_of_promo,
            "promo_min" : this.optimizer_data?.data.param_no_of_promo,
            "max_promo_gap" : this.optimizer_data?.data.param_promo_gap,
            "min_promo_gap" : this.optimizer_data?.data.param_promo_gap,
        }
    }
    reset(){
        console.log("-----------------------------------------------------")
        console.log(this.week_validation , "week validation")
        console.log(this.product_week , "week validation product_week")
        console.log(this.cumpulsory_week_val , "week validation cumpulsory_week_val")
        // console.log("resettttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt")
        this.disable_button = true
        this.isExpand = true
        this.optimizer_data  = null as any
        this.title = "Untitled"
        this.product_week = []

        this.quarter_year = []
this.promotions = []
this.selected_objective = ''
this.duration_min = 0
this.duration_max = 0
this.param_gap_min = 0
this.param_gap_max = 0
this.min_week= 0
this.max_week = 0
this.selected_promotions = []
this.info_promotion = null as any
this.checkboxMetrices.forEach(element => {
element.checkHeadValue =  'x1.0',
element.disable = false,
element.checked = false
this.ObjectiveFunction= {
    min_or_max : '',
    metric : ''
}



});
this.ip_val = {...{
'mac' : 1,
'rp' : 1
},
...this.ip_val}
console.log(this.ip_val , "setting ip val to 1")
this.ObjectiveFunction= {
    min_or_max : '',
    metric : ''
}
this.cumpulsory_week = 0
this.cumpulsory_week_val= []
this.ignored_week_val = []
this.ignored_week = 0
this.week_validation = {
    "min_promo_gap" : this.param_gap_min,
    "max_promo_gap" : this.param_gap_max,
    "promo_max" : this.max_week,
    "promo_min" : this.min_week,
    "max_consecutive_promo" : this.duration_max,
    "min_consecutive_promo" : this.duration_min
}

console.log("----------------------------------------------------- after")
console.log(this.week_validation , "week validation")
console.log(this.product_week , "week validation product_week")
console.log(this.cumpulsory_week_val , "week validation cumpulsory_week_val")

    }
    download(){

        this.downloadEvent.emit()

    }
  

    openInfoEvent($event){
        this.sendMessage($event)
    }
    cumpulsoryWeekEvent($event){
        this.cumpulsory_week_val = $event["value"]
        this.cumpulsory_week = $event["value"].length
        this.modalClose.emit($event["id"])
    }
    ignoredWeekEvent($event){
        this.ignored_week_val =  $event["value"]
        this.ignored_week =  $event["value"].length
        this.modalClose.emit($event["id"])

    }
    promotionAddEvent($event){
        this.selected_promotions = $event["value"]
        this.modalClose.emit($event["id"])
    }

    durationWavesEvent($event){
        this.modalClose.emit("duration-of-waves")
        this.duration_min = $event["min_val"]
        this.duration_max = $event["max_val"]
        this.week_validation = {...this.week_validation , ...{
            "max_consecutive_promo" : this.duration_max ,
            "min_consecutive_promo" : this.duration_min
        }}
        
    }
    paramGapEvent($event){
        this.modalClose.emit("minimum-gap-waves")
        this.param_gap_min = $event["min_val"]
        this.param_gap_max = $event["max_val"]
        this.week_validation = {...this.week_validation , ...{
            "min_promo_gap" : this.param_gap_min,
            "max_promo_gap" : this.param_gap_max
        }}
        console.log($event , "slider change event param gap")

    }
    promoWaveEvent($event){
        this.modalClose.emit("number-promo-waves")
        this.min_week = $event["min_val"]
        this.max_week = $event["max_val"]
        this.week_validation = {...this.week_validation , ...{
            "promo_max" : this.max_week,
            "promo_min" : this.min_week
        }}

    }
    promoEvent($event){

    }
    configChangeEvent($event){
        // debugger
        console.log($event , "config change event")
        this.modalClose.emit($event["id"])
       
        // label: "MAC", event:max_val: 0.4
// min_val: 0
this.checkboxMetrices.find(d=>{
    console.log($event["label"] , "label from config")
    console.log(d.checkboxLabel , "check box label availalbe")
    if(d.checkboxLabel==$event["label"]){

        d.checkHeadValue = "x" +  $event['event'] 
    }
    // if(d.id=="retailer-popup"){
    //     d.checkHeadValue = "x" +  $event['event']['max_val']
    // }
    // if(d.id=="te-popup"){
    //     d.checkHeadValue = "x" +  $event['event']['max_val']
    // }
    // if(d.id=="mac-per-popup"){
    //     d.checkHeadValue = "x" +  $event['event']['max_val']
    // }
    // if(d.id=="rp-per-popup"){
    //     d.checkHeadValue = "x" +  $event['event']['max_val']
    // }
})
         
    }
    toggle_disable(objective){
        if(this.selected_objective.includes("MAC")){
            this.checkboxMetrices.find(d=>{
                if(d.checkboxLabel == "MAC"){
                    d.disabled = true

                }
               
            })
            this.checkboxMetrices.filter(d=>{
                if(d.checkboxLabel!="MAC"){
                    d.disabled = false
                }
            })
        }
        else if(this.selected_objective.includes("TM")){
            this.checkboxMetrices.find(d=>{
                if(d.checkboxLabel == "Trade margin"){
                    d.disabled = true

                }
               
            })
            this.checkboxMetrices.filter(d=>{
                if(d.checkboxLabel!="Trade margin"){
                    d.disabled = false
                }
            })

        }
        else if(this.selected_objective.includes("TE")){
            this.checkboxMetrices.find(d=>{
                if(d.checkboxLabel == "Trade expense"){
                    d.disabled = true

                }
               
            })
            this.checkboxMetrices.filter(d=>{
                if(d.checkboxLabel!="Trade expense"){
                    d.disabled = false
                }
            })

        }

    }

    objectiveEvent($event){
        this.modalClose.emit("optimize-function")
        this.selected_objective = $event
        let temp = this.selected_objective.split(' ')
        this.ObjectiveFunction.min_or_max = temp[0]
        if(temp[1] == "TM"){
            this.ObjectiveFunction.metric = 'Trade Margin'
        }
        else if(temp[1] == "TE"){
            this.ObjectiveFunction.metric = 'Trade Expense'
        }
        else {
            this.ObjectiveFunction.metric = temp[1]
        }
        
        this.toggle_disable(this.selected_objective)
        
        console.log(this.selected_objective , "selected objective  selected")
        console.log(this.checkboxMetrices , "check box modified ")

    }
    optimizeReset(type){
        // debugger
        if(type=="optimize"){
            let form = this.optimizerData()
           

            // if(this.info_promotion?.scenario_type == "pricing"){
            //     form = {...this.optimizerData() , ...{"pricing" : this.info_promotion.meta[0].pricing}}

            // }
            this.optimizeAndResetEvent.emit({
                "type" : 'optimize',
                'data' : form
            })
            
        }
        if(type == 'reset'){
            this.optimizeAndResetEvent.emit({
                "type" : 'reset',
            })

        }

    }
    get_order_map(id){
        let ret = ''
        if(id == 'mac-popup'){
            ret = 'MAC'
        }
        if(id == 'retailer-popup'){
            ret = 'TM'
        }
        if(id == 'te-popup'){
            ret = 'Trade_Expense'
        }
        if(id == 'mac-per-popup'){
            ret = 'MAC_Perc'
        }
        if(id == 'rp-per-popup'){
            ret = 'TM_Perc'
        }
        return ret
    }
    optimizerData(){
    console.log(this.info_promotion , "info promotions....")
    // debugger;
    let mars_leaf = [] as any
    let mars_disply = [] as any
    let decoded =  this.selected_promotions.map(d=>Utils.decodePromotionGermany(d))

    if(this.tenant == "germany"){
        decoded.forEach(item =>{
            if(item.promo_mechanics == 'TPR' || item.promo_mechanics == "Leaflet"){
                mars_leaf.push(true)
            }else{
                mars_leaf.push(false)
            }
        })
        decoded.forEach(item =>{
           if(item.promo_mechanics == 'TPR' || item.promo_mechanics == "Display"){
                mars_disply.push(true)
            }else{
                mars_disply.push(false)
            }
        })
        }else if(this.tenant == "uk"){

            
        }
 

       console.log(this.checkboxMetrices, "check box metrices")
    
       
      let mac:number =  parseFloat(this.checkboxMetrices.find(d=>d.id == "mac-popup")['checkHeadValue'].split("x")[1])
      let rp:number =  parseFloat(this.checkboxMetrices.find(d=>d.id == "retailer-popup")['checkHeadValue'].split("x")[1])
      let te:number =  parseFloat(this.checkboxMetrices.find(d=>d.id == "te-popup")['checkHeadValue'].split("x")[1])
      let mac_nsv:number =  parseFloat(this.checkboxMetrices.find(d=>d.id == "mac-per-popup")['checkHeadValue'].split("x")[1])
      let rp_rsv:number =  parseFloat(this.checkboxMetrices.find(d=>d.id == "rp-per-popup")['checkHeadValue'].split("x")[1])
    //   debugger
        // Utils.decodePromotion()
        // checkboxMetrices "Fin_Pref_Order":['Trade_Expense',"TM_Perc",'MAC_Perc','TM','MAC'],
        // checkHeadValue: 'x0.50',
        // checkboxLabel: 'MAC',
        let fin_pref_order:any = this.checkboxMetrices.map(d=>this.get_order_map(d.id)).reverse()
        if(fin_pref_order.length > 0){
            for(let i = 0;i < fin_pref_order.length; i++){
                if(fin_pref_order[i] == 'TM'){
                    fin_pref_order[i] = 'RP'
                }
                if(fin_pref_order[i] == 'TM_Perc'){
                    fin_pref_order[i] = 'RP_Perc'
                }
            }
        }
        let objective_function:any = this.selected_objective.replace("Maximize " , "").replace("Minimize " , "")
        if(objective_function == 'TM'){
            objective_function = 'RP'
        }
        return {
            "fin_pref_order" : fin_pref_order,
            "objective_function" : objective_function,
            "param_max_consecutive_promo" : this.duration_max,
            "param_min_consecutive_promo" : this.duration_min,
            "param_promo_gap" : this.param_gap_max,
            "param_total_promo_min" : this.min_week,
            "param_total_promo_max":this.max_week,
            "mars_tpr": decoded.map(d=>d.promo_depth),
            // "co_investment" : decoded.map(d=>d.co_investment),
            // "promo_mech" : decoded.map(d=>d.promo_mechanics),
            "leaflet_mech":mars_leaf,
            "display_mech":mars_disply,
            "config_mac" : mac != 1,
            "param_mac" : mac,
            "config_rp" : rp != 1,
            "param_rp" : rp,
            "config_trade_expense" : te != 1,
            "param_trade_expense" : te,
            "config_mac_perc" : mac_nsv != 1,
            "param_mac_perc" : mac_nsv,
            "config_rp_perc" : rp_rsv != 1,
            "param_rp_perc" : rp_rsv , 
            "param_compulsory_no_promo_weeks" : this.ignored_week_val.map(d=>d.week),
            "param_compulsory_promo_weeks" : this.cumpulsory_week_val.map(d=>d.week),
        }
    }

    sendMessage(modalType: string): void {
        // this.isExpand = true
        if(modalType == 'Optimize'){
            this.isExpand = true
        }
        if(modalType == 'user-guide-popup'){
            this.optimize.setResetUserGuideFlagObservable(true)
        }
        this.modalEvent.emit(modalType);
    }

    // sho and hide more action menu
    isShowDivIf = true;

    toggleDisplayDivIf() {
        this.isShowDivIf = !this.isShowDivIf;
    }

    // expand and collapse
    isExpand = true;
    expandHeader() {
        if(this.disable_button){
            return
        }
        this.isExpand = !this.isExpand;
    }
    populateConfig(configData :OptimizerConfigModel ){
        // configData.param_mac

        this.checkboxMetrices.filter(d=>{
            if(d.id == "mac-popup"){
                // d.disabled = true
                d.checkHeadValue = "x" + configData.param_mac

            }
            if(d.id == "te-popup"){
            
                d.checkHeadValue = "x" + configData.param_trade_expense

            }
            if(d.id == "retailer-popup"){

                d.checkHeadValue = "x" + configData.param_rp

            }
            if(d.id == "mac-per-popup"){
                // d.disabled = configData.config_mac_perc
                d.checkHeadValue = "x" + configData.param_mac_perc

            }
            if(d.id == "rp-per-popup"){
                // d.disabled = configData.config_rp_perc
                d.checkHeadValue = "x" + configData.param_rp_perc

            }
             
        })
    }
    populatePromotion(weekdata : ProductWeek[]){
        this.promotions = []
        this.product_week = this.optimizer_data.weekly
        
                
                weekdata.forEach(data=>{
                    let gen_promo = Utils.genratePromotionGermany(
                        parseFloat(data.tpr_discount) , 
                        parseFloat(data.flag_promotype_leaflet) , 
                        parseFloat(data.flag_promotype_display),
                        parseFloat(data.flag_promotype_distribution_500),
                      
                         
                    )
                    data.promotion_name = gen_promo
                    if(gen_promo && !this.promotions.includes(gen_promo)){
                      
                        this.promotions.push(gen_promo)
                    }
                    let str = "Y" + 1 + " Q"+data.quater as string
                    if(!this.quarter_year.includes(str)){
                        this.quarter_year.push(str);
                    }
                    
                    // data.promo_depth = parseInt(data.promo_depth)
                    // data.co_investment = (data.co_investment)
    
                })

                console.log(this.promotions , "generated promotions for optimizer")

    }

   
    // ngOnInit() {
    //     this.optimize.optimizerMetricsData.asObservable().subscribe(data=>{
    //         console.log(data)
    //         if(data == null){
    //             this.optimizerMetrics = ''
    //         }
    //         else{
    //             this.optimizerMetrics = data
    //             this.expandHeader()
    //         }
    //     })
    // }

    // drag and drop
    checkboxMetrices:any = [
        {
            id:"mac-popup",
            checkHeadValue: 'x0.50',
            checkboxLabel: 'MAC',
            disabled: false,
            checked : false,
            
        },
        {
            id:"retailer-popup",
            checkHeadValue: 'x0.75',
            checkboxLabel: 'Trade margin',
            disabled: false,
            checked : false,
           
        },
        {
            id:"te-popup",
            checkHeadValue: 'x1.50',
            checkboxLabel: 'Trade expense',
            disabled: false,
            checked : false,
             
        },
        {
            id:"mac-per-popup",
            checkHeadValue: 'x1.25',
            checkboxLabel: 'MAC, % NSV',
            disabled: false,
            checked : false,
             
        },
        {
            id:"rp-per-popup",
            checkHeadValue: 'x1.00',
            checkboxLabel: 'TM, % RSV',
            disabled: false,
            checked : false,
             
        },
    ];

    drop(event: CdkDragDrop<string[]>) {
        console.log(event , "event dragging")
        moveItemInArray(this.checkboxMetrices, event.previousIndex, event.currentIndex);
        console.log(event.previousIndex, event.currentIndex , "prev and current")
        console.log(this.checkboxMetrices, event.currentIndex , "this.checkboxMetrices and current")
    }
    metricClick(ev , index){
        console.log(ev , "event clicked")
        console.log(this.checkboxMetrices , "checkboxmetrices..")
        
        // this.checkboxMetrices[index].checked
        // debugger
        setTimeout(()=>{
        let checked = this.checkboxMetrices.filter(d=>d.checked == true)
        console.log(checked , "checked values")
        if(checked.length == 2){
            console.log(checked , "checked inside if....")
            this.checkboxMetrices.filter(d=>{
                if(!d.checked){
                    d.disabled = true

                }
               
            })
            // this.checkboxMetrices[index].checked = false
            return
        }
        else{
            this.checkboxMetrices.filter(d=>{
                if(d.disabled){
                    d.disabled = false

                }
               
            })
            if(this.checkboxMetrices[index].checked){
                this.sendMessage(this.checkboxMetrices[index].id)
            }

        }
           

        },100)
       
       
        // else{
        //     ev.stopPropagation();
        // }

    }

    onRoleChangeCheckbox(ev, index) {
        console.log(ev , index , " :ecv and index")
        this.checkboxMetrices[index].disabled = !ev;
        this.checkboxMetrices[index].checked = ev.checked
        console.log(this.checkboxMetrices);
        if(ev.checked){
             
            this.sendMessage(this.checkboxMetrices[index].id)
            

        }
    }

    // select config
    singleSelect: any = [];
    config = {
        displayKey: 'name', // if objects array passed which key to be displayed defaults to description
        search: false,
    };
    optionsNormal = [
        {
            _id: '3years',
            index: 0,
            balance: '$2,806.37',
            picture: 'http://placehold.it/32x32',
            name: '3 years',
        },
        {
            _id: '1year',
            index: 1,
            balance: '$2,984.98',
            picture: 'http://placehold.it/32x32',
            name: '1 years',
        },
        {
            _id: '2year',
            index: 1,
            balance: '$2,984.98',
            picture: 'http://placehold.it/32x32',
            name: '2 years',
        },
    ];

    options1 = [
        {
            _id: 'N230%(Co30%)',
            index: 0,
            name: 'N+2-30% (Co-30%)',
        },
        {
            _id: 'N230%(Co30%)s',
            index: 1,
            name: 'N+2-30% (Co-30%)',
        },
        {
            _id: 'N230%(Co30%)a',
            index: 1,
            name: 'N+2-30% (Co-30%)',
        },
    ];
    options2 = [
        {
            _id: 'N230%(Co30%)1',
            index: 0,
            name: 'N+2-30% (Co-30%)1',
        },
        {
            _id: 'N230%(Co30%)s2',
            index: 1,
            name: 'N+2-30% (Co-30%)2',
        },
        {
            _id: 'N230%(Co30%)a3',
            index: 1,
            name: 'N+2-30% (Co-30%)3',
        },
    ];
    options3 = [
        {
            _id: 'N230%(Co30%)2',
            index: 0,
            name: 'N+2-30% (Co-30%)2',
        },
        {
            _id: 'N230%(Co30%)s2',
            index: 1,
            name: 'N+2-30% (Co-30%)4',
        },
        {
            _id: 'N230%(Co30%)a3',
            index: 1,
            name: 'N+2-30% (Co-30%)3',
        },
    ];

    ngOnDestroy(){
        console.log("destroying optimizer header")
        this.optimize.setoptimizerDataObservable(null as any)
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
    ngOnChanges(changes: SimpleChanges) {
 
        for (let property in changes) {
            
            if (property === 'title') {
                if(changes[property].currentValue == "Untitled"){
                    this.title = changes[property].currentValue
                }
                else{
                    let change = changes[property].currentValue as ListPromotion
                    this.title = change.name
                    this.info_promotion = change

                }
                // info_promotion
                

                
                
               
            } 
            if (property === 'status') {
                this.status =  changes[property].currentValue
                if(this.status == 'viewmore'){
                    this.isExpand = true
                }
                console.log(changes[property].currentValue , " status changes........")

            }
        }
    }
}
