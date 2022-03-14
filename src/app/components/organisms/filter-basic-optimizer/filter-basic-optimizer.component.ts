import { Component,OnInit } from '@angular/core';
import { OptimizerService } from '@core/services';
import { SimulatorService } from '@core/services/simulator.service';
import { ModalService } from '@molecules/modal/modal.service';
import { ModalApply } from 'src/app/shared/modal-apply.component';

@Component({
    selector: 'nwn-filter-basic-optimizer',
    templateUrl: './filter-basic-optimizer.component.html',
    styleUrls: ['./filter-basic-optimizer.component.css'],
})
export class FilterBasicOptimizerComponent extends ModalApply implements OnInit{
    filterNames:any = [{ type : 'stroke', nwnSvgIcon: 'retailers', hideTick: true, id : 'filter-retailer', name: 'Filter by retailer' },
    { type : 'stroke', nwnSvgIcon: 'categories', hideTick: true, id : 'filter-categories', name: 'Filter by category' },
    { type : 'stroke', nwnSvgIcon: 'strategic-cells', hideTick: true, id : 'filter-stragetic-cells', name: 'Filter by strategic cell' },
    { type : 'stroke', nwnSvgIcon: 'brands', hideTick: true, id : 'filter-brands', name: 'Filter by brand' },
    { type : 'stroke', nwnSvgIcon: 'brand-formats', hideTick: true, id : 'filter-brand-formats', name: 'Filter by brand format' },
    { type : 'stroke', nwnSvgIcon: 'product-groups', hideTick: true, id : 'filter-product-groups', name: 'Filter by product group' }]
    placeholder:string = 'Search filter name'
    searchText:any = ''
    constructor(public simulatorService: SimulatorService,public modalService: ModalService){
        super()
    }
    ngOnInit(): void {
        // this.simulatorService.ClearScearchText.asObservable().subscribe(data=>{
        //     console.log(data)
        //   this.searchText = ""
        // })
      }

    openFilterModal(id:string){
        this.searchText = ""
        // let temp:any = {}
        this.modalService.close('filter-basic-optimizer')
        this.modalService.open(id)
        // this.optimizerService.setCommandInterfaceModalObservable(temp)
    }
}
