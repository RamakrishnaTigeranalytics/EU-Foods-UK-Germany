import { Component, Input } from '@angular/core';

@Component({
    selector: 'nwn-toggle-cta',
    templateUrl: './toggle-cta.component.html',
    styleUrls: ['./toggle-cta.component.css'],
})
export class ToggleCtaComponent {
    @Input()
    type: string | 'unselected' | 'selected' = 'unselected';
}
