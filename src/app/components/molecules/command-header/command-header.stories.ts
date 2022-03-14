// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { SvgIconDirective } from '@atoms/svg-icon/svg-icon.directive';

// Import Menu Item
import { CommandHeaderComponent } from './command-header.component';

// Define component
export default {
    title: 'Molecules/CommandHeader',
    component: CommandHeaderComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [CommandHeaderComponent, SvgIconComponent, SvgIconDirective],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
    },
} as Meta;

// Define template
// primary button template
const CommandHeaderTemplate: Story<CommandHeaderComponent> = (args: CommandHeaderComponent) => ({
    props: { ...args },
    template: `<nwn-command-header type="stroke" nwnSvgIcon="filter">Promo optimizer</nwn-command-header>`,
});

//  Primary button
export const CommandHeader = CommandHeaderTemplate.bind({});
CommandHeader.storyName = 'Command Header';
CommandHeader.args = {};
