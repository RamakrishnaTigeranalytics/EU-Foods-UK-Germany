// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import Link
import { LinkComponent } from './link.component';

// Define component
export default {
    title: 'Atoms/LinkOnly',
    component: LinkComponent,
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

// Define template
const LinkTemplate: Story<LinkComponent> = (args: LinkComponent) => ({
    props: { ...args },
    template: `
        <nwn-link>Mars Wrigley</nwn-link>
    `,
});

// Create an instances of the component
// Link to Mars
export const LinkToMars = LinkTemplate.bind({});
LinkToMars.storyName = 'Link Only';
LinkToMars.args = {
    href: 'https://www.mars.com/made-by-mars/mars-wrigley',
};
