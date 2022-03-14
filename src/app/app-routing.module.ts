import { NgModule } from '@angular/core';
import { RouterModule, Routes,PreloadAllModules  } from '@angular/router';

// Pages
import { PromoToolComponent } from '@pages/promo-tool/promo-tool.component';
import { PromoScenarioBuilderComponent } from '@pages/promo-scenario-builder/promo-scenario-builder.component';
import { PromoOptimizerComponent } from '@pages/promo-optimizer/promo-optimizer.component';
import { PricingToolComponent } from '@pages/pricing-tool/pricing-tool.component';
import {AuthGuard} from "@core/services"
import { HomePageComponent } from '@pages/home-page/home-page.component';
import { CountryPageComponent } from '@pages/country-page/country-page.component';
import { PricingScenarioBuilderComponent } from '@pages/pricing-scenario-builder/pricing-scenario-builder.component';
import { PricingScenarioBuilderAdminComponent } from '@pages/pricing-scenario-builder-admin/pricing-scenario-builder-admin.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TenantInterceptorService } from '@core/services/tenant-interceptor.service';

// Routes
// const routes: Routes = [
//     {
//         path: '',
//         redirectTo: '/promo-tool/promo-scenario-builder',
//         pathMatch: 'full',
//     },
//     {
//         path: 'promo-tool',
//         component: PromoToolComponent,
//         children: [
//             {
//                 path: 'promo-scenario-builder',
//                 component: PromoScenarioBuilderComponent,
//             },
//             {
//                 path: 'promo-optimizer',
//                 component: PromoOptimizerComponent,
//             },
//         ],
//     },
//     {
//         path: 'pricing-tool',
//         component: PricingToolComponent,
//     },
// ];


const routes: Routes = [
    {
        path: 'country-page',
        component: CountryPageComponent,
        // canActivate: [AuthGuard]
    },

    {
        path : ':tenant',
        children : [
            {
                path: 'promo',
                component: PromoToolComponent,
                canActivate: [AuthGuard],
                // data: { roles: ["promo" , "admin" , "optimizer"] },
                 
                children: [
                    {
                        path: 'simulator',
                        component: PromoScenarioBuilderComponent
                    },
                    {
                        path: 'optimizer',
                        component: PromoOptimizerComponent
                    },
                    { path: "", redirectTo: "simulator", pathMatch: "full" }
                ]
            },
            {
                path: 'pricing-tool',
                component: PricingToolComponent,
                canActivate: [AuthGuard],
                // data: { roles: ["pricing" , "admin"] },
                children: [
                    {
                        path: 'pricing-scenario-builder',
                        component: PricingScenarioBuilderComponent,
                    },
                    {
                        path: 'admin-pricing-scenario-builder',
                        component: PricingScenarioBuilderAdminComponent,
                    },
                    { path: "", redirectTo: "pricing-scenario-builder", pathMatch: "full" }
                ],
            },
            {
                path: 'profit',
                component: PricingToolComponent
            },
           
            {
                path: 'srm',
                component: PricingToolComponent
            },
            {
                path: 'home-page',
                component: HomePageComponent,
                canActivate: [AuthGuard]
            },
           
            {
                path: '',
                pathMatch : 'full',
                redirectTo : 'home-page'
                
            },
            // // {
            //     path: '**',
            //     redirectTo: '/uk/login',
            //     pathMatch: 'full'
            // }
            
        ]
    } ,
    {
        path: '',
        pathMatch : 'full',
        redirectTo : 'country-page'
        
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes,{
        // enableTracing:true
        // preload all modules; optionally we could
        // implement a custom preloading strategy for just some
        // of the modules (PRs welcome 😉)
        // preloadingStrategy: PreloadAllModules,
        // relativeLinkResolution: 'legacy'
    })],
    exports: [RouterModule],
    declarations: [],
    providers:[
        {
            provide : HTTP_INTERCEPTORS,
            useClass: TenantInterceptorService, 
            multi: true
        }
    ]
})
export class AppRoutingModule {}
