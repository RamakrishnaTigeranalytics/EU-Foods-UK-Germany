import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {AuthService} from "@core/services/auth.services"
import {User} from "@core/models/user.model"
import { Observable } from 'rxjs';
import * as $ from 'jquery';
import { SimulatorService } from '@core/services';

@Component({
    selector: 'nwn-promo-header',
    templateUrl: './promo-header.component.html',
    styleUrls: ['./promo-header.component.css'],
})
export class PromoHeaderComponent {
    currentRoute = '';
    userdetail: User = null as any
    groups:any[] = []
    shortName:any = ''

    constructor(private authService: AuthService,location: Location,private router: Router,private simulatorService: SimulatorService) {
        router.events.subscribe((val) => {
            if (location.path() != '') {
                this.currentRoute = location.path();
            } else {
                this.currentRoute = '';
            }
        });
    }

    ngOnInit() {
        this.authService.getUser().subscribe(data=>{
            if(data){
                console.log("user in header" , data )
                this.userdetail = data
                console.log(this.userdetail , "setting user data in header")
                this.shortName = this.userdetail.user.email.charAt(0) 
                $('#userLogo').attr('data-letters',this.shortName.toUpperCase())
                // this.user.user.
                // this.groups = data.user.groups.map(d=>d.name)

            }
         
        })
    }

    isShowDivIf = true;

    toggleDisplayDivIf() {
        this.isShowDivIf = !this.isShowDivIf;
        setTimeout(()=>{
            $('#userLogo1').attr('data-letters',this.shortName.toUpperCase())
        },100)
    }

    openModal(id){
        this.isShowDivIf = !this.isShowDivIf;
        if(this.currentRoute == '/promo/simulator'){
            this.simulatorService.setSignoutPopupObservable({'type': 'simulator', 'id': id})
        }
        else if(this.currentRoute == '/promo/optimizer'){
            this.simulatorService.setSignoutPopupObservable({'type': 'optimizer', 'id': id})
        }
    }

    signout(){
        this.authService.logout().subscribe(data=>{
           localStorage.removeItem('token');
           localStorage.removeItem('user')
           this.authService.isLoggedInObservable.next(false);
           this.authService.setUser(null as any)
           this.router.navigate(['/'])
       })
    }
}
