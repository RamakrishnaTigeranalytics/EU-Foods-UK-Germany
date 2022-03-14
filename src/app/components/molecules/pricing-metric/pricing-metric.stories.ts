// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { ButtonComponent } from '@atoms/button/button.component';

// Import Menu Item
import { PricingMetricComponent } from './pricing-metric.component';

// Define component
export default {
    title: 'Molecules/PricingMetric',
    component: PricingMetricComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [PricingMetricComponent, SvgIconComponent, ButtonComponent],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
    },
} as Meta;

// Define template
// primary button template
const PricingMetricTemplate: Story<PricingMetricComponent> = (args: PricingMetricComponent) => ({
    props: { ...args },
    template: `<nwn-pricing-metric>Pricing Metric</nwn-pricing-metric>`,
});

//  Primary button
export const PricingMetric = PricingMetricTemplate.bind({});
PricingMetric.storyName = 'Pricing Metric';
PricingMetric.args = {};
