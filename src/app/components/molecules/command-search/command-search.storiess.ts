// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';

// Import Menu Item
import { CommandSearchComponent } from './command-search.component';

// Define component
export default {
    title: 'Molecules/CommandSearch',
    component: CommandSearchComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [CommandSearchComponent, SvgIconComponent],
        }),
    ],
    // Define control types
    argTypes: {
        href: { control: 'text' },
    },
} as Meta;

// Define template
// primary button template
const CommandSearchTemplate: Story<CommandSearchComponent> = (args: CommandSearchComponent) => ({
    props: { ...args },
    template: `<nwn-command-search ></nwn-command-search>`,
});

//  Primary button
export const CommandSearch = CommandSearchTemplate.bind({});
CommandSearch.storyName = 'Command Search';
CommandSearch.args = {};
