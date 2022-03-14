import { Component, Input,Output,EventEmitter } from '@angular/core';

@Component({
    selector: 'nwn-loaded-scenarioitem',
    templateUrl: './loaded-scenarioitem.component.html',
    styleUrls: ['./loaded-scenarioitem.component.css'],
})
export class LoadedScenarioitemComponent {
    @Input()
    title: string = 'Untitled';
    @Output()
    openInfoEvent = new EventEmitter()

    @Input()
    subtitle = "Pricing Scenario"
    // @Input()
    // info_promotion = null as any

    openInfo(modalId){
        this.openInfoEvent.emit(modalId)

    }
}
