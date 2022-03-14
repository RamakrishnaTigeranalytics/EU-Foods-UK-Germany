// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { ButtonComponent } from '@atoms/button/button.component';

// Import Menu Item
import { FilterItemComponent } from './filter-item.component';

// Define component
export default {
    title: 'Molecules/FilterItem',
    component: FilterItemComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [FilterItemComponent, SvgIconComponent, ButtonComponent],
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
const FilterItemTemplate: Story<FilterItemComponent> = (args: FilterItemComponent) => ({
    props: { ...args },
    template: `<nwn-filter-item>2 retailer</nwn-filter-item>`,
});

//  Primary button
export const FilterItem = FilterItemTemplate.bind({});
FilterItem.storyName = 'Filter Item';
FilterItem.args = {};
