import { Component, Input,Output,EventEmitter } from '@angular/core';

@Component({
    selector: 'nwn-comparescenario-cell-header',
    templateUrl: './comparescenario-cell-header.component.html',
    styleUrls: ['./comparescenario-cell-header.component.css'],
})
export class ComparescenarioCellHeaderComponent {
    @Input()
    showCHClose: boolean = false;
    @Input()
    scenario : any = null
    @Output()
    removeCompareEvent  = new EventEmitter()


    removeCompare(scenario){
        this.removeCompareEvent.emit(scenario)

    }
}
