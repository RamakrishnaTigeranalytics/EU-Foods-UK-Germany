import { Component, OnInit , Input , Output , EventEmitter,SimpleChanges } from '@angular/core';
import {ListPromotion} from "@core/models"
import { ModalService } from '@molecules/modal/modal.service';

@Component({
  selector: 'nwn-loaded-promosimulator-scenario',
  templateUrl: './loaded-promosimulator-scenario.component.html',
  styleUrls: ['./loaded-promosimulator-scenario.component.css']
})
export class LoadedPromosimulatorScenarioComponent {

  @Input()
  promotion_viewed : ListPromotion = null as any
  @Output()
  deleteClicked =  new EventEmitter()
  @Input()
  scenario = "Pricing"

  @Input()
  currency = ""

  constructor(private modalService: ModalService){}
  deleteClickedEvent($event){
      this.deleteClicked.emit(this.promotion_viewed)

      // console.log(this.promotion_viewed , "delete event")
  }
//   ngOnChanges(changes: SimpleChanges) {
//     for (let property in changes) {
//         if (property === 'promotion_viewed') {
//           this.promotion_viewed = changes[property].currentValue

//           // if(this.isUploadClicked == true){
//           //     this.uploadFile()
//           // }
//         }
//     }
// }
  
  closeModalPopup(){
    this.modalService.close('loaded-promosimulator-scenario')
  }
  isArray(obj : any ) {
    return Array.isArray(obj)
 }

}
