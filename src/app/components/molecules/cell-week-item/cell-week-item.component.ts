import { Component, Input } from '@angular/core';

@Component({
    selector: 'nwn-cell-week-item',
    templateUrl: './cell-week-item.component.html',
    styleUrls: ['./cell-week-item.component.css'],
})
export class CellWeekItemComponent {
    @Input()
    type: string | 'lowholidayweek' | 'meediumholidayweek' | 'highholidayweek' = 'lowholidayweek';
    @Input()
    active: boolean = false;
    @Input()
    inWeek: any = {};
    @Input()
    holiday_flag : string = ''
}
