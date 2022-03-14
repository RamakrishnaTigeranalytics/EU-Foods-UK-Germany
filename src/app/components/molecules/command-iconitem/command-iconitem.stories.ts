// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { ButtonComponent } from '@atoms/button/button.component';

// Import Menu Item
import { CommandIconitemComponent } from './command-iconitem.component';

// Define component
export default {
    title: 'Molecules/CommandIconitem',
    component: CommandIconitemComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [CommandIconitemComponent, SvgIconComponent, ButtonComponent],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
    },
} as Meta;

// Define template
// primary button template
const CommandIconitemTemplate: Story<CommandIconitemComponent> = (args: CommandIconitemComponent) => ({
    props: { ...args },
    template: `<nwn-command-iconitem [borderLeft]="true">Filter by retailer</nwn-command-iconitem>`,
});

//  Primary button
export const CommandIconitem = CommandIconitemTemplate.bind({});
CommandIconitem.storyName = 'Command Icon Item';
CommandIconitem.args = {};
