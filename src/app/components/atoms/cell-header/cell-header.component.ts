import { Component, Input } from '@angular/core';

@Component({
    selector: 'nwn-cell-header',
    templateUrl: './cell-header.component.html',
    styleUrls: ['./cell-header.component.css'],
})
export class CellHeaderComponent {
    @Input()
    type: string | 'headersm' | 'subheadersm' | 'subheaderlg' | 'subheadermd' = 'headersm';
    @Input()
    color: string | 'bgwhite' | 'bgtransparent' | 'bggray-100' = 'bgwhite';
    @Input()
    showDate: boolean = false;
}
