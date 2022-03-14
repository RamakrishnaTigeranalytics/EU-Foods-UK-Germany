// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { ButtonComponent } from '@atoms/button/button.component';

// Import Menu Item
import { ComparescenarioCellHeaderComponent } from './comparescenario-cell-header.component';

// Define component
export default {
    title: 'Molecules/ComparescenarioCellHeader',
    component: ComparescenarioCellHeaderComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [ComparescenarioCellHeaderComponent, SvgIconComponent, ButtonComponent],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
    },
} as Meta;

// Define template
// primary button template
const ComparescenarioCellHeaderTemplate: Story<ComparescenarioCellHeaderComponent> = (
    args: ComparescenarioCellHeaderComponent,
) => ({
    props: { ...args },
    template: `<nwn-comparescenario-cell-header>Galaxy promo</nwn-comparescenario-cell-header>`,
});

//  Primary button
export const ComparescenarioCellHeader = ComparescenarioCellHeaderTemplate.bind({});
ComparescenarioCellHeader.storyName = 'Compare Scenario Cell Header';
ComparescenarioCellHeader.args = {};
