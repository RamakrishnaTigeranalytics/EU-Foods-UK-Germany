// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { CheckboxComponent } from '@atoms/checkbox/checkbox.component';
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { ButtonComponent } from '@atoms/button/button.component';

// Import Menu Item
import { CompetitionComponent } from './competition.component';

// Define component
export default {
    title: 'Molecules/CompetitionComponent',
    component: CompetitionComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [CompetitionComponent, SvgIconComponent, CheckboxComponent, ButtonComponent],
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
const CompetitionComponentTemplate: Story<CompetitionComponent> = (args: CompetitionComponent) => ({
    props: { ...args },
    template: `<nwn-competition></nwn-competition>`,
});

//  Primary button
export const Competition = CompetitionComponentTemplate.bind({});
Competition.storyName = 'Competition ';
Competition.args = {};
