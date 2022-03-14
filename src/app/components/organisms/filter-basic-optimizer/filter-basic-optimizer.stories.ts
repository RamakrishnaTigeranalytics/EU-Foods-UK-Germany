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

import { TabNavItemComponent } from '@molecules/tab-nav-item/tab-nav-item.component';
import { TabCtaComponent } from '@atoms/tab-cta/tab-cta.component';

// Import Menu Item
import { FilterBasicOptimizerComponent } from './filter-basic-optimizer.component';

// Define component
export default {
    title: 'Organisms/Filterbasic',
    component: FilterBasicOptimizerComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [
                FilterBasicOptimizerComponent,
                SvgIconComponent,
                ButtonComponent,
                CommandHeaderComponent,
                CommandIconitemComponent,
                CommandSearchComponent,
                SearchFooterComponent,
                TabNavItemComponent,
                TabCtaComponent,
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
const FilterBasicTemplate: Story<FilterBasicOptimizerComponent> = (args: FilterBasicOptimizerComponent) => ({
    props: { ...args },
    template: `<nwn-filter-basic-optimizer></nwn-filter-basic-optimizer>`,
});

export const FilterBasic = FilterBasicTemplate.bind({});
FilterBasic.storyName = 'Filter basic';
FilterBasic.args = {};
