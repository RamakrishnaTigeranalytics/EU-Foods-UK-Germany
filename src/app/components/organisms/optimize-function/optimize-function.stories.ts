// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { ButtonComponent } from '@atoms/button/button.component';
import { SimulatedFilterItemComponent } from '@atoms/simulated-filter-item/simulated-filter-item.component';

import { FilterItemComponent } from '@molecules/filter-item/filter-item.component';
import { ModalComponent } from '@molecules/modal/modal.component';
import { LoadedScenarioitemComponent } from '@molecules/loaded-scenarioitem/loaded-scenarioitem.component';
import { PromoElasticityComponent } from '@molecules/promo-elasticity/promo-elasticity.component';
import { FilterBasicComponent } from '@organisms/filter-basic/filter-basic.component';

import { CommandHeaderComponent } from '@molecules/command-header/command-header.component';
import { CommandIconitemComponent } from '@molecules/command-iconitem/command-iconitem.component';
import { CommandSearchComponent } from '@molecules/command-search/command-search.component';
import { SearchFooterComponent } from '@molecules/search-footer/search-footer.component';

import { TabNavItemComponent } from '@molecules/tab-nav-item/tab-nav-item.component';
import { TabCtaComponent } from '@atoms/tab-cta/tab-cta.component';

// Import Menu Item
import { OptimizeFunctionComponent } from './optimize-function.component';

// Define component
export default {
    title: 'Organisms/OptimizeFunctionComponent',
    component: OptimizeFunctionComponent,
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [
                OptimizeFunctionComponent,
                SvgIconComponent,
                ButtonComponent,
                FilterItemComponent,
                LoadedScenarioitemComponent,
                PromoElasticityComponent,
                SimulatedFilterItemComponent,
                ModalComponent,
                FilterBasicComponent,
                CommandHeaderComponent,
                CommandIconitemComponent,
                CommandSearchComponent,
                SearchFooterComponent,
                TabNavItemComponent,
                TabCtaComponent,
            ],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
    },
} as Meta;

// Define template
// OptimizeFunctionComponent
const OptimizeFunctionComponentTemplate: Story<OptimizeFunctionComponent> = (args: OptimizeFunctionComponent) => ({
    props: { ...args },
    template: `<nwn-optimize-function></nwn-optimize-function>`,
});

export const OptimizeFunction = OptimizeFunctionComponentTemplate.bind({});
OptimizeFunction.storyName = 'Opened Modal';
OptimizeFunction.args = {};
