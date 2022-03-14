import { Component, Input } from '@angular/core';

@Component({
    selector: 'nwn-product-tabs',
    templateUrl: './product-tabs.component.html',
    styleUrls: ['./product-tabs.component.css'],
})
export class ProductTabsComponent {
    @Input()
    type: 'selectedtabproduct' | 'unselectedtabproduct' = 'unselectedtabproduct';
}
