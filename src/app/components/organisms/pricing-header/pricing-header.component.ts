import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '@core/models';
import{AuthService } from "@core/services"
@Component({
    selector: 'nwn-pricing-header',
    templateUrl: './pricing-header.component.html',
    styleUrls: ['./pricing-header.component.css'],
})
export class PricingHeaderComponent {
    user$ : Observable<User>
    currentRoute = '';
    is_admin = false

    constructor(location: Location, router: Router,private authService : AuthService,) {
        router.events.subscribe((val) => {
            if (location.path() != '') {
                this.currentRoute = location.path();
            } else {
                this.currentRoute = '';
            }
        });
    }

    ngOnInit() {
        this.user$ = this.authService.getUser()
        this.user$.subscribe(data=>{
            // console.log(data , "user data...")
            if(data){

                this.is_admin = data.user.is_superuser
              
            }
        })
    }
}
