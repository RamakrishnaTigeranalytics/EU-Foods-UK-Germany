import { Component,Input, OnInit,forwardRef , EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'nwn-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleSwitchComponent),
      multi: true
    }
  ]
})
export class ToggleSwitchComponent implements ControlValueAccessor {

  constructor() { }
  @Input()
  showText = true

  @Input('value') _value = false;
  @Output() valueChange = new EventEmitter();

  @Input()
disable:any =false
onChange: any = () => {};
onTouch: any = () => {};

registerOnChange(fn: any): void {
  this.onChange = fn;
}

registerOnTouched(fn: any): void {
  this.onTouch = fn;
}


// Step 4: Define what should happen in this component, if something changes outside
checked: boolean = false;
writeValue(checked: boolean) {
  this.checked = checked;
}

onModelChange(e: boolean) {
  // console.log(e , "onchnagemodel...")

  // Step 5a: bind the changes to the local value
  this.checked = e;

  // Step 5b: Handle what should happen on the outside, if something changes on the inside
  this.onChange(e);
}
   

}
