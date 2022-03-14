import { Component, Input, Output, EventEmitter, OnInit, OnDestroy,SimpleChanges } from '@angular/core';
// import {OptimizerService} from '../../../core/services/optimizer.service'
import {OptimizerService , SimulatorService , PromotionService} from "@core/services"
// import {ProductWeek , Product, CheckboxModel,LoadedScenarioModel} from "../../../core/models"
import {ProductWeek , Product, CheckboxModel,LoadedScenarioModel , UploadModel, FilterModel, ListPromotion, ProductWeekUk} from "@core/models"
import { Observable, of, from, BehaviorSubject, combineLatest , Subject } from 'rxjs';
import {takeUntil} from "rxjs/operators"
import * as utils from "@core/utils"
import * as FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'nwn-loaded-scenario-header',
    templateUrl: './loaded-scenario-header.component.html',
    styleUrls: ['./loaded-scenario-header.component.css'],
})
export class LoadedScenarioHeaderComponent implements OnInit,OnDestroy {
    private unsubscribe$: Subject<any> = new Subject<any>();
    @Input()
    currency
    @Input()
    tenant
    @Input()
    hidepanel = true
    @Input()
    disable_button = true
    @Input()
    title: string = 'Untitled';
    @Output()
    filterResetEvent = new EventEmitter()
    @Output()
    modalEvent = new EventEmitter<string>();
    @Output()
    downloadEvent = new EventEmitter<any>();
    @Output()
    simulateResetEvent = new EventEmitter<{"action" : string,"promotion_map" : Array<any> , "promo_elasticity" : number}>();
    @Input()
    filter_model : FilterModel
    @Input()
    disable_save_download = true
    options1:Array<any> = [];
    promotions$: Observable<string[]> = null as any;
    product_week:any[] = [];
    genobj : {[key:string] : any[]  } = {}
    quarter_year:Array<string> = [];
    selected_quarter:string = ''
    selected_product_week : any[] = []
    promotion_map:Array<any> = [] //{"selected_promotion" : $event.value , "week" : this.product_week }
    available_year:any[] = ["1 year" , "2 years" , "3 years"]
    loaded_scenario:LoadedScenarioModel = null as any
    promo_elasticity = 0

