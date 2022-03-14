import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'nwn-mars-customer-pl-metrics',
    templateUrl: './mars-customer-pl-metrics.component.html',
    styleUrls: ['./mars-customer-pl-metrics.component.css'],
})
export class MarsCustomerPlMetricsComponent implements OnInit {
    constructor() {}

    public barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true,
    };

    public barChartLabels = ['LSV', 'Trade Expense', 'NVS', 'COGS', 'RSV', 'Customer Margin'];
    public barChartType = 'bar';
    public barChartLegend = true;

    public barChartData = [
        {
            data: [65, 12, 80, 40, 56, 55, 40],
            label: 'Base',
            backgroundColor: ['#7DD3FC'],
            borderColor: ['#7DD3FC'],
            borderWidth: 1,
        },
        {
            data: [90, 30, 40, 19, 86, 24, 90],
            label: 'Simualted',
            backgroundColor: ['#0284C7'],
            borderColor: ['#0284C7'],
            borderWidth: 1,
        },
    ];

    ngOnInit() {}
}
