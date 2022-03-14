import { Component, Input } from '@angular/core';

@Component({
    selector: 'nwn-command-header',
    templateUrl: './command-header.component.html',
    styleUrls: ['./command-header.component.css'],
})
export class CommandHeaderComponent {
    @Input()
    nwnSvgIcon = '';
    @Input()
    type = '';
}