    // hidepanel = true
    constructor(private toastr: ToastrService,
        private optimize : OptimizerService,
        private simulatorService : SimulatorService,
        private promoService : PromotionService){

    }
    _populateWeekGermany(weekdata){

            // this.optimize.getProductWeekObservable().pipe(
        //     takeUntil(this.unsubscribe$)
        // ).subscribe(weekdata=>{
            console.log(weekdata , "week data errors germany")
            if(weekdata.length == 0){
                // this.hidepanel = true
                this.product_week = []
                this.optimize.set_baseline_null()
                this.available_year =["1 year" , "2 years" , "3 years"]
                this.quarter_year = []
                this.selected_quarter = ''
                this.selected_product_week  = []
                this.optimize.setPromotionObservable([])
                this.disable_button = true
                this.promotion_map = []
                this.promo_elasticity = 0

            }
            else{
                console.log(weekdata , "weekdata...................")
                let promo_depth : Array<string> = [];
                
                (weekdata as ProductWeek[]).forEach(data =>{
                    
                    // let sdata = (data as ProductWeekUk)
                
                    // let gen_promo = ''
                    let gen_promo = utils.genratePromotionGermany(
                        parseFloat(data.tpr_discount),
                        parseFloat(data.flag_promotype_leaflet),
                        parseFloat(data.flag_promotype_display),
                        parseFloat(data.flag_promotype_distribution_500)
                    )
                    data.promotion_name = gen_promo
                    if(gen_promo && !promo_depth.includes(gen_promo)){
                      
                        promo_depth.push(gen_promo)
                    }
                    let str = "Y" + 1 + " Q"+data.quater as string
                    if(!this.quarter_year.includes(str)){
                        this.quarter_year.push(str);

                    }
                    // if(str in this.genobj){
                    //     this.genobj[str].push(data)
                    //     // append(data)
                    // }
                    // else{
                    //     this.quarter_year.push(str);
                    //     this.genobj[str] = [data]
                    // }
                    // data.promo_depth = parseInt(data.promo_depth)
                    // data.co_investment = (data.co_investment)
    
                })
                // debugger
                //console.log(this.available_year , "Available year")
                // this.options1 = promo_depth
                // this.optimize.set_base_line_promotion(promo_depth)
                // this.options1 = this.optimize.get_base_line_promotions()

                this.optimize.setBaseLineObservable(promo_depth)
                this.options1 = promo_depth
                //console.log(this.options1 , "options for drop down promotion")
                this.product_week = weekdata
                // this.hidepanel = false
                this.selected_quarter = this.quarter_year[0]
                this.selected_product_week  = this.product_week.filter(data=>data.quater == parseInt(
                    this.selected_quarter.split("Q")[1]
                    )
                    ).sort((a,b)=>(a.week > b.week) ? 1 : ((b.week > a.week) ? -1 : 0))
                //console.log(this.genobj , "gen obj")

                this.disable_button = false
               
              }

        //     },
            
        //    error=>{
        //     //console.log(error , "error")
        //   })

    }
    _populateWeekUK(weekdata){
        // this.optimize.getProductWeekObservable().pipe(
        //     takeUntil(this.unsubscribe$)
        // ).subscribe(weekdata=>{
            console.log(weekdata , "week data errors")
            if(weekdata.length == 0){
                // this.hidepanel = true
                this.product_week = []
                this.optimize.set_baseline_null()
                this.available_year =["1 year" , "2 years" , "3 years"]
                this.quarter_year = []
                this.selected_quarter = ''
                this.selected_product_week  = []
                this.optimize.setPromotionObservable([])
                this.disable_button = true
                this.promotion_map = []
                this.promo_elasticity = 0

            }
            else{
                console.log(weekdata , "weekdata...................")
                let promo_depth : Array<string> = [];
                
                (weekdata as ProductWeekUk[]).forEach(data =>{
                    // debugger
                    // data.base_tactics = 
                    // let sdata = (data as ProductWeekUk)
                
                    // let gen_promo = ''
                    let gen_promo = utils.genratePromotionUK(
            data.base_tactics,data.tpr_discount , data.flag_promotype_display_ge , 
            data.flag_promotype_display_ss , data.flag_promotype_pl,data.flag_promotype_poweraisle,
            data.flag_promotype_consumer_promotions
                    )
                    data.promotion_name = gen_promo
                    if(gen_promo && !promo_depth.includes(gen_promo)){
                      
                        promo_depth.push(gen_promo)
                    }
                    let str = "Y" + 1 + " Q"+data.quater as string
                    if(!this.quarter_year.includes(str)){
                        this.quarter_year.push(str);

                    }
                    // if(str in this.genobj){
                    //     this.genobj[str].push(data)
                    //     // append(data)
                    // }
                    // else{
                    //     this.quarter_year.push(str);
                    //     this.genobj[str] = [data]
                    // }
                    // data.promo_depth = parseInt(data.promo_depth)
                    // data.co_investment = (data.co_investment)
    
                })
                //console.log(this.available_year , "Available year")
                // this.options1 = promo_depth
                // this.optimize.set_base_line_promotion(promo_depth)
                // this.options1 = this.optimize.get_base_line_promotions()
                this.optimize.setBaseLineObservable(promo_depth)
                this.options1 = promo_depth
                //console.log(this.options1 , "options for drop down promotion")
                this.product_week = weekdata
                // this.hidepanel = false
                this.selected_quarter = this.quarter_year[0]
                this.selected_product_week  = this.product_week.filter(data=>data.quater == parseInt(
                    this.selected_quarter.split("Q")[1]
                    )
                    ).sort((a,b)=>(a.week > b.week) ? 1 : ((b.week > a.week) ? -1 : 0))
                //console.log(this.genobj , "gen obj")

                this.disable_button = false
               
              }

        //     },
            
        //    error=>{
        //     //console.log(error , "error")
        //   })
    }
    _germany_uploaded_data(uploadData){
        let gen_array:any[] = []
        uploadData.simulated.weekly.forEach((data,index)=>{
            // this.promotion_map
            let leaflet = data.promo_mechanics == 'Leaflet'? 1 : 0
            let display = data.promo_mechanics == 'Display'? 1 : 0
            let distribution =  data.promo_mechanics == 'Distribution'? 1 : 0
            let gen_promo = utils.genratePromotionGermany(
                data.promo_depth,leaflet,display,distribution
                )
                if(gen_promo){
                    gen_array.push(gen_promo)
                    // this.optimize.insert_base_line_promotion(gen_promo)
                    this.promotion_map.push({
               
                        "selected_promotion" : gen_promo ,
                         "week" : uploadData.base[index]
                    })
    
                }
               
           
        })
        console.log(this.promotion_map , "promotion map uploaded")
        // debugger
        this.optimize.setBaseLineObservable(gen_array)
        this.optimize.setProductWeekObservable(uploadData.base)

    }

