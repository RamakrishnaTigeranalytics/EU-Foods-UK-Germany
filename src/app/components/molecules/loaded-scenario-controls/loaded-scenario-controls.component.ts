import { Component } from '@angular/core';

@Component({
    selector: 'nwn-loaded-scenario-controls',
    templateUrl: './loaded-scenario-controls.component.html',
    styleUrls: ['./loaded-scenario-controls.component.css'],
})
export class LoadedScenarioControlsComponent {
    isShowDivIf = true;

    toggleDisplayDivIf() {
        this.isShowDivIf = !this.isShowDivIf;
    }
}
