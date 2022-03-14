import { Component, OnInit,Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'nwn-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.css'],
})
export class CheckboxComponent implements OnInit {
@Input()
value:any = ""
@Input()
disable:any =false
@Input()
checked:boolean = false
@Output() valueChange = new EventEmitter();
@Input()
showLabel: boolean = false;
@Input()
showTooltip = false

@Input()
spacex = 'space-x-4'
 

    @Input() checkboxData = false;
    @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }
  checkValue(e:any){
    // console.log(this.disable , "disable in checkvalue")
    if(this.disable){
      return
    }
    this.valueChange.emit({"value" : this.value,
    "checked" : e.target.checked
  });
}
onToggle(): void {
  const checkedOption = this.checkboxData;
  this.toggle.emit(checkedOption);
}
    // console.log(e.target.checked , "e vale")

    
    
}
