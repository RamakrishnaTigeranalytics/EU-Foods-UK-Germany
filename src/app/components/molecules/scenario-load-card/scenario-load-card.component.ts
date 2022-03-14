import { Component, Input , OnInit , Output ,EventEmitter } from '@angular/core';
// import {OptimizerService} from '../../../core/services/optimizer.service'
// import { ListPromotion} from "../../../core/models"
@Component({
    selector: 'nwn-scenario-load-card',
    templateUrl: './scenario-load-card.component.html',
    styleUrls: ['./scenario-load-card.component.css'],
})
export class ScenarioLoadCardComponent  implements OnInit{

     

    constructor(){

    }
    ngOnInit(): void {
        

    }
    @Input()
    showInfo: boolean = false;
    @Input()
    showTrash: boolean = false;
    @Input()
    showCheckbox: boolean = false;
    @Input()
    showSubHead: boolean = false;
    @Input()
    focus: boolean = false;
    @Input()
    id: any = null;
    @Output()
    infoClickedEvent = new EventEmitter()
    @Output()
    deleteClickedEvent = new EventEmitter()
    @Input()
    value = null
    @Output()
    changeCheckboxEvent = new EventEmitter()

    infoClicked(){
        this.infoClickedEvent.emit(this.id)

    }
    deleteClicked(){
        
        this.deleteClickedEvent.emit()
    }
    valueChange($event){
        this.changeCheckboxEvent.emit($event)
       
    }
}
