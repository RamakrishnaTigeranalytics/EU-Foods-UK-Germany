import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthentictionComponent} from "./authentiction/authentiction.component"

const routes: Routes = [

  {
    path : ':tenant',
    children : [
      {path : 'login', component : AuthentictionComponent}
    ]
  }
//  {
//         path: 'country-page',
//         component: CountryPageComponent,
//         canActivate: [AuthGuard]
//     },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
