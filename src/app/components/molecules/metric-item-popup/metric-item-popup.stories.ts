// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import Menu Item
import { MetricItemPopupComponent } from './metric-item-popup.component';

// Define component
export default {
    title: 'Molecules/MetricItemPopupComponent',
    component: MetricItemPopupComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [MetricItemPopupComponent],
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
const MetricItemPopupTemplate: Story<MetricItemPopupComponent> = (args: MetricItemPopupComponent) => ({
    props: { ...args },
    template: `<nwn-metric-item-popup><p metricPopHead>$19.82</p><p metricPopContent>List price (simulated)</p></nwn-metric-item-popup>`,
});

//  Primary button
export const MetricItemPopup = MetricItemPopupTemplate.bind({});
MetricItemPopup.storyName = 'Metric Item Popup';
MetricItemPopup.args = {};
