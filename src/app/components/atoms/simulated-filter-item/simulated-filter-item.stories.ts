// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import Link
import { SimulatedFilterItemComponent } from './simulated-filter-item.component';

// Define component
export default {
    title: 'Atoms/SimulatedFilterItem',
    component: SimulatedFilterItemComponent,
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
    argTypes: {
        href: { control: 'text' },
        size: { control: 'select' },
        type: { control: 'select' },
    },
    // You dont have to define any control types, as they are already handled by SB 6.3
} as Meta;

// Define template
// Simulated Default
const SimulatedFilterItemDefaultTemplate: Story<SimulatedFilterItemComponent> = (
    args: SimulatedFilterItemComponent,
) => ({
    props: { ...args },
    template: `
        <nwn-simulated-filter-item [type]="type" [size]="size">Y1 Q1</nwn-simulated-filter-item>
    `,
});

// Create an instances of the component
export const SimulatedFilterItemDefault = SimulatedFilterItemDefaultTemplate.bind({});
SimulatedFilterItemDefault.storyName = 'Simulated Filter Item Default';
SimulatedFilterItemDefault.args = {
    type: 'default',
    size: 'sfi',
};

// SimulatedFilterItemActive
const SimulatedFilterItemActiveTemplate: Story<SimulatedFilterItemComponent> = (
    args: SimulatedFilterItemComponent,
) => ({
    props: { ...args },
    template: `
        <nwn-simulated-filter-item [type]="type" [size]="size">Y1 Q1</nwn-simulated-filter-item>
    `,
});

export const SimulatedFilterItemActive = SimulatedFilterItemActiveTemplate.bind({});
SimulatedFilterItemActive.storyName = 'Simulated Filter Item Active';
SimulatedFilterItemActive.args = {
    type: 'active',
    size: 'sfi',
};

// SimulatedFilterItemFilled
const SimulatedFilterItemFilledTemplate: Story<SimulatedFilterItemComponent> = (
    args: SimulatedFilterItemComponent,
) => ({
    props: { ...args },
    template: `
        <nwn-simulated-filter-item [type]="type" [size]="size">Y1 Q1</nwn-simulated-filter-item>
    `,
});

export const SimulatedFilterItemFilled = SimulatedFilterItemFilledTemplate.bind({});
SimulatedFilterItemFilled.storyName = 'Simulated Filter Item Filled';
SimulatedFilterItemFilled.args = {
    type: 'filled',
    size: 'sfi',
};

// SimulatedFilterItemFilled
const SimulatedFilterItemFilledActiveTemplate: Story<SimulatedFilterItemComponent> = (
    args: SimulatedFilterItemComponent,
) => ({
    props: { ...args },
    template: `
        <nwn-simulated-filter-item [type]="type" [size]="size">Y1 Q1</nwn-simulated-filter-item>
    `,
});

export const SimulatedFilterItemFilledActive = SimulatedFilterItemFilledActiveTemplate.bind({});
SimulatedFilterItemFilledActive.storyName = 'Simulated Filter Item Filled Active';
SimulatedFilterItemFilledActive.args = {
    type: 'filled-active',
    size: 'sfi',
};
