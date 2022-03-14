import { Component, Input ,SimpleChanges} from '@angular/core';

@Component({
    selector: 'nwn-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
    @Input()
    size: string | 'nosize' | 'sm' | 'lg' | 'iconsm' | 'iconlg' | 'ghostsm' | 'ghostlg' = 'lg';

    @Input()
    type: string | 'nostyle' | 'primary' | 'secondary' | 'link' | 'transparent' | 'icon' | 'ghostwhite' | 'ghostdark' =
        'primary';

    @Input()
    disabled: boolean = false;

    @Input()
    href = '';

    @Input()
    class = '';

    @Input()
    showTooltip: boolean = false;

    ngOnChanges(changes: SimpleChanges) {
 
        for (let property in changes) {
            if (property === 'disabled') {
                // console.log(changes[property].currentValue , "current value")
                this.disabled = changes[property].currentValue
                // console.log(this.disabled , this.type , "disabled icon and type")
                // if(this.disabled){
                //     this.type ="transparent"

                // }
                
               
            } 
        }
    }
}
