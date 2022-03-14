// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';

// Import Menu Item
import { WeekItemComponent } from './week-item.component';

// Define component
export default {
    title: 'Molecules/WeekItem',
    component: WeekItemComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [WeekItemComponent, SvgIconComponent],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
    },
} as Meta;

// Define template
// Default WeekItemComponent
const DefaultWeekItemTemplate: Story<WeekItemComponent> = (args: WeekItemComponent) => ({
    props: { ...args },
    template: `<nwn-week-item type="defaultWeek">
        <p weekValue>Week 1</p>
        <p dateValue>01-01-21</p>
    </nwn-week-item>`,
});

export const DefaultWeekItem = DefaultWeekItemTemplate.bind({});
DefaultWeekItem.storyName = ' Default Week Item';
DefaultWeekItem.args = {};

// Compulsory WeekItemComponent
const CompulsoryWeekItemTemplate: Story<WeekItemComponent> = (args: WeekItemComponent) => ({
    props: { ...args },
    template: `<nwn-week-item type="compulsoryWeek"><p weekValue>Week 1</p>
    <p dateValue>01-01-21</p></nwn-week-item>`,
});

export const CompulsoryWeekItem = CompulsoryWeekItemTemplate.bind({});
CompulsoryWeekItem.storyName = ' Compulsory Week Item';
CompulsoryWeekItem.args = {};

// Disabled WeekItemComponent
const DisabledWeekItemTemplate: Story<WeekItemComponent> = (args: WeekItemComponent) => ({
    props: { ...args },
    template: `<nwn-week-item type="disabledWeek"><p weekValue>Week 1</p>
    <p dateValue>01-01-21</p></nwn-week-item>`,
});

export const DisabledWeekItem = DisabledWeekItemTemplate.bind({});
DisabledWeekItem.storyName = ' Disabled Week Item';
DisabledWeekItem.args = {};
