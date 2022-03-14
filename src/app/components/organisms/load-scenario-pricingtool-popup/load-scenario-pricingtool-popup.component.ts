import { Component, OnInit,Output ,Input, EventEmitter } from '@angular/core';
import { ListPromotion, User, UserDetail } from '@core/models';
import {OptimizerService , PricingService,AuthService} from "@core/services"
import { ModalService } from '@molecules/modal/modal.service';
import {combineLatest} from 'rxjs'
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'nwn-load-scenario-pricingtool-popup',
    templateUrl: './load-scenario-pricingtool-popup.component.html',
    styleUrls: ['./load-scenario-pricingtool-popup.component.css'],
})
export class LoadScenarioPricingtoolPopupComponent implements OnInit {
    @Input()
    currency
    selectedIndex!: number;
    searchText : string = ""
    list_promotion:Array<ListPromotion> = []
    openTab = 1;
    selected_promotion : ListPromotion = null as any
    promotion_viewed:ListPromotion = null as any
    @Output()
    load_scenario_event = new EventEmitter()
    current_user : User;
    list_promotion_others:Array<ListPromotion> = []
    constructor(private optimizerService : OptimizerService ,
         private pricingService : PricingService,private authService : AuthService,
         private modal : ModalService,private toastr: ToastrService,) {
        this.optimizerService.fetch_load_scenario()
    }

    ngOnInit() {
        combineLatest([this.optimizerService.getListObservation(),this.authService.getUser()]).subscribe(([promotion,currentuser])=>{
            // if(data){
            //    // console.log(data , "Zipping user and promotionsdetails")
            //     // this.list_promotion = data.filter(data=>data.scenario_type == "pricing")
            // }
            if(promotion && currentuser){
                this.current_user = currentuser
                this.list_promotion = promotion.filter(data=>(data.scenario_type == "pricing") && 
                (data.user?.id == this.current_user.user.id))
                this.list_promotion_others = promotion.filter(data=>(data.scenario_type == "pricing") && 
                (data.user?.id != this.current_user.user.id))
               // console.log(promotion , "forking LIST PROMOTION observable")
               // console.log(currentuser , "forking LIST PROMOTION observable")
            }
           
            //// console.log(d , "forking LIST PROMOTION observable")
        })
    }

    loadPricingSimulatorItems: any[] = [
        {
            slcHead: 'Pricing scenario name',
            slcContent:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi enim ultrices eget donec in nunc, mi nisl elit. Nibh proin vitae faucibus tempor mauris, justo. Turpis adipiscing egestas.',
        },
        {
            slcHead: 'Pricing scenario name',
            slcContent:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi enim ultrices eget donec in nunc, mi nisl elit. Nibh proin vitae faucibus tempor mauris, justo. Turpis adipiscing egestas.',
        },
    ];

    loadScenario(){
        this.load_scenario_event.emit(this.selected_promotion)

    }
    inputChangeEvent($event){
        this.searchText = $event
      }
    

    select(index: number,slected_promotion) {
        this.selectedIndex = index;
        this.selected_promotion = slected_promotion
    }

    infoClickedEvent($event){
        this.promotion_viewed = $event
       // console.log($event , "id of promotion ")
        this.modal.open("pricing-simulator-popup")
    }
    deleteClickedEvent($event){

if(this.current_user.user.id != this.promotion_viewed.user?.id){
    this.toastr.error("cannot delete scenarios ceated by others")
    return
}
else{
    this.optimizerService.deletePromoScenario(this.promotion_viewed.id).subscribe(data=>{
        this.optimizerService.deleteListPromotion(this.promotion_viewed.id)
        this.modal.close("pricing-simulator-popup")
    },err=>{
       // console.log(err , "error")
    })

}
       

       

    }

    confirmationDelete($event){
       // console.log(this.promotion_viewed , "protoion detaile to delete")
       // console.log(this.promotion_viewed.id , "id to delete")
       // console.log($event , "confimatin delete at load scenario")
        this.modal.close("delete-scenario")
        if($event == 'yes'){
            // this.optimize.deletePromoScenario(this.promotion_viewed.id).subscribe(data=>{
            //     this.optimize.deleteListPromotion(this.promotion_viewed.id)
            //     this.modal.close("promo-simulator-popup")
            // },err=>{
            //    // console.log(err , "error")
            // })

        }
    }
    toggleTabs($tabNumber: number): void {
        this.openTab = $tabNumber;
    }
    modalConfirmation($event){
        if($event == 'back'){
            this.modal.close('pricing-simulator-popup')
        }
        else if($event == 'load'){
            this.modal.close('pricing-simulator-popup')
            this.loadScenario()
        }
    }
}
