import { Component, Input ,forwardRef} from '@angular/core';
import { ControlValueAccessor,NG_VALUE_ACCESSOR,FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
    selector: 'nwn-text-input',
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.css'],
    providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => TextInputComponent),
          multi: true
        }
      ]
})
export class TextInputComponent implements ControlValueAccessor{
    @Input()
    placeholder = 'Scenario name';

    @Input()
    nwnTextInput: string | 'text' | 'textarea' = 'text';

    @Input()
    error: boolean = false;
    @Input()
    value = ''

    _name = "";

    get name(): string {
        return this._name;
      }
    
      set name(value: string) {
        this._name = value;
        this.propagateChange(this._name);
      }
      writeValue(value: string) {
        if (value !== undefined) {
          this.name = value;
        }
      }
      propagateChange = (_: any) => { };
  propagateTouched = (_: any) => { };
  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) {
    this.propagateTouched = fn;
  }

  touched($event) {
    this.propagateTouched($event);
  }
}
