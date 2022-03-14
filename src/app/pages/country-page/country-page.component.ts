import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '@core/models';
import {AuthService} from "@core/services"

@Component({
  selector: 'nwn-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css']
})
export class CountryPageComponent implements OnInit {
  user : User
  groups : any[] = []

  constructor(private router: Router , private authService : AuthService) { }

  ngOnInit(): void {
    this.user=this.authService.userObservable.getValue()
    // this.groups = this.user.user.groups.map(d=>d.name)
    console.log(this.user , "user value inhome page")
  }

  redirectTenant(id){
    this.router.navigate(['/'+ id])

  }
  redirectPage(url: any){
    if(url == 'pricing-tool'){
      this.router.navigate(['/pricing-tool'])
      // window.open("https://mars-tool.azurewebsites.net/", '_blank')
    }
    else if(url == 'promo-tool'){
      this.router.navigate(['/promo'])
    }
    else if(url == 'profit-tool'){
      this.router.navigate(['/profit'])
    }
    else if(url == 'pricing-capabilities'){
      this.router.navigate(['/pricing'])
    }
    else if(url == 'srm-insight'){
      this.router.navigate(['/srm'])
    }
 }

}