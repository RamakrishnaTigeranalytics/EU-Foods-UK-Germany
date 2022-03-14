import { Component, OnInit, Input,EventEmitter, Output  } from '@angular/core';
export class ModalApply{
  searchText = "";
  retailerSelected:any =''
  @Output()
  closeModal = new EventEmitter()
  @Output()
  filterApply = new EventEmitter()
  // @Output()
  // retailerChange = new EventEmitter()
  // @Output()
  // strategicCellChange = new EventEmitter()
  // @Output()
  // productChange = new EventEmitter()
  // @Output()
  // categoryChange = new EventEmitter()
  // @Output()
  // brandFormatChange = new EventEmitter()
  // @Output()
  // brandChange = new EventEmitter()

  // valueChangeSelect(event:any,key:any){
  //   console.log(event , "value change event")
  //   event.key = key
  //   if(event.key == 'Retailer'){
  //     this.retailerChange.emit(event)
  //   }
  //   else if(event.key == 'Category'){
  //      this.categoryChange.emit(event)
  //   }
  //   else if(event.key == 'Strategic cells'){
  //     this.strategicCellChange.emit(event)
  //   }
  //   else if(event.key == 'Brands'){
  //      this.brandChange.emit(event)
  //   }
  //   else if(event.key == 'Brand Formats'){
  //     this.brandFormatChange.emit(event)
  //   }
  //   else if(event.key == 'Product groups'){
  //     this.productChange.emit(event)
  //   }
    
  //   this.retailerSelected = event
  // }
  // apply(id){
  //   console.log(this.retailerSelected , "apply ied")
  //   // this.searchText = ''
  //   this.filterApply.emit(this.retailerSelected)
  //   this.closeModal.emit(id)
  //   this.searchText = ""
  // }
  inputChangeEvent(event:any){
    this.searchText = event
  }
}