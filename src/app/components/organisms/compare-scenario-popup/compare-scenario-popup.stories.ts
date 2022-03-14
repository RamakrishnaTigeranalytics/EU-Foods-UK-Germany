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
import { KpiMetricsComponent } from '@molecules/kpi-metrics/kpi-metrics.component';
import { PromotionPlansTabComponent } from '@molecules/promotion-plans-tab/promotion-plans-tab.component';

import { TabCtaComponent } from '@atoms/tab-cta/tab-cta.component';

// Import Menu Item
import { CompareScenarioPopupComponent } from './compare-scenario-popup.component';

// Define component
export default {
    title: 'Organisms/CompareScenarioPopupComponent',
    component: CompareScenarioPopupComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [
                CompareScenarioPopupComponent,
                SvgIconComponent,
                ButtonComponent,
                CommandHeaderComponent,
                CommandIconitemComponent,
                CommandMultiselectComponent,
                CommandSearchComponent,
                SearchFooterComponent,
                TabCtaComponent,
                CheckboxComponent,
                ScenarioLoadCardComponent,
                KpiMetricsComponent,
                PromotionPlansTabComponent,
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
// CompareScenarioPopupComponent
const CompareScenarioPopupComponentTemplate: Story<CompareScenarioPopupComponent> = (
    args: CompareScenarioPopupComponent,
) => ({
    props: { ...args },
    template: `<nwn-compare-scenario-popup></nwn-compare-scenario-popup>`,
});

export const CompareScenarioPopup = CompareScenarioPopupComponentTemplate.bind({});
CompareScenarioPopup.storyName = 'Compare Promo Scenario';
CompareScenarioPopup.args = {};
