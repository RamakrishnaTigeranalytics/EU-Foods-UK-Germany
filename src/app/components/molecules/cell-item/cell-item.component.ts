import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'nwn-cell-item',
    templateUrl: './cell-item.component.html',
    styleUrls: ['./cell-item.component.css'],
})
export class CellItemComponent{
    @Input()
    class = '';
    @Input()
    size: string | 'textsize-md' | 'textsize-lg' = 'textsize-lg';
    @Input()
    color: string | 'green' | 'red' | 'neutral' = 'green';
    @Input()
    nwnCellItem: string | 'carret-up' | 'carret-down' | 'summarypopup' |'promo'  = 'carret-up';
    @Input()
    nwnCellData: any = {}
    @Input()
    differenceFormat : string | 'absolute' | 'percent' = 'absolute'

   }
