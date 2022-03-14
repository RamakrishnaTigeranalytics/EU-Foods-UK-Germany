import { Component, Input , Output , EventEmitter } from '@angular/core';

@Component({
    selector: 'nwn-search-footer',
    templateUrl: './search-footer.component.html',
    styleUrls: ['./search-footer.component.css'],
})
export class SearchFooterComponent {
    @Input()
    showApply: boolean = false;
    @Input()
    showBack: boolean = false;
    @Input()
    showLoad: boolean = false;
    @Input()
    showKeyBoardCtrl: boolean = false;
    @Input()
    showClose: boolean = false;
    @Input()
    showAdd: boolean = false;
    @Input()
    showSaved: boolean = false;
    @Input()
    showCompare: boolean = false;
    @Input()
    disabled: boolean = false;
    @Input()
    showYes: boolean = false;
    @Input()
    showNo: boolean = false;
    @Input()
    showSaveAs: boolean = false;
    @Input()
    type = '';
    @Input()
    color: string | 'bgGray-50' | 'bgWhite' = 'bgGray-50';
    @Output()
    buttonClickedEvent = new EventEmitter()
    @Output()
    SaveScenarioEvent = new EventEmitter()

    buttonClicked(type){
        if(type == 'save' || type == 'saveas'){
            this.SaveScenarioEvent.emit(type)
        }
        else{
            this.buttonClickedEvent.emit(type)
        }
    }
}
