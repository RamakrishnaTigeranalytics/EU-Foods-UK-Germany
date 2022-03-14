import { Component, EventEmitter, Input, OnInit,Output,SimpleChanges } from '@angular/core';
import { ProductWeek } from '@core/models';
import { ModalService } from '@molecules/modal/modal.service';

@Component({
    selector: 'nwn-optimizer-summary-popup',
    templateUrl: './optimizer-summary-popup.component.html',
    styleUrls: ['./optimizer-summary-popup.component.css'],
})
export class OptimizerSummaryPopupComponent implements OnInit {
    @Input()
    constraint_difference:any = null
    constructor(public modalService: ModalService){}
    ngOnInit(){
        // console.log(this.constraint_difference , "constraint difference....")
    
    }

    closeModal(){
        this.modalService.close('optimizer-summary-popup')
    }

}
