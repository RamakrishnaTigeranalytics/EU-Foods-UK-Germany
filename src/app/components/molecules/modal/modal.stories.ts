// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import Menu Item
import { ModalComponent } from './modal.component';

// Define component
export default {
    title: 'Molecules/ModalComponent',
    component: ModalComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [ModalComponent],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
        icons: { control: 'select' },
    },
} as Meta;

// Define template
// Modal Component template
const ModalTemplate: Story<ModalComponent> = (args: ModalComponent) => ({
    props: { ...args },
    template: `<nwn-modal></nwn-modal>`,
});

//  Primary button
export const Modal = ModalTemplate.bind({});
Modal.storyName = 'Modal';
Modal.args = {};
