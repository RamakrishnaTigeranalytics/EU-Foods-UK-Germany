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
import { NumberPromoWeeksComponent } from './number-promo-weeks.component';

// Define component
export default {
    title: 'Organisms/NumberPromoWeeks',
    component: NumberPromoWeeksComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [
                NumberPromoWeeksComponent,
                SvgIconComponent,
                ButtonComponent,
                CellHeaderComponent,
                FilterItemComponent,
                CommandHeaderComponent,
                CommandIconitemComponent,
                CommandSearchComponent,
                SearchFooterComponent,
                CheckboxComponent,
                CommandMultiselectComponent,
                ScenarioLoadCardComponent,
                MetricItemPopupComponent,
            ],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
    },
} as Meta;

// Define template
// NumberPromoWeeksComponent template
const NumberPromoWeeksTemplate: Story<NumberPromoWeeksComponent> = (args: NumberPromoWeeksComponent) => ({
    props: { ...args },
    template: `<nwn-number-promo-weeks></nwn-number-promo-weeks>`,
});

//
export const NumberPromoWeeks = NumberPromoWeeksTemplate.bind({});
NumberPromoWeeks.storyName = 'Number Promo Weeks';
NumberPromoWeeks.args = {};
