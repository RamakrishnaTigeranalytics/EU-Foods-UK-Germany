import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ModalService } from '@molecules/modal/modal.service';
import { OptimizerService } from '../../../core/services/optimizer.service';
import * as Utils from "../../../core/utils/util"
@Component({
    selector: 'nwn-promo-optimizer-aggregated',
    templateUrl: './promo-optimizer-aggregated.component.html',
    styleUrls: ['./promo-optimizer-aggregated.component.css'],
})


export class PromoOptimizerAggregatedComponent implements OnInit, AfterViewInit {
    @ViewChild('scrollOne') scrollOne: ElementRef;
    @ViewChild('scrollTwo') scrollTwo: ElementRef;
    @ViewChild('scrollOneOP') scrollOneOP: ElementRef;
    @ViewChild('scrollTwoOP') scrollTwoOP: ElementRef;
    @Input()
    isUserConstraintChanged:boolean = false
    @Input()
    filter_model:any = null
    @Input()
    currency:any = null
    @Input()
    tenant:any = null
    translate_y: string = '';
    currentTranslateRate: string = '';
    index = 0
    randomResult:any = ''
    constructor(private elRef: ElementRef,private restApi: OptimizerService,public modalService: ModalService) {}
    
    public weeklyTableWidth: any;
    public weeklyTableHeight: any;
    public aggregatedGraphWidth: any;
    public aggregatedGraphWidthOptimizer: any;

    public baseCalendar: any = []
    public stimulatedCalendar: any = []

    public baselineCalDropdown = "roi"
    public stimulatedCalDropdown = "roi"

    public baselineChartLegend = 'ROI'
    public stimulatedChartLegend = 'ROI'

    aggregatedTab:any = {
        "absolute": 'selected',
        "percent": 'unselected'
    }

    aggregatedTabOptimizer:any = {
        "absolute": 'selected',
        "percent": 'unselected'
    }

    weeklyTab:any = {
        "absolute": 'selected',
        "percent": 'unselected'
    }
    activeWeeklyTab: string = 'absolute'
    activeAggregatedTab: string = 'absolute'
    activeAggregatedTabOptimizer: string = 'absolute'

    units:any
    base_units:any
    incremental_units:any
    volume:any
    lsv:any
    nsv:any
    mac:any
    mac_per_nsv:any
    trade_expense:any
    te_lsv : any
    te_unit:any
    roi:any
    cogs:any
    lift_percent:any
    asp: any
    promo_asp:any
    rst_w_o_vat:any
    customer_margin:any
    customer_margin_rsv:any

    weeklyData:any = []
    optimizer_response : any = null
    message1 : string
    message2 : string
    message3 : string

    baselineLiftChartData:any = []
    plChartData:any = []
    product:any;

