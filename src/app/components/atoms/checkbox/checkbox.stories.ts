// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';

// Import Menu Item
import { CheckboxComponent } from './checkbox.component';

// Define component
export default {
    title: 'Atoms/Checkbox',
    component: CheckboxComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [CheckboxComponent, SvgIconComponent],
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
const CheckboxTemplate: Story<CheckboxComponent> = (args: CheckboxComponent) => ({
    props: { ...args },
    template: `<nwn-checkbox [showLabel]="true"></nwn-checkbox>`,
});

//  Primary button
export const Checkbox = CheckboxTemplate.bind({});
Checkbox.storyName = 'Check Box';
Checkbox.args = {};
