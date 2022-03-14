import { Component,EventEmitter,Input, OnInit,Output,SimpleChanges } from '@angular/core';
 

@Component({
    selector: 'nwn-confirmation-popup',
    templateUrl: './confirmation-popup.component.html',
    styleUrls: ['./confirmation-popup.component.css'],
})
export class ConfirmationPopupComponent {

    @Output()
    confirmationEvent = new EventEmitter()
    @Input()
    constraint_difference = null

    confirm(value : boolean){
        this.confirmationEvent.emit(value)
    }

    
}
