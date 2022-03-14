// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// import components

import { FilterItemComponent } from '@molecules/filter-item/filter-item.component';

// Import Menu Item
import { LargeToolTipComponent } from './large-tool-tip.component';

// Define component
export default {
    title: 'Molecules/LargeToolTipComponent',
    component: LargeToolTipComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [LargeToolTipComponent, FilterItemComponent],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
        icons: { control: 'select' },
    },
} as Meta;

// Define template
// LargeToolTipComponent
const LargeToolTipTemplate: Story<LargeToolTipComponent> = (args: LargeToolTipComponent) => ({
    props: { ...args },
    template: `<nwn-large-tool-tip></nwn-large-tool-tip>`,
});

export const LargeToolTip = LargeToolTipTemplate.bind({});
LargeToolTip.storyName = 'Large Tool Tip';
LargeToolTip.args = {};
