import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { EventEmitter } from 'stream';

@Component({
    selector: 'nwn-filter-item',
    templateUrl: './filter-item.component.html',
    styleUrls: ['./filter-item.component.css'],
})
export class FilterItemComponent {
    @Input()
    nwnSvgIcon = 'retailers';
    @Input()
    type = 'stroke';
    @Input()
    size: string | 'smallValue' | 'largeValue' = 'largeValue';
    @Input()
    hideClose: boolean = true;
    @Input()
    hideFilterIcon: boolean = false;
    @Output()
    closeClickedEvent = new EventEmitter()

    closeClicked($event){
        // console.log($event , "event in filter items")
        this.closeClickedEvent.emit($event)

    }
}
