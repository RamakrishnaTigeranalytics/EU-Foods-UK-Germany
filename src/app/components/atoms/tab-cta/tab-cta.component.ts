import { Component, Input } from '@angular/core';

@Component({
    selector: 'nwn-tab-cta',
    templateUrl: './tab-cta.component.html',
    styleUrls: ['./tab-cta.component.css'],
})
export class TabCtaComponent {
    @Input()
    type: 'selectedtab' | 'unselectedtab' = 'unselectedtab';
}
