// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { ButtonComponent } from '@atoms/button/button.component';

// Import Menu Item
import { LoadedScenarioControlsComponent } from './loaded-scenario-controls.component';

// Define component
export default {
    title: 'Molecules/LoadedScenarioControls',
    component: LoadedScenarioControlsComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [LoadedScenarioControlsComponent, SvgIconComponent, ButtonComponent],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
    },
} as Meta;

// Define template
// primary button template
const LoadedScenarioControlsTemplate: Story<LoadedScenarioControlsComponent> = (
    args: LoadedScenarioControlsComponent,
) => ({
    props: { ...args },
    template: `<nwn-loaded-scenario-controls></nwn-loaded-scenario-controls>`,
});

//  Primary button
export const LoadedScenarioControls = LoadedScenarioControlsTemplate.bind({});
LoadedScenarioControls.storyName = 'Loaded Scenario Controls';
LoadedScenarioControls.args = {};
