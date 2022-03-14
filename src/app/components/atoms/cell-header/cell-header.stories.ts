// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import Link
import { CellHeaderComponent } from './cell-header.component';

// Define component
export default {
    title: 'Atoms/Cellheader',
    component: CellHeaderComponent,
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
const LinkTemplate: Story<CellHeaderComponent> = (args: CellHeaderComponent) => ({
    props: { ...args },
    template: `
        <nwn-cell-header>Sales metrics</nwn-cell-header>
    `,
});

// Create an instances of the component
// Link to Mars
export const LinkToMars = LinkTemplate.bind({});
LinkToMars.storyName = 'Cell header';
LinkToMars.args = {};
