// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { ButtonComponent } from '@atoms/button/button.component';
import { CommandHeaderComponent } from '@molecules/command-header/command-header.component';
import { CommandIconitemComponent } from '@molecules/command-iconitem/command-iconitem.component';
import { CommandSearchComponent } from '@molecules/command-search/command-search.component';
import { SearchFooterComponent } from '@molecules/search-footer/search-footer.component';
import { CheckboxComponent } from '@atoms/checkbox/checkbox.component';
import { CommandMultiselectComponent } from '@molecules/command-multiselect/command-multiselect.component';
import { ScenarioLoadCardComponent } from '@molecules/scenario-load-card/scenario-load-card.component';

import { TabCtaComponent } from '@atoms/tab-cta/tab-cta.component';

// Import Menu Item
import { LoadScenarioPromosimulatorComponent } from './load-scenario-promosimulator.component';

// Define component
export default {
    title: 'Organisms/LoadScenarioPromosimulatorComponent',
    component: LoadScenarioPromosimulatorComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [
                LoadScenarioPromosimulatorComponent,
                SvgIconComponent,
                ButtonComponent,
                CommandHeaderComponent,
                CommandIconitemComponent,
                CommandMultiselectComponent,
                CommandSearchComponent,
                SearchFooterComponent,
                TabCtaComponent,
                LoadScenarioPromosimulatorComponent,
                CheckboxComponent,
                ScenarioLoadCardComponent,
            ],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
        type: { control: 'select' },
    },
} as Meta;

// Define template
// LoadScenarioPricing
const LoadScenarioPromosimulatorComponentTemplate: Story<LoadScenarioPromosimulatorComponent> = (
    args: LoadScenarioPromosimulatorComponent,
) => ({
    props: { ...args },
    template: `<nwn-load-scenario-promosimulator></nwn-load-scenario-promosimulator>`,
});

export const LoadScenarioPromosimulator = LoadScenarioPromosimulatorComponentTemplate.bind({});
LoadScenarioPromosimulator.storyName = 'Load scenario promosimulator component';
LoadScenarioPromosimulator.args = {};
