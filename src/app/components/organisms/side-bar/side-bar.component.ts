import { Component, OnInit } from '@angular/core';
import{AuthService } from "@core/services"
import { Router,NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '@core/models';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'nwn-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
    user$ : Observable<User>
    is_promo= environment.is_promo
    is_optimizer= environment.is_optimizer
    is_dash= environment.is_dash
    login_route =['/login']
    homePage = ['/home-page' , '/country-page' , '/']
    hide_side = false
    is_logged_in = false
    constructor(private authService : AuthService,private router: Router){
        router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                // console.log(val, 'VAL OF ROUTER ');
                console.log(val.url, 'VAL OF ROUTER ');
                if (this.login_route.includes(val.url) || this.homePage.includes(val.url)) {
                  // this.hideNav()
                  this.hide_side = true;
                } else {
                  this.hide_side = false;
                }
                 
              }
        });

    }
    ngOnInit(){
        this.user$ = this.authService.getUser()
        this.user$.subscribe(data=>{
            console.log(data , "user data...")
            if(data){

               this.is_logged_in = true 
            }
        })
    }
    redirectPage(){
        window.open("https://mars-tool.azurewebsites.net/", '_blank')
    }

    logout(){
this.authService.logout().subscribe(data=>{
     localStorage.removeItem('token');
    localStorage.removeItem('user')
    this.authService.isLoggedInObservable.next(false);
    this.authService.setUser(null as any)
    // this.router.navigate(['/login'])
    this.router.navigate(['/'])
})

    }
}
