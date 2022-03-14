// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { ButtonComponent } from '@atoms/button/button.component';

// Import Menu Item
import { SummaryPlaceholderComponent } from './summary-placeholder.component';

// Define component
export default {
    title: 'Molecules/SummaryPlaceholder',
    component: SummaryPlaceholderComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [SummaryPlaceholderComponent, SvgIconComponent, ButtonComponent],
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
const SummaryPlaceholderTemplate: Story<SummaryPlaceholderComponent> = (args: SummaryPlaceholderComponent) => ({
    props: { ...args },
    template: `<nwn-summary-placeholder></nwn-summary-placeholder>`,
});

export const SummaryPlaceholder = SummaryPlaceholderTemplate.bind({});
SummaryPlaceholder.storyName = 'Summary Placeholder';
SummaryPlaceholder.args = {};
