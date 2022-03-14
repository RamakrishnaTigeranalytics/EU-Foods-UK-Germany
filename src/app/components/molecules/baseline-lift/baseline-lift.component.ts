import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'nwn-baseline-lift',
    templateUrl: './baseline-lift.component.html',
    styleUrls: ['./baseline-lift.component.css'],
})
export class BaselineLiftComponent implements OnInit {
    constructor() {}

    public barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true,
    };

    public barChartLabels = ['Baseline vs Lift(units)'];
    public barChartType = 'bar';
    public barChartLegend = true;

    public barChartData = [
        {
            data: [65, 59, 80, 81, 56, 55, 40],
            label: 'Base',
            backgroundColor: ['#7DD3FC'],
            borderColor: ['#7DD3FC'],
            borderWidth: 1,
        },
        {
            data: [90, 48, 40, 19, 86, 27, 90],
            label: 'Simualted',
            backgroundColor: ['#0284C7'],
            borderColor: ['#0284C7'],
            borderWidth: 1,
        },
    ];

    ngOnInit() {}
}
