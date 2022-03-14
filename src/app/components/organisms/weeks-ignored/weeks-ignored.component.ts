import { Component,EventEmitter,Input, OnInit,Output,SimpleChanges } from '@angular/core';
import { ProductWeek } from '@core/models';
import * as utils from "@core/utils"

@Component({
    selector: 'nwn-weeks-ignored',
    templateUrl: './weeks-ignored.component.html',
    styleUrls: ['./weeks-ignored.component.css'],
})
export class WeeksIgnoredComponent {

    @Input()
    quarter_year = []
    @Input()
    product_week:ProductWeek[] = []
    @Output()
    ignoredWeekEvent = new EventEmitter()
    @Input()
    cumpulsory_week_val:Array<any> = []
    selected_product_week:ProductWeek[] = []
    selected_quarter:string = ''
    weekly_map:Array<any> = [] //{"selected_promotion" : $event.value , "week" : this.product_week 
    @Input()
    week_validation:any;
    error:string = null as any
    ngOnInit(){
        
       
    }
    apply(){
    //     if(this.weekly_map.length > 0){
    //     let ignored_week_list = this.weekly_map.map(d=>d.week)
    //     let compulsory_week_list = this.cumpulsory_week_val.map(d=>d.week).sort(function(a, b){return a - b})
    //     // let min_compulsory = 
    //     console.log(compulsory_week_list , "compulsory week list")
    //     console.log(ignored_week_list , "compulsory week list")
    //     let con = utils.generate_consecutive_list_max_diff(compulsory_week_list)
    //     console.log(con , "consecutive")
    //     let min_gap = this.week_validation['min_consecutive_promo'] > 0 ? this.week_validation['min_consecutive_promo'] : this.week_validation['max_consecutive_promo']
    //     let not_all =utils.calculate_not_allowed_array(con['consecutive'],min_gap)
    //     console.log(not_all , "nnot allowed arrayss")
    //     for(let i=0;i<ignored_week_list.length ; i++){
    //         if(not_all.includes(ignored_week_list[i])){
    //             console.log("first error")
    //             this.error = "Gap between ignored week and compulsory week should be greater than or equal to minimum consecutive promotions ("+min_gap+")"
    //             return 
    //         }
    //     }
    //     this.error =null as any
       
    //     // console.log(not_all , "nnot allowed arrayss")
    //     let sortedweek =[...ignored_week_list].sort(function(a, b){return a - b})
        
    //     console.log(sortedweek , "sorted weekvalue")
    //     // console.log(min_gap , "user input mingap")
    //     let min_diff = utils.generate_consecutive_list_max_diff(sortedweek)
    //     console.log(min_diff , "min diff calculated")
    //     // console.log(utils.check_validate_gap(min_gap,min_diff['min_diff'] ) , "is valid")
    //     if(!utils.check_validate_gap(min_gap,min_diff['min_diff'] )){
    //         console.log("second error")
    //         this.error = "Gap between ignored week and compulsory week should be greater than or equal to minimum consecutive promotions ("+min_gap+")"
    //         return 
            
    //     }
    //     this.error = null as any
        
    // }

        this.ignoredWeekEvent.emit({
            "id" : "weeks-ignored",
            "value" : this.weekly_map
        })

    }
    
    clickWeekly(product){
        if(this.cumpulsory_week_val.find(d=>d.week == product.week)){
            return

        }
         
        if(this.weekly_map.find(d=>d.week == product.week)){
            this.weekly_map = this.weekly_map.filter(d=>d.week!=product.week)
        }
        else{
            
            this.weekly_map = [...this.weekly_map, product];

        }
         
        
    }
    filter_product_week(){
        this.selected_product_week  = this.product_week.filter(data=>data.quater == parseInt(
            this.selected_quarter.split("Q")[1]
            )
            ).sort((a,b)=>(a.week > b.week) ? 1 : ((b.week > a.week) ? -1 : 0))

            // console.log(this.selected_product_week , "selected product week")

    }
    changeQuarter(key:string){
        
        // debugger
        this.selected_quarter = key
        this.selected_product_week  = this.product_week.filter(data=>data.quater == parseInt(
            this.selected_quarter.split("Q")[1]
            )
            ).sort((a,b)=>(a.week > b.week) ? 1 : ((b.week > a.week) ? -1 : 0))
    }
    ngOnChanges(changes: SimpleChanges) {
//  console.log(changes , "changes in compusory weeks")
        for (let property in changes) {
            if (property === 'quarter_year') {
                // console.log(changes[property].currentValue , "current value")
                this.weekly_map = []
                this.quarter_year = changes[property].currentValue
                this.selected_quarter=this.quarter_year[0]
               
            } 
            if (property === 'product_week') {
                // console.log(changes[property].currentValue , "current value")
                this.product_week = changes[property].currentValue
                this.filter_product_week()
               
            } 
        }
    }

}
