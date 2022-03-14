// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';

// Import Menu Item
import { CellWeekItemComponent } from './cell-week-item.component';

// Define component
export default {
    title: 'Molecules/CellWeekItem',
    component: CellWeekItemComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [CellWeekItemComponent, SvgIconComponent],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
    },
} as Meta;

// Define template
// lowholidayweek
const LowHolidayWeekTemplate: Story<CellWeekItemComponent> = (args: CellWeekItemComponent) => ({
    props: { ...args },
    template: `<nwn-cell-week-item type="lowholidayweek"></nwn-cell-week-item>`,
});

export const LowHolidayWeek = LowHolidayWeekTemplate.bind({});
LowHolidayWeek.storyName = 'Low Holiday Week';
LowHolidayWeek.args = {};

// MediumHolidayWeek
const MediumHolidayWeekTemplate: Story<CellWeekItemComponent> = (args: CellWeekItemComponent) => ({
    props: { ...args },
    template: `<nwn-cell-week-item type="mediumholidayweek"></nwn-cell-week-item>`,
});

export const MediumHolidayWeek = MediumHolidayWeekTemplate.bind({});
MediumHolidayWeek.storyName = 'Medium Holiday Week';
MediumHolidayWeek.args = {};

// HighHolidayWeek
const HighHolidayWeekTemplate: Story<CellWeekItemComponent> = (args: CellWeekItemComponent) => ({
    props: { ...args },
    template: `<nwn-cell-week-item type="highholidayweek"></nwn-cell-week-item>`,
});

export const HighHolidayWeek = HighHolidayWeekTemplate.bind({});
HighHolidayWeek.storyName = 'High Holiday Week';
HighHolidayWeek.args = {};

// LowHolidayWeekTriangletr
const LowHolidayWeekTriangletrTemplate: Story<CellWeekItemComponent> = (args: CellWeekItemComponent) => ({
    props: { ...args },
    template: `<nwn-cell-week-item type="lowholidayweek" [active]=true></nwn-cell-week-item>`,
});

export const LowHolidayWeekTriangletr = LowHolidayWeekTriangletrTemplate.bind({});
LowHolidayWeekTriangletr.storyName = 'Low Holiday Week with top triangle';
LowHolidayWeekTriangletr.args = {};
