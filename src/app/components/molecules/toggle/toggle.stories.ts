// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { ToggleCtaComponent } from '@atoms/toggle-cta/toggle-cta.component';

// Import Menu Item
import { ToggleComponent } from './toggle.component';

// Define component
export default {
    title: 'Molecules/Toggle',
    component: ToggleComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [ToggleComponent, ToggleCtaComponent],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
        type: { control: 'select' },
    },
} as Meta;

// Define template
// Summary Placeholder Template
const ToggleComponentTemplate: Story<ToggleComponent> = (args: ToggleComponent) => ({
    props: { ...args },
    template: `<nwn-toggle></nwn-toggle>`,
});

export const Toggle = ToggleComponentTemplate.bind({});
Toggle.storyName = 'Toggle ';
Toggle.args = {};
