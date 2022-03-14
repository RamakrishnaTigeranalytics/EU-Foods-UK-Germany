import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthentictionComponent } from './authentiction/authentiction.component';
import { SharedModule } from '../shared/shared.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    AuthentictionComponent
  ],
  imports: [
    RouterModule,
    SharedModule,
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
