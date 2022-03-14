import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { ApiService } from './api.service'
import { retry, catchError , map } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subject, throwError,combineLatest } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PricingModel,PriceSimulated } from '@core/models';
import {ResponseService} from './response.service'
// import { Observable, BehaviorSubject, Subject, throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class PricingService{
    apiURL = environment.api_url;
    private pricingSimulatedObservable = new BehaviorSubject<any>(null)
    private compareScenarioPriceObservable = new BehaviorSubject<any[]>([])

    constructor(private http: HttpClient,private apiService: ApiService, private responseMock : ResponseService) { 


    }

    public insertBase(form):Observable<any>{
      return this.apiService.post('api/scenario/update-base-price/',form)
    }
    deletePromoScenario(id){
      return this.apiService.delete('api/scenario/savedscenario/'+id)
  }

    public getPricingMetric(ids:any[]):Observable<PricingModel[]>{
       
      //  return this.responseMock.scenarioMetrics()
      return this.apiService.get("api/scenario/scenario-metrics/" , ids )
    }
    public calculatePricingMetrics(formdata):Observable<PriceSimulated>{
      // simulatedsresponse
      return this.apiService.post("api/scenario/scenario-metrics/" ,formdata)
      // return this.responseMock.simulatedsresponse()
      .pipe(
        map((data : any)=>{
            return data['payload']
        })
    )
        // return this.apiService.post("api/scenario/scenario-metrics/" ,formdata).pipe(
        //     map((data : any)=>{
        //         return data['payload']
        //     })
        // )
    }
    public uploadWeeklyPricing(requestData: any):Observable<any>{
        let httpOptions = {
            headers: new HttpHeaders({
              'Authorization': 'Token ' + localStorage.getItem('token')
            })
          }  
          return this.http.post<any>(this.apiURL + 'api/scenario/pricing-weekly-upload/', requestData, httpOptions)
          .pipe(
            retry(1),
            // catchError(this.handleError)
          )

    }

    public getPricingSimulatedObservable():Observable<PriceSimulated>{
        return this.pricingSimulatedObservable.asObservable()

    }
    public setPricingSimulatedObservable(pricingSimulated : PriceSimulated){
        this.pricingSimulatedObservable.next(pricingSimulated)
    }

    savePricingScenario(requestData: any):Observable<any>{
        return this.apiService.post<any>('api/scenario/savescenario/' , requestData)
      }
      updatePricingScenario(id,requestData):Observable<any>{
        return this.apiService.put(`api/scenario/savescenario/${id}/` , requestData)

      }
      loadPricingScenario(id):Observable<any>{
          return this.apiService.get<any>(`api/scenario/list-saved-promo/${id}/`)
      }

      public clearCompareScenarioObservable(){
        this.compareScenarioPriceObservable.next([])
      }
      public deleteCompareScenario(id){
        let scenarios = this.compareScenarioPriceObservable.getValue()
        scenarios = scenarios.filter(data=>data.scenario_id != id)
        this.compareScenarioPriceObservable.next(scenarios)
  
  
    }

      fetch_load_scenario_by_id(id:number , pricing_id= null){
        let arg= String(id)
        if(pricing_id){
        arg  = id + "/" + pricing_id
        }
        return this.apiService.get<any>('api/scenario/list-saved-promo/' + arg)
          // http://localhost:8000/api/scenario/list-saved-promo/39/
      }
      public getCompareScenarioPriceObservable():Observable<any>{
          return this.compareScenarioPriceObservable.asObservable()
      }
      public setCompareScenarioObservable(scenario : any[]){
        //   let compare_scenario = this.compareScenarioObservable.getValue()
        //   compare_scenario = [...compare_scenario , ...scenario]
          this.compareScenarioPriceObservable.next(scenario)
    
      }
      public downloadPricingWeekly(data){
        return this.apiService.postd('api/scenario/weekly-input-template-download/' ,data)

      }
      public downloadPricing(){
          
          return this.apiService.postd('api/scenario/pricing-download/' ,this.pricingSimulatedObservable.getValue())
      }
      public setCompareScenarioIdObservable(id:Array<number>){
        // debugger
         let available_ids =  this.compareScenarioPriceObservable.getValue().map(s=>s.scenario_id)
         let id_unselected = this.diffArray(available_ids,id)
         id = id.filter(i=>!available_ids.includes(i))
         let compare_scenario = this.compareScenarioPriceObservable.getValue()
         this.clearCompareScenarioObservable()
        //  console.log(available_ids , "available ids" )
        //  console.log(id_unselected , "id unselected")
        //  console.log(id , "final id")
    
        let obs$:Array<any>=[]
       
    
       
    
        if(available_ids.length > 0){
            if(id_unselected.length > 0){
                for(let i = 0; i < id_unselected.length; i++){
                    compare_scenario = compare_scenario.filter((item:any) => item.scenario_id != id_unselected[i])
                    // compare_scenario.splice(index, 1)
                }
    
                // this.setCompareScenarioObservable(compare_scenario)
            }
        }
        console.log(compare_scenario , "compare scenario")
        
    
    
        // this.clearCompareScenarioObservable()
        if(id.length > 0 ||  id_unselected.length > 0){
            obs$ = id.map(v=> this.fetch_load_scenario_by_id(v))
            // console.log(obs$ , "obseravable http")
            if(obs$.length == 0){
              this.setCompareScenarioObservable([...compare_scenario])
    
            }
            combineLatest(obs$).subscribe((data:any)=>{
                // debugger
                let temp_data = [...compare_scenario , ...data]
                this.setCompareScenarioObservable(temp_data)
            })
        }
      }
      diffArray(arr1, arr2) {
        return arr1
          .concat(arr2)
          .filter(item => !arr1.includes(item) || !arr2.includes(item));
      }
    

}