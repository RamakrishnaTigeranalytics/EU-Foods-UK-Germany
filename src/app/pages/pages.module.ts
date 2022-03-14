import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module"

import { AppRoutingModule } from '../app-routing.module';
import {RouterModule} from '@angular/router';

// Components
import { ComponentModule } from '@components/components.module';

// Pages
import { PromoScenarioBuilderComponent } from './promo-scenario-builder/promo-scenario-builder.component';
import { PromoOptimizerComponent } from './promo-optimizer/promo-optimizer.component';
import { PricingToolComponent } from './pricing-tool/pricing-tool.component';
import { PromoToolComponent } from './promo-tool/promo-tool.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CountryPageComponent } from './country-page/country-page.component';
import { PricingScenarioBuilderComponent } from './pricing-scenario-builder/pricing-scenario-builder.component';
import { PricingScenarioBuilderAdminComponent } from './pricing-scenario-builder-admin/pricing-scenario-builder-admin.component';

@NgModule({
    imports: [RouterModule,CommonModule,ComponentModule,SharedModule,AppRoutingModule],
    declarations: [PromoScenarioBuilderComponent, PromoOptimizerComponent, PricingToolComponent, PromoToolComponent,
         HomePageComponent,CountryPageComponent,PricingScenarioBuilderComponent,
        PricingScenarioBuilderAdminComponent],

})
export class PagesModule {}
