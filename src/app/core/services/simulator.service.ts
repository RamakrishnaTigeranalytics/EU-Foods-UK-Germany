import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service'
import { retry, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subject, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SimulatorService {
  
  // Define API
  apiURL = environment.api_url;
  token = environment.token;


  public uploadedSimulatorDataObservable = new BehaviorSubject<any>('')
  public openCommandInterfaceModal = new BehaviorSubject<any>('')
//   public promoElasticityValue = new BehaviorSubject<any>('')
  public isAccAndProductFiltered = new BehaviorSubject<boolean>(false)
  public ClearScearchText = new BehaviorSubject<any>('')
  public IsSaveScenarioLoaded = new BehaviorSubject<any>('')
  public ClearScearchTextCatg = new BehaviorSubject<any>('')
  public SignoutPopup = new BehaviorSubject<any>('')

  constructor(private http: HttpClient,private apiService: ApiService) { }

  // Set and Get Uploaded Simulator Data
  public setSimulatorDataObservable(value:any){
    this.uploadedSimulatorDataObservable.next(value)
  }
  public getSimulatorDataObservable(){
    return this.uploadedSimulatorDataObservable.asObservable()
  }

  // Set and Get Command Interface Modal
  public setCommandInterfaceModalObservable(value:any){
    this.openCommandInterfaceModal.next(value)
  }
  public getCommandInterfaceModalObservable(){
    return this.openCommandInterfaceModal.asObservable()
  }

  // Set and Get Promo Elasticity Value
//   public setPromoElasticityValueObservable(value:any){
//     this.promoElasticityValue.next(value)
//   }
//   public getPromoElasticityValueObservable(){
//     return this.promoElasticityValue.asObservable()
//   }

  // Set and Get Account and Product Filtered Flag
  public setAccAndPPGFilteredFlagObservable(value:any){
    this.isAccAndProductFiltered.next(value)
  }
  public getAccAndPPGFilteredFlagObservable(){
    return this.isAccAndProductFiltered.asObservable()
  }

   // Set and Get clear search result
   public setClearScearchTextObservable(value:any){
   this.ClearScearchText.next(value)
   }
   public getClearScearchTextObservable(){
   return this.ClearScearchText.asObservable()
   }

  // Set and Get save scenario data flag
  public setIsSaveScenarioLoadedObservable(value:any){
    this.IsSaveScenarioLoaded.next(value)
  }
  public getIsSaveScenarioLoadedObservable(){
    return this.IsSaveScenarioLoaded.asObservable()
  }

  // Set and Get save scenario data flag
  public setSignoutPopupObservable(value:any){
    this.SignoutPopup.next(value)
  }
  public getSignoutPopupObservable(){
    return this.SignoutPopup.asObservable()
  }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    })
  }  

  getPromoSimulateData(requestData: any): Observable<any> {
    return this.http.post<any>(this.apiURL + 'scenario/promo-simulate/', JSON.stringify(requestData), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  uploadPromoSimulateInput(requestData: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token ' + localStorage.getItem('token')
      })
    }  
    return this.http.post<any>(this.apiURL + 'api/scenario/promo-simulate-file-upload/', requestData, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  downloadWeeklyDataInputTemplate(formdata): Observable<any> {
    let httpOptions:any = {
       headers: new HttpHeaders({
         'Authorization': 'Token ' + localStorage.getItem('token')
       }),
       responseType: 'blob',
     } 
     return this.http.post<any>(this.apiURL + 'api/scenario/download-data-week/',formdata,httpOptions )
     .pipe(
       retry(1),
       catchError(this.handleError)
     )
   }
 

  downloadWeeklyInputTemplate(queryparam): Observable<any> {
   let httpOptions:any = {
      headers: new HttpHeaders({
        'Authorization': 'Token ' + localStorage.getItem('token')
      }),
      params : queryparam,
      responseType: 'blob',
    } 
    return this.http.get<any>(this.apiURL + 'api/scenario/weekly-input-template-download/',httpOptions )
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Error handling 
  handleError(error: any) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
   //   window.alert(errorMessage);
     return throwError(errorMessage);
  }

}