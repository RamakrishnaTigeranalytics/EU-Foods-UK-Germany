import { Injectable } from '@angular/core'
import {ApiService} from './api.service'
import {ResponseService} from './response.service'
import {TacticsModel} from "../models"

import { Observable, BehaviorSubject, Subject, throwError,combineLatest } from 'rxjs';
// import { MetaModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
    private tactics = new BehaviorSubject<TacticsModel[]>([] as any);

    public setTactics(tactics:TacticsModel[]){
        this.tactics.next(tactics)
    }
    public getTactics():Observable<TacticsModel[]>{
        return this.tactics.asObservable()
    }
    public getPromoPrice(mechanic){

        // debugger
        let tactics = this.tactics.getValue()

        let promo = tactics.filter(d=>d.promo_mechanic_2 == mechanic)
        if(promo.length > 0){
            return promo[0].promo_price
        }
        return 0.0
    }
    public addTactics(tactic:TacticsModel){
        let tactics = this.tactics.getValue()
        tactics.push(tactic)
        this.setTactics(tactics)

    }
}