// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import Menu Item
import { MetricItemComponent } from './metric-item.component';

// Define component
export default {
    title: 'Molecules/MetricItem',
    component: MetricItemComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [MetricItemComponent],
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
const MetricItemTemplate: Story<MetricItemComponent> = (args: MetricItemComponent) => ({
    props: { ...args },
    template: `<nwn-metric-item></nwn-metric-item>`,
});

//  Primary button
export const MetricItem = MetricItemTemplate.bind({});
MetricItem.storyName = 'Metric Item';
MetricItem.args = {};
