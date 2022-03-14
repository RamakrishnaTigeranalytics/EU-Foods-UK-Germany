import { Component, EventEmitter, Input, OnInit,Output,SimpleChanges } from '@angular/core';
import { ProductWeek } from '@core/models';
import * as utils from "@core/utils"

@Component({
    selector: 'nwn-compulsory-weeks-popup',
    templateUrl: './compulsory-weeks-popup.component.html',
    styleUrls: ['./compulsory-weeks-popup.component.css'],
})
export class CompulsoryWeeksPopupComponent implements OnInit {

    @Input()
    quarter_year = []
    @Input()
    product_week:ProductWeek[] = []
    @Output()
    cumpulsoryWeekEvent = new EventEmitter()
    @Input()
    ignored_week_val:Array<any> = []
    @Input()
    week_validation:any;
    selected_product_week:ProductWeek[] = []
    selected_quarter:string = ''
    weekly_map:Array<any> = [] //{"selected_promotion" : $event.value , "week" : this.product_week }
    error:string=null as any
    ngOnInit(){
        
       
    }
    apply(){
        if(this.weekly_map.length > 0){
        // console.log(this.weekly_map.map(d=>d.week).sort(function(a, b){return a - b}) , "week list arry")
        
        let max_diff =utils.generate_consecutive_list_max_diff(this.weekly_map.map(d=>d.week).sort(function(a, b){return a - b}))
        // console.log(this.week_validation['min_promo_gap'] , "min promogap")
        // console.log(max_diff , "maxdiff")
        let min_gap = this.week_validation['min_promo_gap'] > 0 ? this.week_validation['min_promo_gap'] : this.week_validation['max_promo_gap']
        // console.log(min_gap, "min gap")
        if(!utils.check_validate_gap(min_gap , max_diff['min_diff'])){
            this.error = "Gap between consecutive weeks should be greater or equal to minimum promo gap("+min_gap+")"
            return 

        }
        if(max_diff['max_len_consecutive'] > this.week_validation['max_consecutive_promo']){
            this.error = "Consecutive week should not exceed maximum consecutive week("+this.week_validation['max_consecutive_promo']+")"
            return 
        }
        if(this.weekly_map.length > this.week_validation['promo_max']){
            this.error = "Length of the promotion should not be greater than maximum available promotion("+this.week_validation['promo_max']+")"
            return 
        }
        this.error = null as any
         
    }
        this.cumpulsoryWeekEvent.emit({
            "id" : "compulsory-weeks-popup",
            "value" : this.weekly_map
        })
0
    }
    
    clickWeekly(product){
        if(this.ignored_week_val.find(d=>d.week == product.week)){
            return

        }
        if(this.weekly_map.find(d=>d.week == product.week)){
            this.weekly_map = this.weekly_map.filter(d=>d.week!=product.week)
        }
        else{
            // this.weekly_map.push(product)
            this.weekly_map = [...this.weekly_map, product];

        }
        
        // console.log(this.weekly_map , "week ly map")
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
                this.quarter_year = changes[property].currentValue
                this.selected_quarter=this.quarter_year[0]
               
            } 
            if (property === 'product_week') {
                // console.log(changes[property].currentValue , "current value")
                this.weekly_map = []
                this.product_week = changes[property].currentValue
                this.filter_product_week()
               
            } 
            if (property === 'week_validation') {
                //  console.log(this.week_validation , "week validation")
               
            } 
        }
        // console.log(this.weekly_map , "weekly map in cumpolsory........................................................")
        // console.log(this.week_validation , "week validation")
        // console.log(this.product_week , "product week")
        
    }
}
