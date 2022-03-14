// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { ButtonComponent } from '@atoms/button/button.component';
import { CheckboxComponent } from '@atoms/checkbox/checkbox.component';

// Import Menu Item
import { ScenarioLoadCardComponent } from './scenario-load-card.component';

// Define component
export default {
    title: 'Molecules/ScenarioLoadCard',
    component: ScenarioLoadCardComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [ScenarioLoadCardComponent, SvgIconComponent, ButtonComponent, CheckboxComponent],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
        icons: { control: 'select' },
    },
} as Meta;

// Define template
//  ScenarioLoadCard
const ScenarioLoadCardTemplate: Story<ScenarioLoadCardComponent> = (args: ScenarioLoadCardComponent) => ({
    props: { ...args },
    template: `<div class="w-[650px] bg-white">
                    <nwn-scenario-load-card [showInfo]="true"
                    [showTrash]="false"
                    [showCheckbox]="false">
                    <p slcHead>Promo scenario name
                        </p>
                        <p slcContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi enim ultrices eget donec in nunc, mi nisl elit. Nibh proin vitae faucibus tempor mauris, justo. Turpis adipiscing egestas.</p>
                    </nwn-scenario-load-card>
                </div>`,
});

export const ScenarioLoadCard = ScenarioLoadCardTemplate.bind({});
ScenarioLoadCard.storyName = 'Scenario Load Card';
ScenarioLoadCard.args = {};

const ScenarioCompareCardTemplate: Story<ScenarioLoadCardComponent> = (args: ScenarioLoadCardComponent) => ({
    props: { ...args },
    template: `<div class="w-[650px] bg-white">
                    <nwn-scenario-load-card [showInfo]="false"
                    [showTrash]="false"
                    [showCheckbox]="true"
                    [showSubHead]="true">
                        <p slcHead>Promo scenario name
                        </p>
                        <p slcSubHead>Promo optimizer</p>
                        <p slcContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi enim ultrices eget donec in nunc, mi nisl elit. Nibh proin vitae faucibus tempor mauris, justo. Turpis adipiscing egestas.</p>
                    </nwn-scenario-load-card>
                </div>`,
});

export const ScenarioCompareCard = ScenarioCompareCardTemplate.bind({});
ScenarioCompareCard.storyName = 'Scenario Compare Card';
ScenarioCompareCard.args = {};
