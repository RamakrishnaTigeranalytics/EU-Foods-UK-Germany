import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'nwn-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements OnInit {
    singleSelect: any = [];
    config = {
        displayKey: 'name', // if objects array passed which key to be displayed defaults to description
        search: true,
        limitTo: 3,
    };
    optionsNormal = [
        {
            _id: '5a66d6c31d5e4e36c7711b7a',
            index: 0,
            balance: '$2,806.37',
            picture: 'http://placehold.it/32x32',
            name: 'Burns Dalton',
        },
        {
            _id: '5a66d6c3657e60c6073a2d22',
            index: 1,
            balance: '$2,984.98',
            picture: 'http://placehold.it/32x32',
            name: 'Mcintyre Lawson',
        },
        {
            _id: '5a66d6c376be165a5a7fae33',
            index: 2,
            balance: '$2,794.16',
            picture: 'http://placehold.it/32x32',
            name: 'Amie Franklin',
        },
        {
            _id: '5a66d6c3f7854b6b4d96333b',
            index: 3,
            balance: '$2,537.14',
            picture: 'http://placehold.it/32x32',
            name: 'Jocelyn Horton',
        },
    ];

    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
}