    _uk_uploaded_data(uploadData){
        let gen_array:any[] = []
        uploadData.simulated.weekly.forEach((data,index)=>{
            uploadData.base[index].base_tactics = data.promo_mechanics2
            uploadData.base[index].promo_price = data.promo_price

            // debugger
            // this.promotion_map
            // let leaflet = data.promo_mechanics == 'Leaflet'? 1 : 0
            // let display = data.promo_mechanics == 'Display'? 1 : 0
            // let distribution =  data.promo_mechanics == 'Distribution'? 1 : 0
            let gen_promo = data.promo_mechanics2
            // utils.genratePromotionGermany(
            //     data.promo_depth,leaflet,display,distribution
            //     )
                if(gen_promo){
                    gen_array.push(gen_promo)
                    // this.optimize.insert_base_line_promotion(gen_promo)
                    this.promotion_map.push({
               
                        "selected_promotion" : gen_promo ,
                         "week" : uploadData.base[index]
                    })
    
                }
               
           
        })
        console.log(this.promotion_map , "promotion map uploaded")
        // debugger
        this.optimize.setBaseLineObservable(gen_array)
        this.optimize.setProductWeekObservable(uploadData.base)

    }
    ngOnInit(){
        console.log(this.tenant , "tenant id")
        let promoWeekObservable$ = this.optimize.getProductWeekObservable()
        let loadedScenarioObservable$ = this.optimize.getLoadedScenarioModel()
        let uploadedObservable$ =  this.optimize.getUploadedScenarioObservable()
        if(this.tenant == "uk"){
            promoWeekObservable$.pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(data=>{
                this._populateWeekUK(data)
            },
            error=>{
                console.log(error , "error")
            })

            loadedScenarioObservable$.pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(data=>{
                if(data){
                    this.populatePromotionWeekUK(data)
                    this.promoService.setTactics(data['tactics'])
                    this.title = data.scenario_name
                    // this.promo_elasticity = data.promo_elasticity | 0
                }
                else{
                    this.title = "Untitled"
                }
                 
            })

            uploadedObservable$.pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe((uploadData:UploadModel)=>{
                if(uploadData){
this._uk_uploaded_data(uploadData)
                }

            },
            err=>{
                throw err
            })

        }
        else if(this.tenant == 'germany'){
            promoWeekObservable$.pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(data=>{


                this._populateWeekGermany(data)
            },
            error=>{
                console.log(error , "error")
            })
            loadedScenarioObservable$.pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(data=>{
                if(data){
                    this.populatePromotionWeekGermany(data)
                    this.title = data.scenario_name
                    this.promo_elasticity = data.promo_elasticity | 0
                }
                else{
                    this.title = "Untitled"
                }
                 
            })
            uploadedObservable$.pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe((uploadData:UploadModel)=>{
                if(uploadData){
                    this._germany_uploaded_data(uploadData)
                    
                }

            },
            err=>{
                throw err
            })
      
             
        }
        

        // let promoWeekObservable$ = this.optimize.getProductWeekObservable()
    //    .subscribe((uploadData:UploadModel)=>{
    //         if(uploadData){
                 
                
    //         }
           
    // // 

    //     })
        
        
       
       this.optimize.getPromotionObservable().pipe(
        takeUntil(this.unsubscribe$)
       ).subscribe(data=>{
           if (data.length > 0){
               //console.log(data , "get promotion data")
               this.options1 = data
               //console.log(this.options1, "options 1")

           }
          
       })


    }

    closeClicked($event){
        // closeClicked

        this.filterResetEvent.emit($event)
        
    }
    
