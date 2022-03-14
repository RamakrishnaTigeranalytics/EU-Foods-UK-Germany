import { OnInit } from '@angular/core';
import { Component , Output , EventEmitter } from '@angular/core';
import { OptimizerService } from '@core/services';
import { ModalService } from '@molecules/modal/modal.service';
import { ModalApply } from 'src/app/shared/modal-apply.component';

@Component({
    selector: 'nwn-optimize-function',
    templateUrl: './optimize-function.component.html',
    styleUrls: ['./optimize-function.component.css'],
})
export class OptimizeFunctionComponent extends ModalApply implements OnInit{
    placeholder:any = 'Search for objective function'
    objective_value:any = null

    @Output()
    objectiveEvent = new EventEmitter()

objective_function = [
  {'name':'Maximize MAC','nwnSvgIcon': 'trending-up', 'value': 'Maximize MAC'},
  {'name':'Maximize Trade Margin', 'nwnSvgIcon': 'trending-up', 'value': 'Maximize TM'},
  {'name':'Minimize Trade Expense','nwnSvgIcon': 'trending-down', 'value': 'Minimize TE'}
]
constructor(public optimizerService: OptimizerService,public modalService: ModalService) {
    super()
}
selectObjective(objective){
    this.objective_value = objective
    this.objectiveEvent.emit(objective)
    // console.log(objective , "objective function")
}

ngOnInit(){
    this.optimizerService.ClearScearchText.asObservable().subscribe(data=>{
        this.searchText = ""    
        })
}
apply(){
    console.log(this.objective_value , "objective function")
    if(!this.objective_value){
        throw "Choose objective function"
    }
    this.objectiveEvent.emit(this.objective_value)

}

}
