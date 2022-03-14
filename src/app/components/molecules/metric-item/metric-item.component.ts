import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'nwn-metric-item',
    templateUrl: './metric-item.component.html',
    styleUrls: ['./metric-item.component.css'],
})
export class MetricItemComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    @Input()
    nwnMetricItem: string | 'defaultRight' | 'defaultTop' | 'multipleValues' | 'checkboxMetric' = 'defaultRight';

    @Input()
    showRightValue = false;

    @Input()
    disabled = false;

    @Input()
    checkboxValue = false;

    @Input()
    value = ''
    @Input()
    checked  =  false

    @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

    onRoleChangeCheckbox(ev) {
        // console.log(ev , "on role change metic item")
        this.checkboxValue = ev;
        this.toggle.emit(this.checkboxValue);
    }
}
