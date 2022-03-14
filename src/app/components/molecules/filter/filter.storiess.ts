// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { ButtonComponent } from '@atoms/button/button.component';
import { CheckboxComponent } from '@atoms/checkbox/checkbox.component';

import { CommandHeaderComponent } from '@molecules/command-header/command-header.component';
import { CommandSearchComponent } from '@molecules/command-search/command-search.component';
import { CommandIconitemComponent } from '@molecules/command-iconitem/command-iconitem.component';
import { CommandMultiselectComponent } from '@molecules/command-multiselect/command-multiselect.component';

// Import Menu Item
import { FilterComponent } from './filter.component';

// Define component
export default {
    title: 'UnderMaintenance/Filter',
    component: FilterComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [
                FilterComponent,
                SvgIconComponent,
                ButtonComponent,
                CheckboxComponent,
                CommandHeaderComponent,
                CommandSearchComponent,
                CommandIconitemComponent,
                CommandMultiselectComponent,
            ],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
        icons: { control: 'select' },
    },
} as Meta;

// Define template
// primary button template
const FilterTemplate: Story<FilterComponent> = (args: FilterComponent) => ({
    props: { ...args },
    template: `<nwn-filter></nwn-filter>`,
});

//  Primary button
export const Filter = FilterTemplate.bind({});
Filter.storyName = 'Filter ';
Filter.args = {};
