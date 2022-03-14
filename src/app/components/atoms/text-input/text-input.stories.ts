// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import TextInput
import { TextInputComponent } from './text-input.component';

// Define component
export default {
    title: 'Atoms/TextInput',
    component: TextInputComponent,
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
    // You dont have to define any control types, as they are already handled by SB 6.3
} as Meta;

// TextInputComponent
const TextInputTemplate: Story<TextInputComponent> = (args: TextInputComponent) => ({
    props: { ...args },
    template: `
        <nwn-text-input nwnTextInput="text"><p label>Scenario name</p></nwn-text-input>
    `,
});

export const TextInput = TextInputTemplate.bind({});
TextInput.storyName = 'Text Input';
TextInput.args = {};

// TextAreaTemplate
const TextAreaTemplate: Story<TextInputComponent> = (args: TextInputComponent) => ({
    props: { ...args },
    template: `
        <nwn-text-input nwnTextInput="textarea"><p label>Scenario name</p></nwn-text-input>
    `,
});

export const TextArea = TextAreaTemplate.bind({});
TextArea.storyName = 'Text Area';
TextArea.args = {};
