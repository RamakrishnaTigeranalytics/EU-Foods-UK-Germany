// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import Link
import { ToggleCtaComponent } from './toggle-cta.component';

// Define component
export default {
    title: 'Atoms/Toggle-CTA',
    component: ToggleCtaComponent,
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
const ToggleCtaTemplate: Story<ToggleCtaComponent> = (args: ToggleCtaComponent) => ({
    props: { ...args },
    template: `
        <nwn-toggle-cta [type]='type'>Absolute change</nwn-toggle-cta>
    `,
});

// Create an instances of the component

export const ToggleCta = ToggleCtaTemplate.bind({});
ToggleCta.storyName = 'Toggle CTA';
ToggleCta.args = {
    type: 'unselected',
};