    ngOnInit(): void {
        this.weeklyTableWidth = window.innerWidth - 155;
        this.weeklyTableHeight = window.innerHeight - 150;
        this.aggregatedGraphWidthOptimizer = window.innerWidth - 155;
        this.aggregatedGraphWidth = (window.innerWidth - 155) / 2;
        this.restApi.getOptimizerResponseObservabe().subscribe(data=>{
            if(data){
                console.log(data , "response data")
                this.optimizer_response = data
                this.index = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
                this.getChartData()

            }
            else{
                console.log("resetting .............")
               this.resetData()

            }
            
        })
    }
    resetData(){
        this.optimizer_response = null
        this.weeklyData = []
        this.baseCalendar = []
        this.stimulatedCalendar = []
        this.baselineLiftChartData = []
        this.plChartData = []
        console.table(this.weeklyData)
        console.table(this.baseCalendar)
        console.table(this.stimulatedCalendar)
        console.table(this.baselineLiftChartData)
        console.table(this.plChartData)
    

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

    aggregatedSubTabClick(key : string){
        if(key == 'Absolute'){
            this.aggregatedTab = {
                "absolute": 'selected',
                "percent": 'unselected'
            }
            this.activeAggregatedTab = "absolute"
        }
        else {
            this.aggregatedTab = {
                "absolute": 'unselected',
                "percent": 'selected'
            }
            this.activeAggregatedTab = "percent"
        }
    }

    aggregatedSubTabClickOP(key : string){
        if(key == 'Absolute'){
            this.aggregatedTabOptimizer = {
                "absolute": 'selected',
                "percent": 'unselected'
            }
            this.activeAggregatedTabOptimizer = "absolute"
        }
        else {
            this.aggregatedTabOptimizer = {
                "absolute": 'unselected',
                "percent": 'selected'
            }
            this.activeAggregatedTabOptimizer = "percent"
        }
    }

    get_holiday_calendar(str){
        if(str){
            return str.split(",").map(d=>d.split("_").join(" "))
        }
        return null
    }
    HolidayNameConversion(isHoliday:any,value:any){
        if(isHoliday){
            if(value){
                let temp = value.split(',')
                if(temp.length > 1){
                    for(let i = 0;i < temp.length;i++){
                        temp[i] = ' ' + temp[i].split('_').map(capitalize).join(' ').replace("Flag ","")
                    }
                    return temp.join()
                }
                else if(temp.length == 1){
                    return temp[0].split('_').map(capitalize).join(' ').replace("Flag ","")
                }
            }
        }
        return ''
    }

    getSeasonality(value:any){
        if(value < 0.95){
            return 'low'
        }
        else if(value < 1.05){
            return 'med'
        }
        else{
            return 'high'
        }
    }
    _generate_value(data , key , currency , percent){
        return {
            "converted_base": Utils.formatPlain(data['base']['total'][key],currency,percent),
            "converted_simulated": Utils.formatPlain(data['simulated']['total'][key],currency,percent),
            "arrow":  data['simulated']['total'][key] > data['base']['total'][key] ?  'carret-up' : 'carret-down' ,
            "percent": "(" + Utils.percentageDifference(data['simulated']['total'][key],data['base']['total'][key]) + "%)",
            "converted_difference": "(" + Utils.formatPlain(data['simulated']['total'][key]-data['base']['total'][key],currency,percent) + ")",
            "color": this.colorForDifference(data['base']['total'][key],data['simulated']['total'][key]),
        }

    }
    _generate_value_weekly(data ,i, key , currency , percent){
        return{
            "converted_base": Utils.formatNumber(data['base']['weekly'][i][key],currency,percent),
            "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i][key],currency,percent),
            "arrow": data['simulated']['weekly'][i][key] > data['base']['weekly'][i][key] ?  'carret-up' : 'carret-down' ,
            "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i][key],data['base']['weekly'][i][key]) + "%)",
            "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i][key]-data['base']['weekly'][i][key],currency,percent) + ")",
            "color":  this.colorForDifference(data['base']['weekly'][i][key] , data['simulated']['weekly'][i][key]),
        }

    }


    getChartData(){
        this.weeklyData = []
        this.baseCalendar = []
        this.stimulatedCalendar = []
        let optimizerResponse = this.optimizer_response.financial_metrics
        let metrics: any = []
        for(let i=0; i < optimizerResponse.base.weekly.length; i++){
            let durationObj = this.convertToFormat(optimizerResponse.base.weekly[i].date) 
            let week = optimizerResponse.base.weekly[i].week
            let holiday = false
            let holiday_name:any = ''
            if(this.optimizer_response.financial_metrics.holiday_calendar.length > 0){
                if(this.optimizer_response.financial_metrics.holiday_calendar[i][i+1] != ""){
                    holiday = true
                    holiday_name = this.optimizer_response.financial_metrics.holiday_calendar[i][i+1]
                }
            }
            // let seasonality = ''
            // if(optimizerResponse[i].SI){
            //     if(optimizerResponse[i].SI < 0.95){
            //         seasonality = 'low'
            //     }
            //     else if(optimizerResponse[i].SI < 1.05){
            //         seasonality = 'med'
            //     }
            //     else{
            //         seasonality = 'high'
            //     }
            // }
            this.baseCalendar.push({
                date: durationObj.date,
                timePeriod: durationObj.day + ' ' + durationObj.month,
                month: durationObj.month,
                year: durationObj.year,
                name: 'W'+ week + ' '+ durationObj.year,
                discount: optimizerResponse.base.weekly[i].promo_depth/100,
                holiday: holiday,
                seasonality: this.getSeasonality(optimizerResponse.base.weekly[i].si),
                si : (optimizerResponse.base.weekly[i].si).toFixed(2),
                roi: (optimizerResponse.base.weekly[i].roi).toFixed(2),
                lift : (optimizerResponse.base.weekly[i].lift).toFixed(2),
                asp: (optimizerResponse.base.weekly[i].asp).toFixed(2),
                holidayNames : this.HolidayNameConversion(holiday,holiday_name)
            })
            this.stimulatedCalendar.push({
                date: durationObj.date,
                timePeriod: durationObj.day + ' ' + durationObj.month,
                month: durationObj.month,
                year: durationObj.year,
                name: 'W'+ week + ' '+ durationObj.year,
                discount: optimizerResponse.simulated.weekly[i].promo_depth/100,
                holiday: holiday,
                seasonality: this.getSeasonality(optimizerResponse.simulated.weekly[i].si),
                si: (optimizerResponse.simulated.weekly[i].si).toFixed(2),
                roi: (optimizerResponse.simulated.weekly[i].roi).toFixed(2),
                lift : (optimizerResponse.simulated.weekly[i].lift).toFixed(2),
                asp: (optimizerResponse.simulated.weekly[i].asp).toFixed(2),
                holidayNames : this.HolidayNameConversion(holiday,holiday_name)
            })
        }

        let financial_metrics:any = this.optimizer_response.financial_metrics

        this.baselineLiftChartData = [
            {
                group: 'Sales Units',
                baseline1: [financial_metrics['base']['total']['units'], financial_metrics['base']['total']['increment_units']],
                baseline2: [financial_metrics['simulated']['total']['units'],  financial_metrics['simulated']['total']['increment_units']],
            },
        ];

        this.plChartData = [
            { group: 'RSV', base: financial_metrics['base']['total']['total_rsv_w_o_vat'], simulated: financial_metrics['simulated']['total']['total_rsv_w_o_vat'] },
            { group: 'Trade Margin', base: financial_metrics['base']['total']['rp'], simulated: financial_metrics['simulated']['total']['rp'] },
            { group: 'LSV', base: financial_metrics['base']['total']['lsv'], simulated: financial_metrics['simulated']['total']['lsv'] },
            { group: 'Trade Expense', base: financial_metrics['base']['total']['te'], simulated: financial_metrics['simulated']['total']['te'] },
            { group: 'NSV', base: financial_metrics['base']['total']['nsv'], simulated: financial_metrics['simulated']['total']['nsv'] },
            { group: 'COGS', base: financial_metrics['base']['total']['cogs'], simulated: financial_metrics['simulated']['total']['cogs'] },
            { group: 'MAC', base: financial_metrics['base']['total']['mac'], simulated: financial_metrics['simulated']['total']['mac'] },
        ]

        this.units = this._generate_value(financial_metrics , 'units' , false , false)
        // {
        //     "converted_base": Utils.formatNumber(financial_metrics['base']['total']['units'],false,false),
        //     "converted_simulated": Utils.formatNumber(financial_metrics['simulated']['total']['units'],false,false),
        //     "percent": "(" + Utils.percentageDifference(financial_metrics['simulated']['total']['units'],financial_metrics['base']['total']['units']) + "%)",
        //     "converted_difference": "(" + Utils.formatNumber(financial_metrics['simulated']['total']['units']-financial_metrics['base']['total']['units'],false,false) + ")",
        //     "arrow": financial_metrics['simulated']['total']['units'] > financial_metrics['base']['total']['units'] ?  'carret-up' : 'carret-down' ,
        //     "color": this.colorForDifference(financial_metrics['base']['total']['units'] , financial_metrics['simulated']['total']['units']) 
        // }

        this.base_units =this._generate_value(financial_metrics , 'base_units' , false , false)
        //  {
        //     "converted_base": Utils.formatNumber(financial_metrics['base']['total']['base_units'],false,false),
        //     "converted_simulated": Utils.formatNumber(financial_metrics['simulated']['total']['base_units'],false,false),
        //     "percent": "(" + Utils.percentageDifference(financial_metrics['simulated']['total']['base_units'],financial_metrics['base']['total']['base_units']) + "%)",
        //     "converted_difference": "(" + Utils.formatNumber(financial_metrics['simulated']['total']['base_units']-financial_metrics['base']['total']['base_units'],false,false) + ")",
        //     "arrow": financial_metrics['simulated']['total']['base_units'] > financial_metrics['base']['total']['base_units'] ?  'carret-up' : 'carret-down' ,
        //     "color": this.colorForDifference(financial_metrics['base']['total']['base_units'] , financial_metrics['simulated']['total']['base_units'])
        // }

        this.incremental_units = this._generate_value(financial_metrics , 'increment_units' , false , false)
        // {
        //     "converted_base": Utils.formatNumber(financial_metrics['base']['total']['increment_units'],false,false),
        //     "converted_simulated": Utils.formatNumber(financial_metrics['simulated']['total']['increment_units'],false,false),
        //     "percent": "(" + Utils.percentageDifference(financial_metrics['simulated']['total']['increment_units'],financial_metrics['base']['total']['increment_units']) + "%)",
        //     "converted_difference": "(" + Utils.formatNumber(financial_metrics['simulated']['total']['increment_units']-financial_metrics['base']['total']['increment_units'],false,false) + ")",
        //     "arrow": financial_metrics['simulated']['total']['increment_units'] > financial_metrics['base']['total']['increment_units'] ?  'carret-up' : 'carret-down' ,
        //     "color": this.colorForDifference(financial_metrics['base']['total']['increment_units'] , financial_metrics['simulated']['total']['increment_units'])
        // }

        this.volume = this._generate_value(financial_metrics , 'volume' , false , false)
        // {
        //     "converted_base": Utils.formatNumber(financial_metrics['base']['total']['volume'],false,false),
        //     "converted_simulated": Utils.formatNumber(financial_metrics['simulated']['total']['volume'],false,false),
        //     "percent": "(" + Utils.percentageDifference(financial_metrics['simulated']['total']['volume'],financial_metrics['base']['total']['volume']) + "%)",
        //     "converted_difference": "(" + Utils.formatNumber(financial_metrics['simulated']['total']['volume']-financial_metrics['base']['total']['volume'],false,false) + ")",
        //     "arrow": financial_metrics['simulated']['total']['volume'] > financial_metrics['base']['total']['volume'] ?  'carret-up' : 'carret-down',
        //     "color": this.colorForDifference(financial_metrics['base']['total']['volume'] , financial_metrics['simulated']['total']['volume']) 
        // }

        this.lsv = this._generate_value(financial_metrics , 'lsv' , this.currency , false)
        // {
        //     "converted_base": Utils.formatNumber(financial_metrics['base']['total']['lsv'],false,false),
        //     "converted_simulated": Utils.formatNumber(financial_metrics['simulated']['total']['lsv'],false,false),
        //     "percent": "(" + Utils.percentageDifference(financial_metrics['simulated']['total']['lsv'],financial_metrics['base']['total']['lsv']) + "%)",
        //     "converted_difference": "(" + Utils.formatNumber(financial_metrics['simulated']['total']['lsv']-financial_metrics['base']['total']['lsv'],false,false) + ")",
        //     "arrow": financial_metrics['simulated']['total']['lsv'] > financial_metrics['base']['total']['lsv'] ?  'carret-up' : 'carret-down' ,
        //     "color": this.colorForDifference(financial_metrics['base']['total']['lsv'] , financial_metrics['simulated']['total']['lsv'])
        // }

        this.nsv = this._generate_value(financial_metrics , 'nsv' , this.currency , false)
        // {
        //     "converted_base": Utils.formatNumber(financial_metrics['base']['total']['nsv'],false,false),
        //     "converted_simulated": Utils.formatNumber(financial_metrics['simulated']['total']['nsv'],false,false),
        //     "percent": "(" + Utils.percentageDifference(financial_metrics['simulated']['total']['nsv'],financial_metrics['base']['total']['nsv']) + "%)",
        //     "converted_difference": "(" + Utils.formatNumber(financial_metrics['simulated']['total']['nsv']-financial_metrics['base']['total']['nsv'],false,false) + ")",
        //     "arrow": financial_metrics['simulated']['total']['nsv'] > financial_metrics['base']['total']['nsv'] ?  'carret-up' : 'carret-down',
        //     "color": this.colorForDifference(financial_metrics['base']['total']['nsv'] , financial_metrics['simulated']['total']['nsv']) 
        // }

        this.mac = this._generate_value(financial_metrics , 'mac' , this.currency , false)
        // {
        //     "converted_base": Utils.formatNumber(financial_metrics['base']['total']['mac'],false,false),
        //     "converted_simulated": Utils.formatNumber(financial_metrics['simulated']['total']['mac'],false,false),
        //     "percent": "(" + Utils.percentageDifference(financial_metrics['simulated']['total']['mac'],financial_metrics['base']['total']['mac']) + "%)",
        //     "converted_difference": "(" + Utils.formatNumber(financial_metrics['simulated']['total']['mac']-financial_metrics['base']['total']['mac'],false,false) + ")",
        //     "arrow": financial_metrics['simulated']['total']['mac'] > financial_metrics['base']['total']['mac'] ?  'carret-up' : 'carret-down' ,
        //     "color": this.colorForDifference(financial_metrics['base']['total']['mac'] , financial_metrics['simulated']['total']['mac']) 
        // }
        this.message1 = Utils.generateMessage1(this.mac , "MAC")
        // debugger

        this.mac_per_nsv = this._generate_value(financial_metrics , 'mac_percent' , false , true)
        // {
        //     "converted_base": Utils.formatNumber(financial_metrics['base']['total']['mac_percent'],false,false),
        //     "converted_simulated": Utils.formatNumber(financial_metrics['simulated']['total']['mac_percent'],false,false),
        //     "percent": "(" + Utils.percentageDifference(financial_metrics['simulated']['total']['mac_percent'],financial_metrics['base']['total']['mac_percent'] , true) + "%)",
        //     "converted_difference": "(" + Utils.formatNumber(financial_metrics['simulated']['total']['mac_percent']-financial_metrics['base']['total']['mac_percent'],false,false) + ")",
        //     "arrow": financial_metrics['simulated']['total']['mac_percent'] > financial_metrics['base']['total']['mac_percent'] ?  'carret-up' : 'carret-down' ,
        //     "color": this.colorForDifference(financial_metrics['base']['total']['mac_percent'] , financial_metrics['simulated']['total']['mac_percent'])
        // }

        this.trade_expense = this._generate_value(financial_metrics , 'te' , this.currency , false)
        // {
        //     "converted_base": Utils.formatNumber(financial_metrics['base']['total']['te'],false,false),
        //     "converted_simulated": Utils.formatNumber(financial_metrics['simulated']['total']['te'],false,false),
        //     "percent": "(" + Utils.percentageDifference(financial_metrics['simulated']['total']['te'],financial_metrics['base']['total']['te']) + "%)",
        //     "converted_difference": "(" + Utils.formatNumber(financial_metrics['simulated']['total']['te']-financial_metrics['base']['total']['te'],false,false) + ")",
        //     "arrow": financial_metrics['simulated']['total']['te'] > financial_metrics['base']['total']['te'] ?  'carret-up' : 'carret-down' ,
        //     "color": this.colorForDifference( financial_metrics['simulated']['total']['te'],financial_metrics['base']['total']['te'] )
        // }
        this.message3 = Utils.generateMessage3(this.trade_expense)
        this.te_lsv = this._generate_value(financial_metrics , 'te_percent_of_lsv' , false , true)
        // {
        //     "converted_base": Utils.formatNumber(financial_metrics['base']['total']['te_percent_of_lsv'],false,false),
        //     "converted_simulated": Utils.formatNumber(financial_metrics['simulated']['total']['te_percent_of_lsv'],false,false),
        //     "percent": "(" + Utils.percentageDifference(financial_metrics['simulated']['total']['te_percent_of_lsv'],financial_metrics['base']['total']['te_percent_of_lsv']) + "%)",
        //     "converted_difference": "(" + Utils.formatNumber(financial_metrics['simulated']['total']['te_percent_of_lsv']-financial_metrics['base']['total']['te_percent_of_lsv'],false,false) + ")",
        //     "arrow": financial_metrics['simulated']['total']['te_percent_of_lsv'] > financial_metrics['base']['total']['te_percent_of_lsv'] ?  'carret-up' : 'carret-down' ,
        //     "color": this.colorForDifference( financial_metrics['simulated']['total']['te_percent_of_lsv'],financial_metrics['base']['total']['te_percent_of_lsv'] )
        // }
        this.te_unit = this._generate_value(financial_metrics , 'te_per_unit' , false , false)
        // {
        //     "converted_base": Utils.formatNumber(financial_metrics['base']['total']['te_per_unit'],false,false),
        //     "converted_simulated": Utils.formatNumber(financial_metrics['simulated']['total']['te_per_unit'],false,false),
        //     "percent": "(" + Utils.percentageDifference(financial_metrics['simulated']['total']['te_per_unit'],financial_metrics['base']['total']['te_per_unit']) + "%)",
        //     "converted_difference": "(" + Utils.formatNumber(financial_metrics['simulated']['total']['te_per_unit']-financial_metrics['base']['total']['te_per_unit'],false,false) + ")",
        //     "arrow": financial_metrics['simulated']['total']['te_per_unit'] > financial_metrics['base']['total']['te_per_unit'] ?  'carret-up' : 'carret-down' ,
        //     "color": this.colorForDifference( financial_metrics['simulated']['total']['te_per_unit'],financial_metrics['base']['total']['te_per_unit'] )
        // }
        this.roi =this._generate_value(financial_metrics , 'roi' , false , false)
        //  {
        //     "converted_base": Utils.formatNumber(financial_metrics['base']['total']['roi'],false,false),
        //     "converted_simulated": Utils.formatNumber(financial_metrics['simulated']['total']['roi'],false,false),
        //     "percent": "(" + Utils.percentageDifference(financial_metrics['simulated']['total']['roi'],financial_metrics['base']['total']['roi']) + "%)",
        //     "converted_difference": "(" + Utils.formatNumber(financial_metrics['simulated']['total']['roi']-financial_metrics['base']['total']['roi'],false,false) + ")",
        //     "arrow": financial_metrics['simulated']['total']['roi'] > financial_metrics['base']['total']['roi'] ?  'carret-up' : 'carret-down' ,
        //     "color": this.colorForDifference(financial_metrics['base']['total']['roi'] , financial_metrics['simulated']['total']['roi'])
        // }
        this.asp = this._generate_value(financial_metrics , 'asp' , this.currency , false)
        // {
        //     "converted_base": Utils.formatNumber(financial_metrics['base']['total']['asp'],false,false),
        //     "converted_simulated": Utils.formatNumber(financial_metrics['simulated']['total']['asp'],false,false),
        //     "percent": "(" + Utils.percentageDifference(financial_metrics['simulated']['total']['asp'],financial_metrics['base']['total']['asp']) + "%)",
        //     "converted_difference": "(" + Utils.formatNumber(Math.round(financial_metrics['simulated']['total']['asp'])-Math.round(financial_metrics['base']['total']['asp']),false,false) + ")",
        //     "arrow": financial_metrics['simulated']['total']['asp'] > financial_metrics['base']['total']['asp'] ?  'carret-up' : 'carret-down' ,
        //     "color": this.colorForDifference(financial_metrics['base']['total']['asp'] , financial_metrics['simulated']['total']['asp'])
        // }
        this.promo_asp = this._generate_value(financial_metrics , 'avg_promo_selling_price' , this.currency , false)
        // {
        //     "converted_base": Utils.formatNumber(financial_metrics['base']['total']['avg_promo_selling_price'],false,false),
        //     "converted_simulated": Utils.formatNumber(financial_metrics['simulated']['total']['avg_promo_selling_price'],false,false),
        //     "percent": "(" + Utils.percentageDifference(financial_metrics['simulated']['total']['avg_promo_selling_price'],financial_metrics['base']['total']['avg_promo_selling_price']) + "%)",
        //     "converted_difference": "(" + Utils.formatNumber(Math.round(financial_metrics['simulated']['total']['avg_promo_selling_price'])-Math.round(financial_metrics['base']['total']['avg_promo_selling_price']),false,false) + ")",
        //     "arrow": financial_metrics['simulated']['total']['avg_promo_selling_price'] > financial_metrics['base']['total']['avg_promo_selling_price'] ?  'carret-up' : 'carret-down' ,
        //     "color": this.colorForDifference(financial_metrics['base']['total']['avg_promo_selling_price'] , financial_metrics['simulated']['total']['avg_promo_selling_price'])
        // }
        this.rst_w_o_vat = this._generate_value(financial_metrics , 'total_rsv_w_o_vat' , this.currency , false)
        // {
        //     "converted_base": Utils.formatNumber(financial_metrics['base']['total']['total_rsv_w_o_vat'],false,false),
        //     "converted_simulated": Utils.formatNumber(financial_metrics['simulated']['total']['total_rsv_w_o_vat'],false,false),
        //     "percent": "(" + Utils.percentageDifference(financial_metrics['simulated']['total']['total_rsv_w_o_vat'],financial_metrics['base']['total']['total_rsv_w_o_vat']) + "%)",
        //     "converted_difference": "(" + Utils.formatNumber(financial_metrics['simulated']['total']['total_rsv_w_o_vat']-financial_metrics['base']['total']['total_rsv_w_o_vat'],false,false) + ")",
        //     "arrow": financial_metrics['simulated']['total']['total_rsv_w_o_vat'] > financial_metrics['base']['total']['total_rsv_w_o_vat'] ?  'carret-up' : 'carret-down' ,
        //     "color": this.colorForDifference(financial_metrics['base']['total']['total_rsv_w_o_vat'] , financial_metrics['simulated']['total']['total_rsv_w_o_vat'])
        // }

        this.customer_margin = this._generate_value(financial_metrics , 'rp' , this.currency , false)
        // {
        //     "converted_base": Utils.formatNumber(financial_metrics['base']['total']['rp'],false,false),
        //     "converted_simulated": Utils.formatNumber(financial_metrics['simulated']['total']['rp'],false,false),
        //     "percent": "(" + Utils.percentageDifference(financial_metrics['simulated']['total']['rp'],financial_metrics['base']['total']['rp']) + "%)",
        //     "converted_difference": "(" + Utils.formatNumber(financial_metrics['simulated']['total']['rp']-financial_metrics['base']['total']['rp'],false,false) + ")",
        //     "arrow": financial_metrics['simulated']['total']['rp'] > financial_metrics['base']['total']['rp'] ?  'carret-up' : 'carret-down' ,
        //     "color": this.colorForDifference(financial_metrics['base']['total']['rp'] , financial_metrics['simulated']['total']['rp'])
        // }
        this.message2 = Utils.generateMessage2(this.customer_margin)

        this.randomResult = Utils.generateMessageRandom(this.index,financial_metrics,this.customer_margin,this.mac,this.trade_expense)
        this.customer_margin_rsv = this._generate_value(financial_metrics , 'rp_percent' ,false, true)
        // {
        //     "converted_base": Utils.formatNumber(financial_metrics['base']['total']['rp_percent'],false,false),
        //     "converted_simulated": Utils.formatNumber(financial_metrics['simulated']['total']['rp_percent'],false,false),
        //     "percent": "(" + Utils.percentageDifference(financial_metrics['simulated']['total']['rp_percent'],financial_metrics['base']['total']['rp_percent']) + "%)",
        //     "converted_difference": "(" + Utils.formatNumber(financial_metrics['simulated']['total']['rp_percent']-financial_metrics['base']['total']['rp_percent'],false,true) + ")",
        //     "arrow": financial_metrics['simulated']['total']['rp_percent'] > financial_metrics['base']['total']['rp_percent'] ?  'carret-up' : 'carret-down' ,
        //     "color": this.colorForDifference(financial_metrics['base']['total']['rp_percent'] , financial_metrics['simulated']['total']['rp_percent'])
        // }

        this.cogs = this._generate_value(financial_metrics , 'cogs' ,this.currency, false)
        // {
        //     "converted_base": Utils.formatNumber(financial_metrics['base']['total']['cogs'],true,false),
        //     "converted_simulated": Utils.formatNumber(financial_metrics['simulated']['total']['cogs'],true,false),
        //     "arrow": financial_metrics['simulated']['total']['cogs'] > financial_metrics['base']['total']['cogs'] ?  'carret-up' : 'carret-down' ,
        //     "percent": "(" + Utils.percentageDifference(financial_metrics['simulated']['total']['cogs'],financial_metrics['base']['total']['cogs']) + "%)",
        //     "converted_difference": "(" + Utils.formatNumber(financial_metrics['simulated']['total']['cogs']-financial_metrics['base']['total']['cogs'],true,false) + ")",
        //     "color":  this.colorForDifference(financial_metrics['base']['total']['cogs'] , financial_metrics['simulated']['total']['cogs']),
        // }

        this.lift_percent = this._generate_value(financial_metrics , 'lift' ,false, true)
        // {
        //     "converted_base": Utils.formatNumber(financial_metrics['base']['total']['lift'],false,true),
        //     "converted_simulated": Utils.formatNumber(financial_metrics['simulated']['total']['lift'],false,true),
        //     "arrow": financial_metrics['simulated']['total']['lift'] > financial_metrics['base']['total']['lift'] ?  'carret-up' : 'carret-down' ,
        //     "percent": "(" + Utils.percentageDifference(financial_metrics['simulated']['total']['lift'],financial_metrics['base']['total']['lift']) + "%)",
        //     "converted_difference": "(" + Utils.formatNumber(financial_metrics['simulated']['total']['lift']-financial_metrics['base']['total']['lift'],false,true) + ")",
        //     "color":  this.colorForDifference(financial_metrics['base']['total']['lift'] , financial_metrics['simulated']['total']['lift']),
        // }

        let data = financial_metrics;
        let weeks: number = data['base']['weekly'].length
        
            for(let i = 0; i < weeks; i++){
                let promotion_value = ''
                let promotion_value_simulated = ''
                if(this.tenant == "uk"){
                    promotion_value = data['base']['weekly'][i]['tactic']
                    promotion_value_simulated = data['simulated']['weekly'][i]['tactic']
                }
                else if(this.tenant == 'germany'){
                    promotion_value = Utils.genratePromotionGermany(
                    data['base']['weekly'][i]['promo_depth'],
                    data['base']['weekly'][i]['flag_promotype_leaflet'],
                    data['base']['weekly'][i]['flag_promotype_display'],
                    data['base']['weekly'][i]['flag_promotype_distribution_500'],
                   
                )
                    
                    promotion_value_simulated = Utils.genratePromotionGermany(
                    data['simulated']['weekly'][i]['promo_depth'],
                    data['simulated']['weekly'][i]['flag_promotype_leaflet'],
                    data['simulated']['weekly'][i]['flag_promotype_display'],
                    data['simulated']['weekly'][i]['flag_promotype_distribution_500'],
                     
                )
                     

                }
                // let holiday: string = null as any
                // if(this.optimizer_response.holiday.length > 0){
                //     for(let j = 0; j < this.optimizer_response.holiday.length; j++){
                //         if(this.optimizer_response.optimal[i][this.optimizer_response.holiday[j]] == 1){
                //             holiday = this.optimizer_response.holiday[j].split('_').map(capitalize).join(' ').replace("Flag ","");
                //         }
                //     }
                // }
                // let seasonality = ''
                // if(this.optimizer_response.optimal[i].SI){
                //     if(this.optimizer_response.optimal[i].SI < 0.95){
                //         seasonality = 'lowholidayweek'
                //     }
                //     else if(this.optimizer_response.optimal[i].SI < 1.05){
                //         seasonality = 'mediumholidayweek'
                //     }
                //     else{
                //         seasonality = 'highholidayweek'
                //     }
                // }
                // console.log(this.optimizer_response.optimal[i].SI,seasonality,"week season")

                let weekObj = {
                    'duration': {
                        'week':"Week "+(i+1),
                        'date': data['simulated']['weekly'][i].date,
                        'holiday': '',
                        // this.get_holiday_calendar(data['holiday_calendar'][i][i+1]),
                        // holiday,
                        'si': data['simulated']['weekly'][i].si
                    },
                    'promotions': {
                        'promotion_value' :  promotion_value
                        ,
                        'promotion_value_simulated':  promotion_value_simulated
                    },
                    'predicted_units': this._generate_value_weekly(data,i , 'predicted_units' , false,false),
                    // {
                    //     "converted_base": Utils.formatNumber(data['base']['weekly'][i]['predicted_units'],true,false),
                    //     "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['predicted_units'],true,false),
                    //     "arrow": data['simulated']['weekly'][i]['predicted_units'] > data['base']['weekly'][i]['predicted_units'] ?  'carret-up' : 'carret-down' ,
                    //     "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['predicted_units'],data['base']['weekly'][i]['predicted_units']) + "%)",
                    //     "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['predicted_units']-data['base']['weekly'][i]['predicted_units'],true,false) + ")",
                    //     "color":  this.colorForDifference(data['base']['weekly'][i]['predicted_units'] , data['simulated']['weekly'][i]['predicted_units']),
                    // },
                    'base_unit': this._generate_value_weekly(data,i , 'base_unit' , false,false),
                    // {
                    //     "converted_base": Utils.formatNumber(data['base']['weekly'][i]['base_unit'],true,false),
                    //     "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['base_unit'],true,false),
                    //     "arrow": data['simulated']['weekly'][i]['base_unit'] > data['base']['weekly'][i]['base_unit'] ?  'carret-up' : 'carret-down' ,
                    //     "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['base_unit'],data['base']['weekly'][i]['base_unit']) + "%)",
                    //     "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['base_unit']-data['base']['weekly'][i]['base_unit'],true,false) + ")",
                    //     "color":  this.colorForDifference(data['base']['weekly'][i]['base_unit'] , data['simulated']['weekly'][i]['base_unit']),
                    // },
                    'incremental_unit':this._generate_value_weekly(data,i , 'incremental_unit' , false,false),
                    //  {
                    //     "converted_base": Utils.formatNumber(data['base']['weekly'][i]['incremental_unit'],true,false),
                    //     "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['incremental_unit'],true,false),
                    //     "arrow": data['simulated']['weekly'][i]['incremental_unit'] > data['base']['weekly'][i]['incremental_unit'] ?  'carret-up' : 'carret-down' ,
                    //     "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['incremental_unit'],data['base']['weekly'][i]['incremental_unit']) + "%)",
                    //     "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['incremental_unit']-data['base']['weekly'][i]['incremental_unit'],true,false) + ")",
                    //     "color":  this.colorForDifference(data['base']['weekly'][i]['incremental_unit'] , data['simulated']['weekly'][i]['incremental_unit']),
                    // },
                    'total_weight_in_tons': this._generate_value_weekly(data,i , 'total_weight_in_tons' , false,false),
                    // {
                    //     "converted_base": Utils.formatNumber(data['base']['weekly'][i]['total_weight_in_tons'],true,false),
                    //     "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['total_weight_in_tons'],true,false),
                    //     "arrow": data['simulated']['weekly'][i]['total_weight_in_tons'] > data['base']['weekly'][i]['total_weight_in_tons'] ?  'carret-up' : 'carret-down' ,
                    //     "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['total_weight_in_tons'],data['base']['weekly'][i]['total_weight_in_tons']) + "%)",
                    //     "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['total_weight_in_tons']-data['base']['weekly'][i]['total_weight_in_tons'],true,false) + ")",
                    //     "color":  this.colorForDifference(data['base']['weekly'][i]['total_weight_in_tons'] , data['simulated']['weekly'][i]['total_weight_in_tons']),
                    // },
                    'total_lsv': this._generate_value_weekly(data,i , 'total_lsv' , this.currency,false),
                    // {
                    //     "converted_base": Utils.formatNumber(data['base']['weekly'][i]['total_lsv'],true,false),
                    //     "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['total_lsv'],true,false),
                    //     "arrow": data['simulated']['weekly'][i]['total_lsv'] > data['base']['weekly'][i]['total_lsv'] ?  'carret-up' : 'carret-down' ,
                    //     "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['total_lsv'],data['base']['weekly'][i]['total_lsv']) + "%)",
                    //     "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['total_lsv']-data['base']['weekly'][i]['total_lsv'],true,false) + ")",
                    //     "color":  this.colorForDifference(data['base']['weekly'][i]['total_lsv'] , data['simulated']['weekly'][i]['total_lsv']),
                    // },
                    'total_nsv': this._generate_value_weekly(data,i , 'total_nsv' , this.currency,false),
                    // {
                    //     "converted_base": Utils.formatNumber(data['base']['weekly'][i]['total_nsv'],true,false),
                    //     "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['total_nsv'],true,false),
                    //     "arrow": data['simulated']['weekly'][i]['total_nsv'] > data['base']['weekly'][i]['total_nsv'] ?  'carret-up' : 'carret-down' ,
                    //     "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['total_nsv'],data['base']['weekly'][i]['total_nsv']) + "%)",
                    //     "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['total_nsv']-data['base']['weekly'][i]['total_nsv'],true,false) + ")",
                    //     "color":  this.colorForDifference(data['base']['weekly'][i]['total_nsv'] , data['simulated']['weekly'][i]['total_nsv']),
                    // },
                    'mars_mac_percent_of_nsv': this._generate_value_weekly(data,i , 'mars_mac_percent_of_nsv' , false,true),
                    // {
                    //     "converted_base": Utils.formatNumber(data['base']['weekly'][i]['mars_mac_percent_of_nsv'],true,false),
                    //     "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['mars_mac_percent_of_nsv'],true,false),
                    //     "arrow": data['simulated']['weekly'][i]['mars_mac_percent_of_nsv'] > data['base']['weekly'][i]['mars_mac_percent_of_nsv'] ?  'carret-up' : 'carret-down' ,
                    //     "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['mars_mac_percent_of_nsv'],data['base']['weekly'][i]['mars_mac_percent_of_nsv']) + "%)",
                    //     "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['mars_mac_percent_of_nsv']-data['base']['weekly'][i]['mars_mac_percent_of_nsv'],true,false) + ")",
                    //     "color":  this.colorForDifference(data['base']['weekly'][i]['mars_mac_percent_of_nsv'] , data['simulated']['weekly'][i]['mars_mac_percent_of_nsv']),
                    // },
                    'trade_expense': this._generate_value_weekly(data,i , 'trade_expense' , this.currency,false),
                    // {
                    //     "converted_base": Utils.formatNumber(data['base']['weekly'][i]['trade_expense'],true,false),
                    //     "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['trade_expense'],true,false),
                    //     "arrow": data['simulated']['weekly'][i]['trade_expense'] > data['base']['weekly'][i]['trade_expense'] ?  'carret-up' : 'carret-down' ,
                    //     "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['trade_expense'],data['base']['weekly'][i]['trade_expense']) + "%)",
                    //     "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['trade_expense']-data['base']['weekly'][i]['trade_expense'],true,false) + ")",
                    //     "color":  this.colorForDifference(data['simulated']['weekly'][i]['trade_expense'],data['base']['weekly'][i]['trade_expense'] ),
                    // },
                    'te_percent_of_lsv': this._generate_value_weekly(data,i , 'te_percent_of_lsv' , false,true),
                    // {
                    //     "converted_base": Utils.formatNumber(data['base']['weekly'][i]['te_percent_of_lsv'],true,false),
                    //     "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['te_percent_of_lsv'],true,false),
                    //     "arrow": data['simulated']['weekly'][i]['te_percent_of_lsv'] > data['base']['weekly'][i]['te_percent_of_lsv'] ?  'carret-up' : 'carret-down' ,
                    //     "color": this.colorForDifference(data['simulated']['weekly'][i]['te_percent_of_lsv'],data['base']['weekly'][i]['te_percent_of_lsv']),
                    //     "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['te_percent_of_lsv'],data['base']['weekly'][i]['te_percent_of_lsv']) + "%)",
                    //     "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['te_percent_of_lsv']-data['base']['weekly'][i]['te_percent_of_lsv'],true,false) + ")"
                    // },
                    'lift_percent': this._generate_value_weekly(data,i , 'lift' , false,false),
                    // {
                    //     "converted_base": Utils.formatNumber(data['base']['weekly'][i]['lift'],true,false),
                    //     "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['lift'],true,false),
                    //     "arrow": data['simulated']['weekly'][i]['lift'] > data['base']['weekly'][i]['lift'] ?  'carret-up' : 'carret-down' ,
                    //     "color": this.colorForDifference(data['base']['weekly'][i]['lift'] , data['simulated']['weekly'][i]['lift']),
                    //     "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['lift'],data['base']['weekly'][i]['lift']) + "%)",
                    //     "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['lift']-data['base']['weekly'][i]['lift'],true,false) + ")"
                    // },
                    'roi': this._generate_value_weekly(data,i , 'roi' , false,false),
                    // {
                    //     "converted_base": Utils.formatNumber(data['base']['weekly'][i]['roi'],true,false),
                    //     "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['roi'],true,false),
                    //     "arrow": data['simulated']['weekly'][i]['roi'] > data['base']['weekly'][i]['roi'] ?  'carret-up' : 'carret-down' ,
                    //     "color": this.colorForDifference(data['base']['weekly'][i]['roi'] , data['simulated']['weekly'][i]['roi']),
                    //     "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['roi'],data['base']['weekly'][i]['roi']) + "%)",
                    //     "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['roi']-data['base']['weekly'][i]['roi'],true,false) + ")"
                    // },
                    'promo_asp': this._generate_value_weekly(data,i , 'promo_asp' , this.currency,false),
                    // {
                    //     "converted_base": Utils.formatNumber(data['base']['weekly'][i]['promo_asp'],true,false),
                    //     "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['promo_asp'],true,false),
                    //     "arrow": data['simulated']['weekly'][i]['promo_asp'] > data['base']['weekly'][i]['promo_asp'] ?  'carret-up' : 'carret-down' ,
                    //     "color": this.colorForDifference(data['base']['weekly'][i]['promo_asp'] , data['simulated']['weekly'][i]['promo_asp']),
                    //     "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['promo_asp'],data['base']['weekly'][i]['promo_asp']) + "%)",
                    //     "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['promo_asp']-data['base']['weekly'][i]['promo_asp'],true,false) + ")"
                    // },
                    'asp': this._generate_value_weekly(data,i , 'asp' , this.currency,false),
                    // {
                    //     "converted_base": Utils.formatNumber(data['base']['weekly'][i]['asp'],true,false),
                    //     "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['asp'],true,false),
                    //     "arrow": data['simulated']['weekly'][i]['asp'] > data['base']['weekly'][i]['asp'] ?  'carret-up' : 'carret-down' ,
                    //     "color":  this.colorForDifference(data['base']['weekly'][i]['asp'] , data['simulated']['weekly'][i]['asp']),
                    //     "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['asp'],data['base']['weekly'][i]['asp']) + "%)",
                    //     "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['asp']-data['base']['weekly'][i]['asp'],true,false) + ")"
                    // },
                    'te_per_units': this._generate_value_weekly(data,i , 'te_per_units' , false,false),
                    // {
                    //     "converted_base": Utils.formatNumber(data['base']['weekly'][i]['te_per_units'],true,false),
                    //     "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['te_per_units'],true,false),
                    //     "arrow": data['simulated']['weekly'][i]['te_per_units'] > data['base']['weekly'][i]['te_per_units'] ?  'carret-up' : 'carret-down' ,
                    //     "color":  this.colorForDifference( data['simulated']['weekly'][i]['te_per_units'],data['base']['weekly'][i]['te_per_units'] ),
                    //     "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['te_per_units'],data['base']['weekly'][i]['te_per_units']) + "%)",
                    //     "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['te_per_units']-data['base']['weekly'][i]['te_per_units'],true,false) + ")"
                    // },
                    'total_rsv_w_o_vat': this._generate_value_weekly(data,i , 'total_rsv_w_o_vat' , this.currency,false),
                    // {
                    //     "converted_base": Utils.formatNumber(data['base']['weekly'][i]['total_rsv_w_o_vat'],true,false),
                    //     "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['total_rsv_w_o_vat'],true,false),
                    //     "arrow": data['simulated']['weekly'][i]['total_rsv_w_o_vat'] > data['base']['weekly'][i]['total_rsv_w_o_vat'] ?  'carret-up' : 'carret-down' ,
                    //     "color":  this.colorForDifference(data['base']['weekly'][i]['total_rsv_w_o_vat'] , data['simulated']['weekly'][i]['total_rsv_w_o_vat']),
                    //     "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['total_rsv_w_o_vat'],data['base']['weekly'][i]['total_rsv_w_o_vat']) + "%)",
                    //     "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['total_rsv_w_o_vat']-data['base']['weekly'][i]['total_rsv_w_o_vat'],true,false) + ")"
                    // },
                    'retailer_margin': this._generate_value_weekly(data,i , 'retailer_margin' , this.currency,false),
                    // {
                    //     "converted_base": Utils.formatNumber(data['base']['weekly'][i]['retailer_margin'],true,false),
                    //     "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['retailer_margin'],true,false),
                    //     "arrow": data['simulated']['weekly'][i]['retailer_margin'] > data['base']['weekly'][i]['retailer_margin']  ?  'carret-up' : 'carret-down' ,
                    //     "color":  this.colorForDifference(data['base']['weekly'][i]['retailer_margin'] , data['simulated']['weekly'][i]['retailer_margin']),
                    //     "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['retailer_margin'],data['base']['weekly'][i]['retailer_margin']) + "%)",
                    //     "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['retailer_margin']-data['base']['weekly'][i]['retailer_margin'],true,false) + ")"
                    // },
                    'retailer_margin_percent_of_rsp': this._generate_value_weekly(data,i , 'retailer_margin_percent_of_rsp' , false,false),
                    // {
                    //     "converted_base": Utils.formatNumber(data['base']['weekly'][i]['retailer_margin_percent_of_rsp'],true,false),
                    //     "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['retailer_margin_percent_of_rsp'],true,false),
                    //     "arrow":data['simulated']['weekly'][i]['retailer_margin_percent_of_rsp'] > data['base']['weekly'][i]['retailer_margin_percent_of_rsp'] ?  'carret-up' : 'carret-down' ,
                    //     "color":  this.colorForDifference(data['base']['weekly'][i]['retailer_margin_percent_of_rsp'] , data['simulated']['weekly'][i]['retailer_margin_percent_of_rsp']),
                    //     "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['retailer_margin_percent_of_rsp'],data['base']['weekly'][i]['retailer_margin_percent_of_rsp']) + "%)",
                    //     "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['retailer_margin_percent_of_rsp']-data['base']['weekly'][i]['retailer_margin_percent_of_rsp'],true,false) + ")"
                    // },
                }
                this.weeklyData.push(weekObj)
            }
            console.log(this.weeklyData)
    }

    weeklySubTabClick(key : string){
        if(key == 'Absolute'){
            this.weeklyTab = {
                "absolute": 'selected',
                "percent": 'unselected'
            }
            this.activeWeeklyTab = "absolute"
        }
        else {
            this.weeklyTab = {
                "absolute": 'unselected',
                "percent": 'selected'
            }
            this.activeWeeklyTab = "percent"
        }
    }

    @ViewChild('weekly', { static: false }) weekly: any;
    scrolling_table: any;

    ngAfterViewInit() {
        // this.slider = this.elRef.nativeElement.querySelector('.slide');
        this.scrolling_table = this.elRef.nativeElement.querySelector('.weeklyOptimizertable');
        this.scrolling_table.addEventListener('scroll', this.freeze_pane_listener(this.scrolling_table));
    }

    onChange(deviceValue: any,type: any) {
        if(type == 'base'){
            this.baselineCalDropdown = deviceValue.target.value
            if(this.baselineCalDropdown == 'roi'){
                this.baselineChartLegend = 'ROI';
            }
            else if(this.baselineCalDropdown == 'lift'){
                this.baselineChartLegend = 'Lift %';
            }
            else if(this.baselineCalDropdown == 'asp'){
                this.baselineChartLegend = 'ASP';
            }
            // else if(this.baselineCalDropdown == 'si'){
            //     this.baselineChartLegend = 'Seasonality Index';
            // }
        }
        else if(type == 'stimulated'){
            this.stimulatedCalDropdown = deviceValue.target.value
            if(this.stimulatedCalDropdown == 'roi'){
                this.stimulatedChartLegend = 'ROI';
            }
            else if(this.stimulatedCalDropdown == 'lift'){
                this.stimulatedChartLegend = 'Lift %';
            }
            else if(this.stimulatedCalDropdown == 'asp'){
                this.stimulatedChartLegend = 'ASP';
            }
            // else if(this.stimulatedCalDropdown == 'si'){
            //     this.stimulatedChartLegend = 'Seasonality Index';
            // }
        }
    }

    colorForDifference(base:any, simulated:any){
        if(simulated > base){
            return 'green'
        }
        else if(simulated < base){
            return 'red'
        }
        else if(base == simulated){
            return 'neutral'
        }
        return 'green'
    }

    convertToFormat(value: any){
        let a = new Date(value),
        year = a.getFullYear(),
        month_no = a.getMonth() + 1,
        months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        month = months[a.getMonth()],
        day:any = a.getDate()
        let obj = {
            date : year +'-'+ month_no + '-' + day,
            month : month,
            year : year,
            day : day
        }
        return obj
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

    openTab = 1;
    toggleTabs($tabNumber: number): void {
        this.openTab = $tabNumber;
    }

    openModal(id: string){
        this.modalService.open(id)
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}