// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { ButtonComponent } from '@atoms/button/button.component';
import { SimulatedFilterItemComponent } from '@atoms/simulated-filter-item/simulated-filter-item.component';

import { FilterItemComponent } from '@molecules/filter-item/filter-item.component';
import { LoadedScenarioitemComponent } from '@molecules/loaded-scenarioitem/loaded-scenarioitem.component';
import { PromoElasticityComponent } from '@molecules/promo-elasticity/promo-elasticity.component';

// Import Menu Item
import { LoadedScenarioHeaderComponent } from './loaded-scenario-header.component';

// Define component
export default {
    title: 'Organisms/LoadedScenarioHeader',
    component: LoadedScenarioHeaderComponent,
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [
                LoadedScenarioHeaderComponent,
                SvgIconComponent,
                ButtonComponent,
                FilterItemComponent,
                LoadedScenarioitemComponent,
                PromoElasticityComponent,
                SimulatedFilterItemComponent,
            ],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
    },
} as Meta;

// Define template
// primary button template
const LoadedScenarioHeaderTemplate: Story<LoadedScenarioHeaderComponent> = (args: LoadedScenarioHeaderComponent) => ({
    props: { ...args },
    template: `<nwn-loaded-scenario-header ></nwn-loaded-scenario-header>`,
});

//  Primary button
export const LoadedScenarioHeader = LoadedScenarioHeaderTemplate.bind({});
LoadedScenarioHeader.storyName = 'Loaded Scenario Header';
LoadedScenarioHeader.args = {};
