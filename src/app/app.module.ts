import { NgModule,ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Component
import { ComponentModule } from '@components/components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

// Pages
import { PagesModule } from '@pages/pages.module';
import {CoreModule} from "./core/core.module"

import {SharedModule} from "./shared/shared.module"
import {AuthModule} from "./auth/auth.module"
import { GlobalErrorHandler } from "@core/services/global-error-handler.service";
// import {AuthRoutingModule} from "./auth/auth-routing.module"
import { environment } from 'src/environments/environment';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule,
    NgxUiLoaderConfig,
    SPINNER,
    POSITION,
    PB_DIRECTION,
  } from "ngx-ui-loader";

  const ngxUiLoaderConfig: NgxUiLoaderConfig = {
    fgsColor: '#F4F4F5',
    logoUrl: "assets/favicons/loader-logo.jpg",
    logoPosition: "center-center",
    logoSize: 90,
    fgsPosition: POSITION.centerCenter,
    pbDirection: PB_DIRECTION.leftToRight,
    fgsSize: 40,
    fgsType: SPINNER.squareJellyBox,
    pbThickness: 5,
  };

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule, 
        AppRoutingModule, 
        AuthModule,
        // AuthRoutingModule,
        ComponentModule,
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot(), // ToastrModule added 
        PagesModule,CoreModule, 
        SharedModule,
        NoopAnimationsModule,
        NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
        NgxUiLoaderHttpModule.forRoot({ showForeground: true, 
          exclude: [
            environment.api_url + 'api/scenario/compare-scenario-download/'
          ] 
        })
    ],
    providers: [
      {
        provide : ErrorHandler,
        useClass : GlobalErrorHandler
      }
    ],
    bootstrap: [AppComponent],
  })

// @NgModule({
//     declarations: [AppComponent],
//     imports: [BrowserModule, AppRoutingModule, ComponentModule, PagesModule, ],
//     providers: [],
//     bootstrap: [AppComponent],
// })
export class AppModule {}
