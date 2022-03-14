import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/services';
import {User} from "@core/models"

@Component({
  selector: 'nwn-authentiction',
  templateUrl: './authentiction.component.html',
  styleUrls: ['./authentiction.component.css']
})
export class AuthentictionComponent implements OnInit {
  invalidLogin = false;
  user : User = null as any


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  signIn(creds) {
    this.authService.login(creds).subscribe(
      (data) => {
        // console.log(data , "LOGIN DATA")
        this.invalidLogin = false;
        localStorage.setItem('token', data['token']);
        localStorage.setItem('user' , JSON.stringify(data))
        this.authService.isLoggedInObservable.next(true);
        this.authService.setUser(data as User)
        // this.user  = data as User
        // let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl')
        this.authService.setShowArrow(true)
        this.router.navigate(['home-page']);
        

        // console.log(data, "LOGIN DATA")
      },
      (error) => {
        this.invalidLogin = true;
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        // localStorage.setItem('token','5e822efb0672751ca20584be198ca93420198678');
        // this.authService.isLoggedInObservable.next(true);
        // let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl')
        // this.router.navigate(['home']);
        // this.invalidLogin = true;
        // console.log(error,"ERROR")
      }
    );
  }

}
