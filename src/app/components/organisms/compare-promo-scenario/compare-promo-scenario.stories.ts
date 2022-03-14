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
import { ComparePromoScenarioComponent } from './compare-promo-scenario.component';

// Define component
export default {
    title: 'Organisms/ComparePromoScenarioComponent',
    component: ComparePromoScenarioComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [
                ComparePromoScenarioComponent,
                SvgIconComponent,
                ButtonComponent,
                CommandHeaderComponent,
                CommandIconitemComponent,
                CommandMultiselectComponent,
                CommandSearchComponent,
                SearchFooterComponent,
                TabCtaComponent,
                ComparePromoScenarioComponent,
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
// ComparePromoScenarioComponent
const ComparePromoScenarioComponentTemplate: Story<ComparePromoScenarioComponent> = (
    args: ComparePromoScenarioComponent,
) => ({
    props: { ...args },
    template: `<nwn-compare-promo-scenario></nwn-compare-promo-scenario>`,
});

export const ComparePromoScenario = ComparePromoScenarioComponentTemplate.bind({});
ComparePromoScenario.storyName = 'Compare Promo Scenario';
ComparePromoScenario.args = {};
