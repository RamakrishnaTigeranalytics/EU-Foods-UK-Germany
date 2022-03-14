// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';

// Import Menu Item
import { LoadedScenarioitemComponent } from './loaded-scenarioitem.component';

// Define component
export default {
    title: 'Molecules/LoadedScenarioitem',
    component: LoadedScenarioitemComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [LoadedScenarioitemComponent, SvgIconComponent],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
    },
} as Meta;

// Define template
// primary button template
const LoadedScenarioitemTemplate: Story<LoadedScenarioitemComponent> = (args: LoadedScenarioitemComponent) => ({
    props: { ...args },
    template: `<nwn-loaded-scenarioitem [title]='title'></nwn-loaded-scenarioitem>`,
});

//  Primary button
export const LoadedScenarioitem = LoadedScenarioitemTemplate.bind({});
LoadedScenarioitem.storyName = 'Loaded Scenario Item';
LoadedScenarioitem.args = {
    title: 'Galaxy promo scenario',
};
