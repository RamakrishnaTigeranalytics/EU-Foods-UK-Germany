// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { ButtonComponent } from '@atoms/button/button.component';
import { CellHeaderComponent } from '@atoms/cell-header/cell-header.component';
import { FilterItemComponent } from '@molecules/filter-item/filter-item.component';
import { CommandHeaderComponent } from '@molecules/command-header/command-header.component';
import { CommandIconitemComponent } from '@molecules/command-iconitem/command-iconitem.component';
import { CommandSearchComponent } from '@molecules/command-search/command-search.component';
import { SearchFooterComponent } from '@molecules/search-footer/search-footer.component';
import { CheckboxComponent } from '@atoms/checkbox/checkbox.component';
import { CommandMultiselectComponent } from '@molecules/command-multiselect/command-multiselect.component';
import { ScenarioLoadCardComponent } from '@molecules/scenario-load-card/scenario-load-card.component';
import { MetricItemPopupComponent } from '@molecules/metric-item-popup/metric-item-popup.component';

// Import Menu Item
import { LoadedPricingScenarioComponent } from './loaded-pricing-scenario.component';

// Define component
export default {
    title: 'Organisms/LoadedPricingScenarioComponent',
    component: LoadedPricingScenarioComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [
                LoadedPricingScenarioComponent,
                SvgIconComponent,
                ButtonComponent,
                CellHeaderComponent,
                FilterItemComponent,
                CommandHeaderComponent,
                CommandIconitemComponent,
                CommandMultiselectComponent,
                CommandSearchComponent,
                SearchFooterComponent,
                LoadedPricingScenarioComponent,
                CheckboxComponent,
                ScenarioLoadCardComponent,
                MetricItemPopupComponent,
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
const LoadedPricingScenarioComponentTemplate: Story<LoadedPricingScenarioComponent> = (
    args: LoadedPricingScenarioComponent,
) => ({
    props: { ...args },
    template: `<nwn-loaded-pricing-scenario></nwn-loaded-pricing-scenario>`,
});

export const LoadedPricingScenario = LoadedPricingScenarioComponentTemplate.bind({});
LoadedPricingScenario.storyName = 'Loaded Pricing Scenario';
LoadedPricingScenario.args = {};