    downloadWeeklyInput(){
        if(this.disable_button){
            return
        }
        //console.log(this.filter_model , "avaible model")
        let queryObj = {
            "account_name" : this.filter_model.retailer,
            "product_group" : this.filter_model.product_group,
            "weekly" : this.optimize.getProductWeekData()
        }
        
        // let pw = 
        // let promo = this.optimize.get_base_line_promotions()

        this.simulatorService.downloadWeeklyDataInputTemplate(queryObj).subscribe(data=>{
        this.toastr.success('File Downloaded Successfully','Success');
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });    
        FileSaver.saveAs(
            blob,
            this.tenant+ '_WeeklyInput' + '_Template_' + new Date().getTime() + 'xlsx'
          );
        })
       
    }
    populatePromotionWeekGermany(scenario : any){
        let pw:ProductWeek[]=[];
        //console.log(this.promotion_map , "promotion map vallllllllllllllllllllllllllllllll")
        this.promotion_map = []
        
        scenario.base.weekly.forEach((data,index)=>{
            let simulated_depth = scenario.simulated.weekly[index].promo_depth
            // let simulated_coinv = scenario.simulated.weekly[index].co_investment
            let simulated_leaflet = scenario.simulated.weekly[index].flag_promotype_leaflet
            let simulated_display = scenario.simulated.weekly[index].flag_promotype_display
            let simulated_distribution = scenario.simulated.weekly[index].flag_promotype_distribution_500
            if(simulated_depth){
                this.promotion_map.push({
                    "selected_promotion" : utils.genratePromotionGermany(simulated_depth,
                        simulated_leaflet,simulated_display,simulated_distribution
                       
                    ) ,
                     "week" : data
                })
            }
            pw.push({
                "model_meta": 0,
                "year": parseInt(data.year),
                "quater": data.quater,
                "month": data.month,
                "period": data.period,
                "week": data.week,
                "date": data.date,
                "median_base_price_log" : parseFloat(data.median_base_price_log.toFixed(2)),
                "tpr_discount":  parseFloat(data.promo_depth.toFixed(2)),
                "flag_promotype_leaflet": data.flag_promotype_leaflet,
                "flag_promotype_display": data.flag_promotype_display,
                "flag_promotype_distribution_500": data.flag_promotype_distribution_500,
                "promo_price" : parseFloat(scenario.simulated.weekly[index].asp.toFixed(2))
               })
        

        })
    //    debugger;
        this.optimize.setProductWeekObservable(pw)

    }
    populatePromotionWeekUK(scenario : any){
        let pw:ProductWeekUk[]=[];
        //console.log(this.promotion_map , "promotion map vallllllllllllllllllllllllllllllll")
        this.promotion_map = []
        
        scenario.base.weekly.forEach((data,index)=>{
            // debugger
            let simulated_depth = scenario.simulated.weekly[index].promo_depth
            // let simulated_coinv = scenario.simulated.weekly[index].co_investment
             
            if(simulated_depth){
                this.promotion_map.push({
                    "selected_promotion" :  scenario.simulated.weekly[index].tactic,
                     "week" : data
                })
            }
            pw.push({
                "model_meta": 0,
                "year": parseInt(data.year),
                "quater": data.quater,
                "month": data.month,
                "period": data.period,
                "week": data.week,
                "date": data.date,
                "median_base_price_log" : parseFloat(data.median_base_price_log.toFixed(2)),
                "tpr_discount":  parseFloat(data.promo_depth.toFixed(2)),
                "flag_promotype_chille":data.flag_promotype_chille,
"flag_promotype_clubcard":data.flag_promotype_clubcard,
"flag_promotype_consumer_promotions":data.flag_promotype_consumer_promotions,
"flag_promotype_display_ge":data.flag_promotype_display_ge,
"flag_promotype_display_ss":data.flag_promotype_display_ss,
"flag_promotype_long_term_multibuy": data.flag_promotype_long_term_multibuy,
"flag_promotype_long_term_tpr":data.flag_promotype_long_term_tpr,
"flag_promotype_pl":data.flag_promotype_pl,
"flag_promotype_poweraisle":data.flag_promotype_poweraisle,
"flag_promotype_short_term_multibuy":data.flag_promotype_short_term_multibuy,
"flag_promotype_short_term_tpr":data.flag_promotype_short_term_tpr,
"base_tactics": data.tactic,
"promo_price" : parseFloat(scenario.simulated.weekly[index].asp.toFixed(2))
               })   
        

        })
    //    debugger;
        this.optimize.setProductWeekObservable(pw)

    }
    populatePromotionWeek(scenario : LoadedScenarioModel){
        let pw:ProductWeek[]=[];
        //console.log(this.promotion_map , "promotion map vallllllllllllllllllllllllllllllll")
        this.promotion_map = []
        
        scenario.base.weekly.forEach((data,index)=>{
            let simulated_depth = scenario.simulated.weekly[index].promo_depth
            let simulated_coinv = scenario.simulated.weekly[index].co_investment
            let simulated_n_plus_1 = scenario.simulated.weekly[index].flag_promotype_n_pls_1
            let simulated_motivation = scenario.simulated.weekly[index].flag_promotype_motivation
            let simulated_traffic = scenario.simulated.weekly[index].flag_promotype_traffic
            //console.log(simulated_depth , "simulated depth")
            if(simulated_depth){
                //{"selected_promotion" : $event.value , "week" : this.product_week }
                this.promotion_map.push({
                    "selected_promotion" : utils.genratePromotion(
                        simulated_motivation,simulated_n_plus_1,simulated_traffic,simulated_depth,
                        simulated_coinv

                    ) ,
                     "week" : data
                })
            }
        //    pw.push({
        //     "model_meta": 0,
        //     "year": parseInt(data.year),
        //     "quater": data.quater,
        //     "month": data.month,
        //     "period": data.period,
        //     "week": data.week,
        //     "date": data.date,
        //     // "promo_depth": data.promo_depth,
        //     // "co_investment": data.co_investment,
        //     // "flag_promotype_motivation": data.flag_promotype_motivation,
        //     // "flag_promotype_n_pls_1": data.flag_promotype_n_pls_1,
        //     // "flag_promotype_traffic": data.flag_promotype_traffic
        //    })

        })
        //console.log(this.promotion_map , "final promotion map")
        this.optimize.setProductWeekObservable(pw)

    }
    promotionChange($event:any){
        let promo =  this.promotion_map.find(p=>p.week.week == $event.week.week) 
        //console.log(promo , "promo filtered")
        if(promo){
            promo['selected_promotion'] = $event['selected_promotion']

        }
        else{
            this.promotion_map = [...this.promotion_map, $event];
            // this.promotion_map.push($event)

        }
      
        //console.log($event , "promotion change in header")
        //console.log(this.promotion_map , "promotion map")
    }
    copyBaselineGermany(){
        // console.log(this.product_week , )
        this.promotion_map = []
        // {"selected_promotion" : $event.value , "week" : this.product_week }
        this.product_week.forEach(data=>{
            // debugger
            
            let val = (parseFloat((data.tpr_discount).toString()))
            if(val){
                this.promotion_map.push({
                    "selected_promotion": utils.genratePromotionGermany(
                        parseFloat(data.tpr_discount),
                        parseFloat(data.flag_promotype_leaflet)
                        ,parseFloat(data.flag_promotype_display),parseFloat(data.flag_promotype_distribution_500),
                        // ,parseFloat(data.co_investment)
                    ),
                    // "TPR-"+val+"%",
                    "week" : data})
            
                // //console.log(val , "values fro ", data.week , " discont " ,  "TPR-"+val+"%")
            }
            data.promo_depth = val
            // data.promo_depth = val
            data.base_promo_price = data.median_base_price_log
            
            var number =utils.reducePercent(data.base_promo_price , val)
            data.promo_price = Number(number.toFixed(2))
            // data.co_investment = (parseFloat((data.co_investment).toString()))
            // promo_depth.map(val=>"TPR-"+val+"%")
        })
        //console.log(this.promotion_map , "promotion map change")


        // debugger


    }
    copyBaselineUK(){
        // console.log(this.product_week , )
        this.promotion_map = []
        // {"selected_promotion" : $event.value , "week" : this.product_week }
        this.product_week.forEach(data=>{
            if(data.base_tactics){
                
                this.promotion_map.push({
                    "selected_promotion":  utils.genratePromotionUK(
                        data.base_tactics,data.tpr_discount , data.flag_promotype_display_ge , 
                        data.flag_promotype_display_ss , data.flag_promotype_pl,data.flag_promotype_poweraisle,
                        data.flag_promotype_consumer_promotions
                                ),
                    // "TPR-"+val+"%",
                    "week" : data})
            
                // //console.log(val , "values fro ", data.week , " discont " ,  "TPR-"+val+"%")
        

            }
            
            
            data.base_promo_price = data.median_base_price_log
            var number = this.promoService.getPromoPrice(utils.get_tactics_from_mechanic(data.base_tactics))
            number = Number(parseFloat(number).toFixed(2))
            // var number = parseFloat(data.base_tactics.match(/[\d\.]+/))
            data.promo_price = number
            // data.co_investment = (parseFloat((data.co_investment).toString()))
            // promo_depth.map(val=>"TPR-"+val+"%")
        })
        //console.log(this.promotion_map , "promotion map change")


        // debugger

    }
    copyBaseline(){
        if(this.tenant == 'uk'){
this.copyBaselineUK()
        }
        else{
this.copyBaselineGermany()
        }
        
    }

    copyBaselineBKP(){
        // console.log(this.product_week , )
        this.promotion_map = []
        // {"selected_promotion" : $event.value , "week" : this.product_week }
        this.product_week.forEach(data=>{
            // debugger
            
            let val = (parseFloat((data.promo_depth).toString()))
            if(val){
                this.promotion_map.push({
                    "selected_promotion": utils.genratePromotion(
                        parseFloat(data.flag_promotype_motivation)
                        ,parseFloat(data.flag_promotype_n_pls_1),parseFloat(data.flag_promotype_traffic),
                        parseFloat(data.promo_depth),parseFloat(data.co_investment)
                    ),
                    // "TPR-"+val+"%",
                    "week" : data})
            
                // //console.log(val , "values fro ", data.week , " discont " ,  "TPR-"+val+"%")
            }
            data.promo_depth = val
            data.promo_depth = val
            data.co_investment = (parseFloat((data.co_investment).toString()))
            // promo_depth.map(val=>"TPR-"+val+"%")
        })
        //console.log(this.promotion_map , "promotion map change")


        // debugger
    }

    changeYear(){
        let y2 = ['Y2 Q1','Y2 Q2','Y2 Q3','Y2 Q4']
        let y3 = ['Y3 Q1','Y3 Q2','Y3 Q3','Y3 Q4']
        //console.log(this.singleSelect , "single selecct")
        if(this.singleSelect == "2 years"){
            // debugger
            this.quarter_year = [...this.quarter_year , ...y2]
            this.quarter_year = this.quarter_year.filter(e=>!y3.includes(e))
            this.quarter_year =[...new Set(this.quarter_year)]
            return
        }
        if(this.singleSelect == "3 years"){
            this.quarter_year = [...this.quarter_year , ...y2 , ...y3]
            this.quarter_year =[...new Set(this.quarter_year)]
            return
        }
        this.quarter_year = this.quarter_year.filter(e=>(!y3.includes(e) && (!y2.includes(e))))
        this.quarter_year =[...new Set(this.quarter_year)]
        //console.log(this.quarter_year , "quarter year")
    }
    changeQuarter(key:string){  
        if(key.includes("Y2") || key.includes("Y3")){
            this.toastr.warning("Only one year data available")
            return
        }
        
        // debugger
        this.selected_quarter = key
        this.selected_product_week  = this.product_week.filter(data=>data.quater == parseInt(
            this.selected_quarter.split("Q")[1]
            )
            ).sort((a,b)=>(a.week > b.week) ? 1 : ((b.week > a.week) ? -1 : 0))
    }

    simulateAndReset(type){
        //console.log(this.promo_elasticity , "promo elasticity")
        //console.log(this.disable_button , "hiding panel")
        if(!this.disable_button){
            this.simulateResetEvent.emit({
                "action" : type,
                "promotion_map" : this.promotion_map,
                "promo_elasticity" : this.promo_elasticity
            })

        }
        return
        
       
    }

    sendMessage(modalType: string): void {
        this.isShowDivIf = true
        if(modalType == 'save-scenario-popup'){
            if(this.disable_button){
                return
            }
        }
        this.modalEvent.emit(modalType);
    }
    download(){
        if(this.disable_button){
            return
        }
        this.downloadEvent.emit()

    }

    isShowDivIf = true;

    toggleDisplayDivIf() {
        this.isShowDivIf = !this.isShowDivIf;
    }

    singleSelect: any = [];
    config = {
        displayKey: 'name', // if objects array passed which key to be displayed defaults to description
        search: false,
        placeholder:'Time period'
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
    


    // options1 = [
    //     {
    //         _id: 'N230%(Co30%)',
    //         index: 0,
    //         name: 'N+2-30% (Co-30%)',
    //     },
    //     {
    //         _id: 'N230%(Co30%)s',
    //         index: 1,
    //         name: 'N+2-30% (Co-30%)',
    //     },
    //     {
    //         _id: 'N230%(Co30%)a',
    //         index: 1,
    //         name: 'N+2-30% (Co-30%)',
    //     },
    // ];
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
        //console.log("destroying sceario header")
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
    ngOnChanges(changes: SimpleChanges) {
 
        for (let property in changes) {
            if (property === 'hidepanel') {
                
                this.hidepanel = changes[property].currentValue
               
            } 
            if (property === 'title') {
                
                this.title = changes[property].currentValue

                
                
               
            } 
        }
    }
}
