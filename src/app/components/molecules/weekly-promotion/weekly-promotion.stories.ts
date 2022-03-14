// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { ButtonComponent } from '@atoms/button/button.component';
// import { DropdownComponent } from '@atoms/dropdown/dropdown.component';

// Import Menu Item
import { WeeklyPromotionComponent } from './weekly-promotion.component';

// Define component
export default {
    title: 'Molecules/WeeklyPromotion',
    component: WeeklyPromotionComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [WeeklyPromotionComponent, SvgIconComponent, ButtonComponent],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
        type: { control: 'select' },
    },
} as Meta;

// Define template
// Yet to be simulated Template
const WeeklyPromotionTemplate: Story<WeeklyPromotionComponent> = (args: WeeklyPromotionComponent) => ({
    props: { ...args },
    template: `<nwn-weekly-promotion></nwn-weekly-promotion>`,
});

export const WeeklyPromotionStatus = WeeklyPromotionTemplate.bind({});
WeeklyPromotionStatus.storyName = 'Weekly Promotion';
WeeklyPromotionStatus.args = {};
