// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import Menu Item
import { ChartToolTipComponent } from './chart-tool-tip.component';

// Define component
export default {
    title: 'UnderMaintenance/ChartToolTip',
    component: ChartToolTipComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [ChartToolTipComponent],
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
const ChartToolTipTemplate: Story<ChartToolTipComponent> = (args: ChartToolTipComponent) => ({
    props: { ...args },
    template: `<nwn-chart-tool-tip></nwn-chart-tool-tip>`,
});

//  Primary button
export const ChartToolTip = ChartToolTipTemplate.bind({});
ChartToolTip.storyName = 'Chart Tool Tip';
ChartToolTip.args = {};
