// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { ButtonComponent } from '@atoms/button/button.component';
import { SimulatedFilterItemComponent } from '@atoms/simulated-filter-item/simulated-filter-item.component';

import { TabCtaComponent } from '@atoms/tab-cta/tab-cta.component';
import { TabNavItemComponent } from '@molecules/tab-nav-item/tab-nav-item.component';
import { ToggleCtaComponent } from '@atoms/toggle-cta/toggle-cta.component';
import { ToggleComponent } from '@molecules/toggle/toggle.component';
import { LegendItemsComponent } from '@atoms/legend-items/legend-items.component';
import { TableViewComponent } from '@molecules/table-view/table-view.component';
import { CellItemComponent } from '@molecules/cell-item/cell-item.component';
import { CellWeekItemComponent } from '@molecules/cell-week-item/cell-week-item.component';

import { SummaryPlaceholderComponent } from '@molecules/summary-placeholder/summary-placeholder.component';

import { PromoscenariobuilderInitialstateComponent } from '@organisms/promoscenariobuilder-initialstate/promoscenariobuilder-initialstate.component';

import { FilterItemComponent } from '@molecules/filter-item/filter-item.component';
import { LoadedScenarioitemComponent } from '@molecules/loaded-scenarioitem/loaded-scenarioitem.component';
import { PromoElasticityComponent } from '@molecules/promo-elasticity/promo-elasticity.component';

import { CellHeaderComponent } from '@atoms/cell-header/cell-header.component';

import { CellItemDirective } from '@molecules/cell-item/cell-item.directive';

// Import Menu Item
import { SummaryComponent } from './summary.component';

// Define component
export default {
    title: 'Organisms/SummaryComponent',
    component: SummaryComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [
                SummaryComponent,
                SummaryPlaceholderComponent,
                SvgIconComponent,
                ButtonComponent,
                FilterItemComponent,
                LoadedScenarioitemComponent,
                PromoElasticityComponent,
                SimulatedFilterItemComponent,
                PromoscenariobuilderInitialstateComponent,
                TabCtaComponent,
                TabNavItemComponent,
                ToggleCtaComponent,
                ToggleComponent,
                LegendItemsComponent,
                TableViewComponent,
                CellItemComponent,
                CellWeekItemComponent,
                CellHeaderComponent,
                CellItemDirective,
            ],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
    },
} as Meta;

// Define template
// Summary Component
const SummaryComponentSectionTemplate: Story<SummaryComponent> = (args: SummaryComponent) => ({
    props: { ...args },
    template: `<nwn-summary></nwn-summary>`,
});

export const SummaryComponentSection = SummaryComponentSectionTemplate.bind({});
SummaryComponentSection.storyName = 'Summary Component';
SummaryComponentSection.args = {};
