import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule , ReactiveFormsModule} from '@angular/forms'
// import {FilterPipe} from "./pipe/filter.pipe"
// import {SIPipe} from "./pipe/si.pipe"
// import {WeekType} from "./pipe/week-type.pipe"
// import {ImagePipe} from "./pipe/image.pipe"
import {SubTabFilter,FilterPipe,ImagePipe,SIPipe,WeekType,PercentageIncrease,ArrayToParaPipe, TruncatePipe} from "./pipe"
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    FilterPipe,
    PercentageIncrease,
    SIPipe,
    WeekType,
    ImagePipe,
    ArrayToParaPipe,
    SubTabFilter,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports : [
    FilterPipe,
    PercentageIncrease,
    SIPipe,
    WeekType,
    ImagePipe,
    ArrayToParaPipe,
    FormsModule,
    SubTabFilter,
    TruncatePipe,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class SharedModule { }
