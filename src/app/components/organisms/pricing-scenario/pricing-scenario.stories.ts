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
import { MetricItemPopupComponent } from '@molecules/metric-item-popup/metric-item-popup.component';
import { CheckboxComponent } from '@atoms/checkbox/checkbox.component';
import { CommandMultiselectComponent } from '@molecules/command-multiselect/command-multiselect.component';
import { ScenarioLoadCardComponent } from '@molecules/scenario-load-card/scenario-load-card.component';

// Import Menu Item
import { PricingScenarioComponent } from './pricing-scenario.component';

// Define component
export default {
    title: 'Organisms/PricingScenarioComponent',
    component: PricingScenarioComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [
                PricingScenarioComponent,
                SvgIconComponent,
                ButtonComponent,
                CommandHeaderComponent,
                CommandIconitemComponent,
                CommandMultiselectComponent,
                CommandSearchComponent,
                SearchFooterComponent,
                PricingScenarioComponent,
                CheckboxComponent,
                ScenarioLoadCardComponent,
                CellHeaderComponent,
                FilterItemComponent,
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
// PricingScenario
const PricingScenarioComponentTemplate: Story<PricingScenarioComponent> = (args: PricingScenarioComponent) => ({
    props: { ...args },
    template: `<nwn-pricing-scenario></nwn-pricing-scenario>`,
});

export const PricingScenario = PricingScenarioComponentTemplate.bind({});
PricingScenario.storyName = 'Pricing Scenario Load';
PricingScenario.args = {};
