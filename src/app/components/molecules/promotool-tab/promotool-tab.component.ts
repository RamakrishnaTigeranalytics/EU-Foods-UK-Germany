import { Component, Input } from '@angular/core';

@Component({
    selector: 'nwn-promotool-tab',
    templateUrl: './promotool-tab.component.html',
    styleUrls: ['./promotool-tab.component.css'],
})
export class PromotoolTabComponent {
    @Input()
    href = '';
    @Input()
    type = '';
    @Input()
    active: boolean = false;
    @Input()
    link = '';

    @Input()
    nwnSvgIcon = '';
}
