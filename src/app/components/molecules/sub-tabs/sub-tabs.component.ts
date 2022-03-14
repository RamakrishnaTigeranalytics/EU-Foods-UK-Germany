import { Component, OnInit,Input, ElementRef, ViewChild , Output , EventEmitter } from '@angular/core';
import * as $ from 'jquery';

@Component({
    selector: 'nwn-sub-tabs',
    templateUrl: './sub-tabs.component.html',
    styleUrls: ['./sub-tabs.component.css'],
})
export class SubTabsComponent implements OnInit {
    @ViewChild('list',{static : false}) listscroll: any

    @Input()
    products:any[] = []

    @Output()
    subProductSelectEvent = new EventEmitter()

    @Output()
    removeProductEvent = new EventEmitter()

    constructor() {
        // this.scrollable = any;
    }
    closeClickedEvent($event){
        this.removeProductEvent.emit($event)
        // console.log("slode clicked")
    }
    selectSubProduct(product){
        this.subProductSelectEvent.emit(product)

    }
    getTabLength(width){
        // debugger
        var itemsLength = $(".cp").length;
        var itemSize = $(".cp").outerWidth(true);
        var getMenuSize  = itemsLength * itemSize!
        var getMenuWrapperSize = $(".tabpanel").outerWidth();
        if(getMenuSize > getMenuWrapperSize!){
            // console.log("subtab if")
            $(".sticky-wrapper").css('display' , 'flex')
        }
        else{
            // console.log("subtab else")
            $(".sticky-wrapper").css('display' , 'none')
        }
        

        // mat-tab-header-pagination-chevron
        // mat-tab-header-pagination-chevron
        // console.log(getMenuWrapperSize , "menu wrapper subtab ")
        // console.log(getMenuSize , "get menu size subtab..")
    }
    ngAfterViewInit() {
    
        setTimeout(()=>{
            // let width = this.listscroll.elementRef.nativeElement.offsetWidth
            this.getTabLength(0)
            // console.log(width , "width subtab")

        },1000)
        
        
        // this.getTabLength()
        
    }

    ngOnInit(): void {}
    // @ViewChild('scrollable-tabs-items', { static: false }) scrollable: ElementRef;

    // moveLeft(event) {
    //     this.scrollable.scrollLeft += 20;
    // }
}
