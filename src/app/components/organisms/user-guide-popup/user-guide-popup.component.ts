import { Component, EventEmitter, Input, OnInit,Output,SimpleChanges } from '@angular/core';
import { ProductWeek } from '@core/models';
import { OptimizerService } from '@core/services';
import { ModalService } from '@molecules/modal/modal.service';
import * as $ from 'jquery';

@Component({
    selector: 'nwn-user-guide-popup',
    templateUrl: './user-guide-popup.component.html',
    styleUrls: ['./user-guide-popup.component.css'],
})
export class UserGuidePopupComponent implements OnInit {
    @Input()
    guideFor: string | 'simulator' | 'optimizer' = 'optimizer'

    constructor(public modalService: ModalService,public optimizerService: OptimizerService){}
    ngOnInit(){
        this.optimizerService.getResetUserGuideFlagObservable().subscribe((data:any)=>{
            if(data != ''){
                $( "#goBackToStep1" ).click();
            }
        })
    }
    reset(){
        console.log("clicked")
    }

    closeModal(){
        this.modalService.close('user-guide-popup')
    }

}
