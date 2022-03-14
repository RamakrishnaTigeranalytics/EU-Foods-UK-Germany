import { Component, Input } from '@angular/core';

@Component({
    selector: 'nwn-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.css'],
})
export class MenuItemComponent {
    @Input()
    href = '';
    @Input()
    link = '';
    @Input()
    type = 'stroke';
    @Input()
    active = false;
    @Input()
    nwnSvgIcon = 'promotool';
}
