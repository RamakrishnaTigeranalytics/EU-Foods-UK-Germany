import { Injectable } from '@angular/core'
import {ApiService} from './api.service'
import {ResponseService} from './response.service'
import {Product , ProductWeek , ListPromotion , LoadedScenarioModel,UploadModel,OptimizerModel} from "../models"

import { Observable, BehaviorSubject, Subject, throwError,combineLatest } from 'rxjs';
import { MetaModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
    private meta = new BehaviorSubject<MetaModel>(null as any);

    public setMeta(currency:MetaModel){
        this.meta.next(currency)
    }
    public getMeta():Observable<MetaModel>{
        return this.meta.asObservable()
    }
}