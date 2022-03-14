// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { ButtonComponent } from '@atoms/button/button.component';
import { CommandHeaderComponent } from '@molecules/command-header/command-header.component';
import { CommandIconitemComponent } from '@molecules/command-iconitem/command-iconitem.component';
import { CommandSearchComponent } from '@molecules/command-search/command-search.component';
import { SearchFooterComponent } from '@molecules/search-footer/search-footer.component';
import { CheckboxComponent } from '@atoms/checkbox/checkbox.component';
import { CommandMultiselectComponent } from '@molecules/command-multiselect/command-multiselect.component';
import { ScenarioLoadCardComponent } from '@molecules/scenario-load-card/scenario-load-card.component';

import { TabCtaComponent } from '@atoms/tab-cta/tab-cta.component';

// Import Menu Item
import { LoadScenarioPricingComponent } from './load-scenario-pricing.component';

// Define component
export default {
    title: 'Organisms/LoadScenarioPricingComponent',
    component: LoadScenarioPricingComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [
                LoadScenarioPricingComponent,
                SvgIconComponent,
                ButtonComponent,
                CommandHeaderComponent,
                CommandIconitemComponent,
                CommandMultiselectComponent,
                CommandSearchComponent,
                SearchFooterComponent,
                TabCtaComponent,
                LoadScenarioPricingComponent,
                CheckboxComponent,
                ScenarioLoadCardComponent,
            ],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
        type: { control: 'select' },
    },
} as Meta;

// Define template
// LoadScenarioPricing
const LoadScenarioPricingComponentTemplate: Story<LoadScenarioPricingComponent> = (
    args: LoadScenarioPricingComponent,
) => ({
    props: { ...args },
    template: `<nwn-load-scenario-pricing></nwn-load-scenario-pricing>`,
});

export const LoadScenarioPricing = LoadScenarioPricingComponentTemplate.bind({});
LoadScenarioPricing.storyName = 'Load scenario pricing';
LoadScenarioPricing.args = {};
