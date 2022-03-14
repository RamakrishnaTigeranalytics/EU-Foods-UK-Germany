import { Component, OnInit , Output,EventEmitter, Input } from '@angular/core';
import { ControlValueAccessor,NG_VALUE_ACCESSOR, } from '@angular/forms'

@Component({
  selector: 'nwn-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: CompetitionComponent
    }
  ]
})
export class CompetitionComponent implements ControlValueAccessor{

  @Output() toggleEvent = new EventEmitter();
  follow_competition : boolean = false

  @Input()
  spacex = "space-x-1"

  @Input()
  disable = false

  constructor() { }

  onChange = (quantity) => {};

  onTouched = () => {};
  writeValue(follow_competition: boolean) {
    this.follow_competition = follow_competition;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }



  
  toggle($event){
    // console.log($event , "toggle event...")
    // console.log(this.follow_competition , "before..")
    this.toggleEvent.emit($event)
    this.follow_competition = $event.checked
    this.onChange(this.follow_competition)
    // console.log(this.follow_competition , "after ")
   
  }

}
