import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { ModalService } from './modal.service';
import * as $ from 'jquery';
import { SimulatorService } from '@core/services/simulator.service';
import { OptimizerService, PricingService } from '@core/services';

@Component({
    selector: 'nwn-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input()
    overflow = true
    @Input()
    id!: string;
    private element: any;

    constructor(private modalService: ModalService, el: ElementRef,public restApi: SimulatorService,public optimizerService: OptimizerService,
        public pricingService : PricingService) {
        this.id = '';
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        // console.log("modal component init")
        // ensure id attribute exists
        if (!this.id) {
            // console.error('modal must have an id');
            return;
        }

        var self = this;
        // $(document).keydown(function(event) { 
        //     if (event.keyCode == 27) {
        //         var modal_id:any = self.modalService.opened_modal
        //         if(modal_id.length > 0){
        //             modal_id = modal_id[modal_id.length-1]
        //             // $('#'+modal_id).hide();
        //             self.modalService.close(modal_id) 
        //             self.modalService.remove_last_modal()
        //             if(self.id == 'compare-promo-scenario' || self.id == 'compare-scenario-popup'){
        //                 self.optimizerService.clearCompareScenarioObservable()
        //                 self.pricingService.clearCompareScenarioObservable()
        //             }
        //             self.restApi.setClearScearchTextObservable(self.id)
        //             self.optimizerService.setClearScearchTextObservable(self.id)
        //         }
        //     }
        // });

        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.element);

        // close modal on background click
        this.element.addEventListener('click', (el: { target: { className: string } }) => {
            // console.log("modal component click close")
            // console.log("modal component click close target",el.target.className)
            if (el.target.className === 'nwn-modal-bg') {
                console.log(this.id , "id modal ...")
                if(this.id == 'compare-promo-scenario' || this.id == 'compare-scenario-popup'){
                    this.optimizerService.clearCompareScenarioObservable()
                    this.pricingService.clearCompareScenarioObservable()
                }
                this.restApi.setClearScearchTextObservable(this.id)
                this.optimizerService.setClearScearchTextObservable(this.id)
                this.close();
                // document.body.classList.add('nwn-modal-open');
            }
        });

        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalService.add(this);
    }

    // remove self from modal service when component is destroyed
    ngOnDestroy(): void {
        // console.log("modal component click close destroying")
        // console.log("destroying" , this.id)
        this.modalService.remove(this.id);
        this.element.remove();
    }

    // open modal
    open(): void {
        // console.log("modal component open")
        this.element.style.display = 'block';
        document.body.classList.add('nwn-modal-open');
    }

    // close modal
    close(): void {
        this.modalService.remove_last_modal()
        // console.log("modal component click close claose()")
        this.element.style.display = 'none';
        let opened = this.modalService.get_opened_modal()
        // console.log(opened , "opened remainig..")
        if(opened.length==0){
            document.body.classList.remove('nwn-modal-open');

        }
       
    }
}
