import { Component, Input } from '@angular/core';

@Component({
    selector: 'nwn-pricing-scenario-builder-popup',
    templateUrl: './pricing-scenario-builder-popup.component.html',
    styleUrls: ['./pricing-scenario-builder-popup.component.css'],
})
export class PricingScenarioBuilderPopupComponent {
    @Input()
    placeholder = 'Search';
}
