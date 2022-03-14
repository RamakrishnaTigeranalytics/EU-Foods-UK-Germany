import { Component } from '@angular/core';
import { ModalService } from '@molecules/modal/modal.service';

@Component({
    selector: 'nwn-promo-elasticity-popup',
    templateUrl: './promo-elasticity-popup.component.html',
    styleUrls: ['./promo-elasticity-popup.component.css'],
})
export class PromoElasticityPopupComponent {
    constructor(public modalService: ModalService){}
    closeModal(){
        this.modalService.close('promo-elasticity-modal')
    }
}
