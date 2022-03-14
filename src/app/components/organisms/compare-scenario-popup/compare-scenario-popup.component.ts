import { Component, OnInit, HostListener, Input,OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ModalService } from '@molecules/modal/modal.service';
// import {OptimizerService ,} from '../../../core/services/optimizer.service'
import {OptimizerService , PricingService} from "@core/services"
import { LoadedScenarioModel } from 'src/app/core/models';
import { Observable, of, from, BehaviorSubject, combineLatest ,Subject} from 'rxjs';
import {takeUntil} from "rxjs/operators"
import * as FileSaver from 'file-saver';
import { color } from 'd3';

@Component({
    selector: 'nwn-compare-scenario-popup',
    templateUrl: './compare-scenario-popup.component.html',
    styleUrls: ['./compare-scenario-popup.component.css'],
})


export class CompareScenarioPopupComponent implements OnInit,OnDestroy {
    pricing = false
    private unsubscribe$: Subject<any> = new Subject<any>();

    CompareScenarioChartData:any = []
    legendColors:any = ['#0000a0','#00d7b9','#ffdc00','#a6db00','#9600ff','#ff32a0','#ff3c14','#ff8200']
    constructor(private _location: Location,private modal : ModalService , private optimizer : OptimizerService,
        private pricingService : PricingService
        ) {
            this.CompareScenarioChartData = []
        }

    public screenWidth: any;
    public screenHeight: any;
    loaded_scenario : Array<LoadedScenarioModel | any> = []
    compare_scenario_data:any = []
    legendNames:any = []
    @Input()
    currency

