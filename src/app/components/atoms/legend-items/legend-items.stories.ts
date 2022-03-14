// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import Link
import { LegendItemsComponent } from './legend-items.component';

// Define component
export default {
    title: 'Atoms/LegendItems',
    component: LegendItemsComponent,
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
        nwnLegendItems: { control: 'select' },
        type: { control: 'select' },
        color: { control: 'select' },
        class: { control: 'text' },
    },
    // You dont have to define any control types, as they are already handled by SB 6.3
} as Meta;

// OneSquare
const OneSquareComponentTemplate: Story<LegendItemsComponent> = (args: LegendItemsComponent) => ({
    props: { ...args },
    template: `
        <nwn-legend-items [nwnLegendItems]="nwnLegendItems" [type]="type" [color]="color">Base value</nwn-legend-items>
    `,
});

// Create an instances of the component
// OneSquare
export const OneSquare = OneSquareComponentTemplate.bind({});
OneSquare.storyName = 'One Square';
OneSquare.args = {
    nwnLegendItems: 'onesquare',
    type: 'squaresm',
    color: 'bg-gray-500',
};
// TwoSquare
const TwoSquareComponentTemplate: Story<LegendItemsComponent> = (args: LegendItemsComponent) => ({
    props: { ...args },
    template: `
        <nwn-legend-items [nwnLegendItems]="nwnLegendItems" [type]="type" [color]="color" [colorVariantFirst]="colorVariantFirst" [colorVariantSecond]="colorVariantSecond">Base value</nwn-legend-items>
    `,
});

// Create an instances of the component
// TwoSquare
export const TwoSquare = TwoSquareComponentTemplate.bind({});
TwoSquare.storyName = 'Two Square';
TwoSquare.args = {
    nwnLegendItems: 'twosquare',
    type: 'squaresm',
    color: 'bg-gray-500',
    colorVariantFirst: 'bgGreenAccent',
    colorVariantSecond: 'bgRed-600',
};
// Triangle TR
const TriangleTRComponentTemplate: Story<LegendItemsComponent> = (args: LegendItemsComponent) => ({
    props: { ...args },
    template: `
        <nwn-legend-items [nwnLegendItems]="nwnLegendItems" [type]="type" >Base value</nwn-legend-items>
    `,
});

// Create an instances of the component
// TwoSquare
export const TriangleTR = TriangleTRComponentTemplate.bind({});
TriangleTR.storyName = 'Triangle TR';
TriangleTR.args = {
    nwnLegendItems: 'triangle-tr',
    type: 'triangletr',
};
