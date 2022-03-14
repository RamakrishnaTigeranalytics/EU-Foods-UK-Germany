import { Component, OnInit, Output , EventEmitter } from '@angular/core';

@Component({
  selector: 'nwn-upload-weekly-promotions',
  templateUrl: './upload-weekly-promotions.component.html',
  styleUrls: ['./upload-weekly-promotions.component.css']
})
export class UploadWeeklyPromotionsComponent implements OnInit {
  isButtonDisabled: boolean = true
  isUploadClicked: boolean = false
  @Output()
  closeModal = new EventEmitter<any>()
 
  @Output()
  fileUpload = new EventEmitter<any>()
  constructor() { }

  ngOnInit(): void {
  }

  receiveMessage($event: any) {
    this.isUploadClicked = true
    console.log('recieved',$event);
    if($event == 'file-selected'){
      this.isButtonDisabled = false
    }
    else if($event == 'invalid-file'){
      this.isButtonDisabled = true
    }
  }
  fileUploadEvent($event){
    this.fileUpload.emit($event)

  }

  uploadFile(){
    this.closeModal.emit("upload-weekly-promotions")
    
  }

}
