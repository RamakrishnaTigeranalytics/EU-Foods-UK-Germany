import { Component,OnInit } from '@angular/core';
import {OptimizerService} from '../../../core/services/optimizer.service'
import {ProductWeek} from "../../../core/models"
@Component({
    selector: 'nwn-loaded-scenario-expand',
    templateUrl: './loaded-scenario-expand.component.html',
    styleUrls: ['./loaded-scenario-expand.component.css'],
})
export class LoadedScenarioExpandComponent implements OnInit{
    product_week:ProductWeek[] = [];
    genobj : {[key:string] : any[]  } = {}
    quarter_year:Array<string> = [];
    selected_quarter:string = ''
    selected_product_week : ProductWeek[] = []

    constructor(private optimize : OptimizerService){

    }
    ngOnInit(): void {
        
    //     this.optimize.fetch_week_value(358).subscribe(data=>{
    //         console.log(data , "weekly data")
    //         this.product_week = data
    //         this.product_week.forEach(data=>{
    //             // this.quarter_year.push('')
    //             let str = "Y" + 1 + " Q"+data.quater as string
    //             if(str in this.genobj){
    //                 this.genobj[str].push(data)
    //                 // append(data)
    //             }
    //             else{
    //                 this.quarter_year.unshift(str);
    //                 this.genobj[str] = [data]
    //             }

    //         })
    //         this.selected_quarter = this.quarter_year[0]
    //         this.selected_product_week  = this.product_week.filter(data=>data.quater == parseInt(
    //             this.selected_quarter.split("Q")[1]
    //             )
    //             ).sort((a,b)=>(a.week > b.week) ? 1 : ((b.week > a.week) ? -1 : 0))
    //         console.log(this.genobj , "gen obj")
           
    //       },error=>{
    //         console.log(error , "error")
    //       })

    // }
    // changeQuarter(key:string){
        
        // debugger
    //     this.selected_quarter = key
    //     this.selected_product_week  = this.product_week.filter(data=>data.quater == parseInt(
    //         this.selected_quarter.split("Q")[1]
    //         )
    //         ).sort((a,b)=>(a.week > b.week) ? 1 : ((b.week > a.week) ? -1 : 0))
    }
}
