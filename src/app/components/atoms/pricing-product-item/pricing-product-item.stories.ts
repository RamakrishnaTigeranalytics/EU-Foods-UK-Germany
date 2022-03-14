// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { ButtonComponent } from '@atoms/button/button.component';

import { PricingProductItemComponent } from './pricing-product-item.component';

// Define component
export default {
    title: 'Atoms/PricingProductItem',
    component: PricingProductItemComponent,
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
const PricingProductItemDefaultTemplate: Story<PricingProductItemComponent> = (args: PricingProductItemComponent) => ({
    props: { ...args },
    template: `
        <nwn-pricing-product-item [type]="type" [size]="size">Milkyway XXL</nwn-pricing-product-item>
    `,
});

// Create an instances of the component
export const PricingProductItemDefault = PricingProductItemDefaultTemplate.bind({});
PricingProductItemDefault.storyName = 'Pricing Product Item Default';
PricingProductItemDefault.args = {
    type: 'default',
    size: 'sfi',
};

// PricingProductItemActive
const PricingProductItemActiveTemplate: Story<PricingProductItemComponent> = (args: PricingProductItemComponent) => ({
    props: { ...args },
    template: `
        <nwn-pricing-product-item [type]="type" [size]="size">Milkyway XXL</nwn-pricing-product-item>
    `,
});

export const PricingProductItemActive = PricingProductItemActiveTemplate.bind({});
PricingProductItemActive.storyName = 'Pricing Product Item Active';
PricingProductItemActive.args = {
    type: 'active',
    size: 'sfi',
};

// PricingProductItemFilled
const PricingProductItemFilledTemplate: Story<PricingProductItemComponent> = (args: PricingProductItemComponent) => ({
    props: { ...args },
    template: `
        <nwn-pricing-product-item [type]="type" [size]="size">Milkyway XXL</nwn-pricing-product-item>
    `,
});

export const PricingProductItemFilled = PricingProductItemFilledTemplate.bind({});
PricingProductItemFilled.storyName = 'Pricing Product Item Filled';
PricingProductItemFilled.args = {
    type: 'filled',
    size: 'sfi',
};

// PricingProductItemFilled
const PricingProductItemFilledActiveTemplate: Story<PricingProductItemComponent> = (
    args: PricingProductItemComponent,
) => ({
    props: { ...args },
    template: `
        <nwn-pricing-product-item [type]="type" [size]="size">Milkyway XXL</nwn-pricing-product-item>
    `,
});

export const PricingProductItemFilledActive = PricingProductItemFilledActiveTemplate.bind({});
PricingProductItemFilledActive.storyName = 'Pricing Product Item Filled Active';
PricingProductItemFilledActive.args = {
    type: 'filled-active',
    size: 'sfi',
};

// PricingProductItemFilled
const PricingProductItemFilledActiveCloseTemplate: Story<PricingProductItemComponent> = (
    args: PricingProductItemComponent,
) => ({
    props: { ...args },
    template: `
        <nwn-pricing-product-item [type]="type" [size]="size" [showClose]="showClose">Milkyway XXL</nwn-pricing-product-item>
    `,
});

export const PricingProductItemFilledActiveClose = PricingProductItemFilledActiveCloseTemplate.bind({});
PricingProductItemFilledActiveClose.storyName = 'Pricing Product Item Filled Active Close';
PricingProductItemFilledActiveClose.args = {
    type: 'filled-active',
    size: 'sfi',
    showClose: true,
};
