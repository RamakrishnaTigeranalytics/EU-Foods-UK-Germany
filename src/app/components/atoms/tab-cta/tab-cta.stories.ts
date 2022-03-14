// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import Link
import { TabCtaComponent } from './tab-cta.component';

// Define component
export default {
    title: 'Atoms/Tab-CTA',
    component: TabCtaComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
        type: { control: 'select' },
    },
    // You dont have to define any control types, as they are already handled by SB 6.3
} as Meta;

// Toggle CTA template
const TabCtaComponentTemplate: Story<TabCtaComponent> = (args: TabCtaComponent) => ({
    props: { ...args },
    template: `
        <nwn-tab-cta [type]='type'>Aggregated</nwn-tab-cta>
    `,
});

// Create an instances of the component

export const TabCta = TabCtaComponentTemplate.bind({});
TabCta.storyName = 'Tab CTA';
TabCta.args = {
    type: 'selectedtab',
};
