import { Component,OnInit } from '@angular/core';
import { OptimizerService } from '@core/services';
import { ModalService } from '@molecules/modal/modal.service';
import { ModalApply } from 'src/app/shared/modal-apply.component';

@Component({
    selector: 'nwn-promo-optimizer-popup',
    templateUrl: './promo-optimizer-popup.component.html',
    styleUrls: ['./promo-optimizer-popup.component.css'],
})
export class PromoOptimizerPopupComponent extends ModalApply implements OnInit{
    isFiltered: boolean = false
    placeholder: string = 'Search Filter'

    filterNames:any = [
    { type : 'stroke', nwnSvgIcon: 'variables', hideTick: true, id : 'optimize-function', name: 'Set optimize function' },
    { type : 'stroke', nwnSvgIcon: 'filter', hideTick: true, id : 'filter-basic-optimizer', name: 'Set filters' },
    { type : 'stroke', nwnSvgIcon: 'adjustments', hideTick: true, id : 'duration-of-waves', name: 'Set duration of promo waves' },
    { type : 'stroke', nwnSvgIcon: 'adjustments', hideTick: true, id : 'minimum-gap-waves', name: 'Set minimum gap between promo waves' },
    { type : 'stroke', nwnSvgIcon: 'adjustments', hideTick: true, id : 'number-promo-waves', name: 'Set number of promo weeks' },
    { type : 'stroke', nwnSvgIcon: 'adjustments', hideTick: true, id : 'compulsory-weeks-popup', name: 'Set compulsory weeks' },
    { type : 'stroke', nwnSvgIcon: 'adjustments', hideTick: true, id : 'weeks-ignored', name: 'Set weeks to be ignored' },
    { type : 'stroke', nwnSvgIcon: 'adjustments', hideTick: true, id : 'promotion-details', name: 'Set promotion details' },
    ]
    constructor(public optimizerService: OptimizerService,public modalService: ModalService) {
        super()
    }

    ngOnInit(): void {
        this.optimizerService.isAccAndProductFiltered.asObservable().subscribe(data=>{
            if(data){
                this.isFiltered = true
            }
            else{
                this.isFiltered = false
            }
        })
        this.optimizerService.ClearScearchText.asObservable().subscribe(data=>{
        this.searchText = ""    
        })
    }

    openModal(id:string){
        this.modalService.close('promo-optimizer-popup')
        this.modalService.open(id)
      }
}
