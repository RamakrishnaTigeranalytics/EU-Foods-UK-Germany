import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'nwn-graphical-summary-dropdown',
    templateUrl: './graphical-summary-dropdown.component.html',
    styleUrls: ['./graphical-summary-dropdown.component.css'],
})
export class GraphicalSummaryDropdownComponent implements OnInit {
    constructor() {}

    @Input()
    config = {
       
        placeholder: 'Select (0)',
    };


    ngOnInit(): void {}

    singleSelect: any = [];
   
    productsValues = [
        {
            _id: 'all',
            index: 0,
            name: 'All',
        },
        {
            _id: 'wallmart',
            index: 1,
            name: 'Wallmart',
        },
        {
            _id: 'target',
            index: 2,
            name: 'Target',
        },
    ];
}
