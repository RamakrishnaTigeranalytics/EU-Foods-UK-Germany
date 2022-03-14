// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';

// Import Menu Item
import { CellItemComponent } from './cell-item.component';
import { CellItemDirective } from './cell-item.directive';

// Define component
export default {
    title: 'Molecules/CellItem',
    component: CellItemComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [CellItemComponent, SvgIconComponent, CellItemDirective],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
        nwnCellItem: { control: 'select' },
        color: { control: 'select' },
        size: { control: 'select' },
    },
} as Meta;

// Define template
// MetricCellItem
const MetricCellItemTemplate: Story<CellItemComponent> = (args: CellItemComponent) => ({
    props: { ...args },
    template: `<nwn-cell-item [nwnCellItem]="nwnCellItem" [color]="color" [size]="size">Promo optimizer</nwn-cell-item>`,
});

export const MetricCellItem = MetricCellItemTemplate.bind({});
MetricCellItem.storyName = 'Metric Increase Cell Item';
MetricCellItem.args = {
    size: 'textsize-lg',
    nwnCellItem: 'carret-up',
    color: 'green',
};
// MetricCellItem
const MetricDecreaseCellItemTemplate: Story<CellItemComponent> = (args: CellItemComponent) => ({
    props: { ...args },
    template: `<nwn-cell-item [nwnCellItem]="nwnCellItem" [color]="color" [size]="size">Promo optimizer</nwn-cell-item>`,
});

export const MetricDecrease = MetricDecreaseCellItemTemplate.bind({});
MetricDecrease.storyName = 'Metric Decrease Cell Item';
MetricDecrease.args = {
    size: 'textsize-lg',
    nwnCellItem: 'carret-down',
    color: 'red',
};
// Trade Expense MetricCellItem
const TEMetricCellItemTemplate: Story<CellItemComponent> = (args: CellItemComponent) => ({
    props: { ...args },
    template: `<nwn-cell-item [nwnCellItem]="nwnCellItem" [color]="color" [size]="size">Promo optimizer</nwn-cell-item>`,
});

export const TEMetricCellItem = TEMetricCellItemTemplate.bind({});
TEMetricCellItem.storyName = 'TEMetric Increase Cell Item';
TEMetricCellItem.args = {
    size: 'textsize-lg',
    nwnCellItem: 'carret-up',
    color: 'red',
};
// Trade Expense MetricCellItem
const TEMetricDecreaseCellItemTemplate: Story<CellItemComponent> = (args: CellItemComponent) => ({
    props: { ...args },
    template: `<nwn-cell-item [nwnCellItem]="nwnCellItem" [color]="color" [size]="size">Promo optimizer</nwn-cell-item>`,
});

export const TEMetricDecrease = TEMetricDecreaseCellItemTemplate.bind({});
TEMetricDecrease.storyName = 'TEMetric Decrease Cell Item';
TEMetricDecrease.args = {
    size: 'textsize-lg',
    nwnCellItem: 'carret-down',
    color: 'green',
};
// Promo
const PromoCellItemTemplate: Story<CellItemComponent> = (args: CellItemComponent) => ({
    props: { ...args },
    template: `<nwn-cell-item [nwnCellItem]="nwnCellItem" [color]="color" [size]="size">Promo optimizer</nwn-cell-item>`,
});

export const PromoCellItem = PromoCellItemTemplate.bind({});
PromoCellItem.storyName = 'Promo Cell Item';
PromoCellItem.args = {
    size: 'textsize-lg',
    nwnCellItem: 'promo',
    color: 'neutral',
};
