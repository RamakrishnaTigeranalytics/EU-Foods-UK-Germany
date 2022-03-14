// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { ButtonComponent } from '@atoms/button/button.component';
import { TabCtaComponent } from '@atoms/tab-cta/tab-cta.component';
import { TabNavItemComponent } from '@molecules/tab-nav-item/tab-nav-item.component';
import { ToggleCtaComponent } from '@atoms/toggle-cta/toggle-cta.component';
import { ToggleComponent } from '@molecules/toggle/toggle.component';
import { LegendItemsComponent } from '@atoms/legend-items/legend-items.component';
import { TableViewComponent } from '@molecules/table-view/table-view.component';
import { CellHeaderComponent } from '@atoms/cell-header/cell-header.component';

import { CellItemComponent } from '@molecules/cell-item/cell-item.component';
import { CellItemDirective } from '@molecules/cell-item/cell-item.directive';
import { CellWeekItemComponent } from '@molecules/cell-week-item/cell-week-item.component';

// Import Menu Item
import { PromoscenariobuilderInitialstateComponent } from './promoscenariobuilder-initialstate.component';

// Define component
export default {
    title: 'Molecules/PromoscenariobuilderInitialstate',
    component: PromoscenariobuilderInitialstateComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [
                PromoscenariobuilderInitialstateComponent,
                SvgIconComponent,
                ButtonComponent,
                TabNavItemComponent,
                TabCtaComponent,
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
        type: { control: 'select' },
    },
} as Meta;

// Define template
const PromoscenariobuilderInitialstateTemplate: Story<PromoscenariobuilderInitialstateComponent> = (
    args: PromoscenariobuilderInitialstateComponent,
) => ({
    props: { ...args },
    template: `<nwn-promoscenariobuilder-initialstate></nwn-promoscenariobuilder-initialstate>`,
});

export const PromoscenariobuilderInitialstate = PromoscenariobuilderInitialstateTemplate.bind({});
PromoscenariobuilderInitialstate.storyName = 'Promoscenariobuilder Initialstate';
PromoscenariobuilderInitialstate.args = {};
