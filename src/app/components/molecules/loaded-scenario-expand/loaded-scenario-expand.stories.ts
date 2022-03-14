// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { ButtonComponent } from '@atoms/button/button.component';
import { SimulatedFilterItemComponent } from '@atoms/simulated-filter-item/simulated-filter-item.component';
import { PromoElasticityComponent } from '@molecules/promo-elasticity/promo-elasticity.component';
import { WeeklyPromotionComponent } from '@molecules/weekly-promotion/weekly-promotion.component';

// Import Menu Item
import { LoadedScenarioExpandComponent } from './loaded-scenario-expand.component';

// Define component
export default {
    title: 'Molecules/LoadedScenarioExpand',
    component: LoadedScenarioExpandComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [
                LoadedScenarioExpandComponent,
                PromoElasticityComponent,
                SimulatedFilterItemComponent,
                SvgIconComponent,
                ButtonComponent,
                WeeklyPromotionComponent,
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
const LoadedScenarioExpandTemplate: Story<LoadedScenarioExpandComponent> = (args: LoadedScenarioExpandComponent) => ({
    props: { ...args },
    template: `<nwn-loaded-scenario-expand></nwn-loaded-scenario-expand>`,
});

//  Primary button
export const LoadedScenarioExpand = LoadedScenarioExpandTemplate.bind({});
LoadedScenarioExpand.storyName = 'Loaded Scenario Expand';
LoadedScenarioExpand.args = {};