    @Input()
    tenant
    // length_compare = 0
    ngOnInit(): void {
        this.optimizer.getCompareScenarioObservable().pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(data=>{
            
            if(data.length > 0){
                this.pricing = false
                this.compare_scenario_data = data
               
                
                this.modal.open('compare-scenario-popup')
                //console.log(data , "comparescenario datas")
                    this.loaded_scenario = data
                    this.CompareScenarioChartData = []
                    this.legendNames = []
                    if(this.loaded_scenario.length > 0){
                        this.CompareScenarioChartData = [
                            { "group": "RSV"}, 
                            { "group": "Customer Margin"},
                            { "group": "LSV"},
                            { "group": "Trade Expense"},
                            { "group": "NSV"},
                            { "group": "COGS"},
                            { "group": "MAC"}, 
                        ]
                        for(let i = 0; i < this.loaded_scenario.length; i++){
                            this.legendNames.push({'name': this.loaded_scenario[i].scenario_name,'color': this.legendColors[i]})
                            let key:any = 'simulated_'+JSON.stringify(i+1)
                            this.CompareScenarioChartData[0][key] = this.loaded_scenario[i]['simulated']['total']['total_rsv_w_o_vat']
                            this.CompareScenarioChartData[1][key] = this.loaded_scenario[i]['simulated']['total']['rp']
                            this.CompareScenarioChartData[2][key] = this.loaded_scenario[i]['simulated']['total']['lsv']
                            this.CompareScenarioChartData[3][key] = this.loaded_scenario[i]['simulated']['total']['te']
                            this.CompareScenarioChartData[4][key] = this.loaded_scenario[i]['simulated']['total']['nsv']
                            this.CompareScenarioChartData[5][key] = this.loaded_scenario[i]['simulated']['total']['cogs']
                            this.CompareScenarioChartData[6][key] = this.loaded_scenario[i]['simulated']['total']['mac']
                        }
                    }
                  
            }
            else {
                //console.log("else")
                this.modal.close('compare-scenario-popup')
                // this.loaded_scenario = [...this.loaded_scenario , ...[]]
                //console.log(this.loaded_scenario,"after else")
            }
            
           
        })
        this.pricingService.getCompareScenarioPriceObservable().pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(data=>{
            //console.log(data , "pricing compare scenario data")
            if(data.length > 0){
                this.pricing = true
                this.modal.open('compare-scenario-popup')
                this.compare_scenario_data = data


                
               
                
                this.modal.open('compare-scenario-popup')
                //console.log(data , "comparescenario datas")
                    this.loaded_scenario = data
                    this.CompareScenarioChartData = []
                    this.legendNames = []
                    // debugger;
                    if(this.loaded_scenario.length > 0){
                        // debugger
                        this.CompareScenarioChartData = [
                            { "group": "RSV"}, 
                            { "group": "Customer Margin"},
                            { "group": "GSV"},
                            { "group": "Trade Expense"},
                            { "group": "NSV"},
                            { "group": "COGS"},
                            { "group": "MAC"}, 
                        ]
                        
                        for(let i = 0; i < this.loaded_scenario.length; i++){
                            // debugger
                            // return [
                            //     rsv_base , rsv_sim , rp_base ,rp_sim , lsv_base , lsv_sim , te_base , te_sim,
                            //     nsv_base , nsv_sim , cogs_base,cogs_sim,mac_base , mac_sim,
                            
                            // ]
                           
                            let dArray = this.getAggreated(this.loaded_scenario[i])
                            this.legendNames.push({'name': this.loaded_scenario[i]['scenario_name'],'color': this.legendColors[i]})
                            let key:any = 'simulated_'+JSON.stringify(i+1)
                            this.CompareScenarioChartData[0][key] = dArray[1]
                            this.CompareScenarioChartData[1][key] = dArray[3] 
                            this.CompareScenarioChartData[2][key] = dArray[5] 
                            this.CompareScenarioChartData[3][key] = dArray[7]
                            this.CompareScenarioChartData[4][key] = dArray[9] 
                            this.CompareScenarioChartData[5][key] = dArray[11] 
                            this.CompareScenarioChartData[6][key] = dArray[13]  
                        }
                    }

            }
            else{
                this.modal.close('compare-scenario-popup')

            }
           
        })

        
        
        this.screenWidth = window.innerWidth - 2;
        this.screenHeight = window.innerHeight;
        //console.log(this.screenWidth,this.screenHeight)
    }
    getAggreated(data){
        
        let base_predicted = 0
                let simulated_prediced = 0
                let inc_base = 0
                let inc_sim = 0
                let rsv_base , rsv_sim , rp_base ,rp_sim , lsv_base , lsv_sim , te_base , te_sim,
                    nsv_base , nsv_sim , cogs_base,cogs_sim,mac_base , mac_sim;
                rsv_base = rsv_sim = rp_base =rp_sim = lsv_base = lsv_sim = te_base = te_sim=
                    nsv_base = nsv_sim = cogs_base=cogs_sim=mac_base = mac_sim= 0
                    //console.log(data.base)
                    // debugger
                data.base.forEach((d , i)=>{
                    // debugger
                  
                    base_predicted+=parseFloat(data.base[i].total.units)
                    simulated_prediced+=parseFloat(data.simulated[i].total.units)
                    inc_base+=parseFloat(data.base[i].total.increment_units)
                    inc_sim+=parseFloat(data.simulated[i].total.increment_units)
                    rsv_base+=parseFloat(data.base[i].total.total_rsv_w_o_vat)
                    rsv_sim+=parseFloat(data.simulated[i].total.total_rsv_w_o_vat)
                    rp_base+=parseFloat(data.base[i].total.rp)
                    rp_sim+=parseFloat(data.simulated[i].total.rp)
                    lsv_base+=parseFloat(data.base[i].total.lsv)
                    lsv_sim+=parseFloat(data.simulated[i].total.lsv)
                    te_base+=parseFloat(data.base[i].total.te)
                    te_sim+=parseFloat(data.simulated[i].total.te)
                    nsv_base+=parseFloat(data.base[i].total.nsv)
                    nsv_sim+=parseFloat(data.simulated[i].total.nsv)
                    cogs_base+=parseFloat(data.base[i].total.cogs)
                    cogs_sim+=parseFloat(data.simulated[i].total.cogs)
                    mac_base+=parseFloat(data.base[i].total.mac)
                    mac_sim+=parseFloat(data.simulated[i].total.mac)
        
        
                })
                return [
                    rsv_base , rsv_sim , rp_base ,rp_sim , lsv_base , lsv_sim , te_base , te_sim,
                    nsv_base , nsv_sim , cogs_base,cogs_sim,mac_base , mac_sim
                ]
    }
    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
    downloadExcel(){
        let obs$:any;
        //console.log(this.pricing , "pricing")
        if(this.compare_scenario_data.length > 0){
            
           
            if(this.pricing){
                obs$ = this.optimizer.downloadCompareScenarioExcelPricing(this.compare_scenario_data)
            }
            else{
                obs$ = this.optimizer.downloadCompareScenarioExcel(this.compare_scenario_data)
            }
            obs$.subscribe((data: any) => {
                const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
            
                FileSaver.saveAs(
                    blob,
                    'CompareScenario' + '_Export_' + new Date().getTime() + 'xlsx'
                  );
            })
        }
    }
    openTab = 1;
    deleteCompareEvent($event){
        console.log("deleting event " , $event.id)
        if(this.pricing){
            this.pricingService.deleteCompareScenario($event.id)

        }
        else{
            this.optimizer.deleteCompareScenario($event.id)
        }
       
      
    }
    toggleTabs($tabNumber: number): void {
        this.openTab = $tabNumber;
    }
    openAdd(){
        if(this.pricing){
            
            this.modal.close('compare-scenario-popup')
            this.modal.open('compare-pricing-scenario')
        }
        else{
            this.modal.close('compare-scenario-popup')
            this.modal.open('compare-promo-scenario')

        }
       
        // id="compare-promo-scenario"
    }
    backClicked() {
        this.openTab = 1
        this.optimizer.clearCompareScenarioObservable()
        this.pricingService.clearCompareScenarioObservable()
        this.modal.close('compare-scenario-popup')
        // this._location.back();
    }
    ngOnDestroy(){
        //console.log("destroying sceario header")
        // this.optimizer.getCompareScenarioObservable()
        this.optimizer.clearCompareScenarioObservable()
        this.pricingService.clearCompareScenarioObservable()
        // clearCompareScenarioObservable
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
