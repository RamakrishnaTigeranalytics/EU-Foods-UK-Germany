// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { CheckboxComponent } from '@atoms/checkbox/checkbox.component';
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { ButtonComponent } from '@atoms/button/button.component';

// Import Menu Item
import { CommandMultiselectComponent } from './command-multiselect.component';

// Define component
export default {
    title: 'Molecules/CommandMultiselect',
    component: CommandMultiselectComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [CommandMultiselectComponent, SvgIconComponent, CheckboxComponent, ButtonComponent],
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
const CommandHeaderTemplate: Story<CommandMultiselectComponent> = (args: CommandMultiselectComponent) => ({
    props: { ...args },
    template: `<nwn-command-multiselect [closeButton]="false"></nwn-command-multiselect>`,
});

//  Primary button
export const CommandHeader = CommandHeaderTemplate.bind({});
CommandHeader.storyName = 'Command Multiselect';
CommandHeader.args = {};
