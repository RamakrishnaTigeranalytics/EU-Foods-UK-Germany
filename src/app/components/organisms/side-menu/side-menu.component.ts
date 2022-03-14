import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'nwn-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {
    // @Input()
    // href = '/';

    currentRoute = '';

    constructor(location: Location, router: Router) {
        // router.events.subscribe((val) => {
        //     if (location.path() != '') {
        //         this.currentRoute = location.path();
        //     } else {
        //         this.currentRoute = '';
        //     }
        // });
    }

    ngOnInit() {}
}
