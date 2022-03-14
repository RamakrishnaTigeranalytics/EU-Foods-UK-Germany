import { Injectable } from '@angular/core';
import {CanActivate,Router} from "@angular/router"
import {ActivatedRouteSnapshot} from "@angular/router"
import {AuthService} from "./auth.services"

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService : AuthService, private router : Router) { }
  canActivate(route: ActivatedRouteSnapshot, ){
    if(this.authService.isLogged()){
      
      // let groups=this.authService.userObservable.getValue().user.groups.map(d=>d.name)
    //   let roles = route.data.roles 
    //   if( roles && !(roles.some(r=> groups.indexOf(r) >= 0))){
    //     this.router.navigate(['/home-page'])
    // return false

    //   }

    //   if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
    //     // role not authorised so redirect to home page
    //     this.router.navigate(['/']);
    //     return false;
    // }
      // console.log(route.data.roles , "groups inauth guard allowed reoles" )
      // console.log(, "groups inauth guard...")
      return true
    }
    this.router.navigate(['/login'])
    return false
  }
}
