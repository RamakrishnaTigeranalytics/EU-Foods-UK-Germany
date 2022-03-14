import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
import { SimulatorService } from 'src/app/core/services/simulator.service';

@Component({
    selector: 'nwn-upload-items',
    templateUrl: './upload-items.component.html',
    styleUrls: ['./upload-items.component.css'],
})
export class UploadItemsComponent implements OnChanges {
    @ViewChild('fileInput',{static : false}) fileInput: any
    @Input()
    isUploadClicked: boolean = false;
    @Input()
    showLoadUpload: boolean = false;
    @Output()
    modalEvent = new EventEmitter<string>();
    @Output()
    fileUploadEvent = new EventEmitter<any>();
    
    reqData:any
    fileName:any = 'Uploading...'
    constructor(public restApi:SimulatorService){}

    sendMessage(modalType: string): void {
        this.modalEvent.emit(modalType);
    }

    onFileSelected() {
        this.fileName = 'Uploading...'
        this.showLoadUpload = true
        const inputNode: any = document.querySelector('#simulatorInputFile');
        // console.log(inputNode.files[0])
        let filename = inputNode.files[0].name
        var extension:any = filename.substr(filename.lastIndexOf('.'));
        if((extension.toLowerCase() == ".xlsx") || (extension.toLowerCase() == ".xls") || (extension.toLowerCase() == ".csv")){
          // console.log("good to go")
          this.sendMessage('file-selected')
          this.fileName = inputNode.files[0].name
        //   this.toastr.success('File Uploaded Successfully!');
        }
        else{
            this.showLoadUpload = false
            this.sendMessage('invalid-file')
            this.fileInput.nativeElement.value = ''
        //   this.toastr.warning('Invalid File Format');
            return
        }
        const formdata = new FormData();
        formdata.append('simulator_input',inputNode.files[0])
        this.reqData = formdata
        this.fileInput.nativeElement.value = ''
        // debugger
        this.fileUploadEvent.emit(this.reqData)
      }

      removeFile(){
        this.showLoadUpload = false
        this.sendMessage('invalid-file')
        this.fileInput.nativeElement.value = ''
      }

      // uploadFile(){
      //   this.restApi.uploadPromoSimulateInput(this.reqData).subscribe((data: any) => {
      //       console.log(data)
      //       this.restApi.setSimulatorDataObservable(data)
      //   })
      // }

      ngOnChanges(changes: SimpleChanges) {
        for (let property in changes) {
            if (property === 'isUploadClicked') {
              // this.isUploadClicked = changes[property].currentValue
              // if(this.isUploadClicked == true){
              //     this.uploadFile()
              // }
            }
        }
    }
}
