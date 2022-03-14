import { Component, Input } from '@angular/core';

@Component({
    selector: 'nwn-command-iconitem',
    templateUrl: './command-iconitem.component.html',
    styleUrls: ['./command-iconitem.component.css'],
})
export class CommandIconitemComponent {
    @Input()
    borderLeft: boolean = false;

    @Input()
    nwnSvgIcon = '';
    @Input()
    type = '';
    @Input()
    active = false

    @Input()
    hideTick: boolean = false;
}
