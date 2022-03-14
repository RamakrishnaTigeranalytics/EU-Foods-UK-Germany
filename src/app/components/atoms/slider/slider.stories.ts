// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import Slider
import { SliderComponent } from './slider.component';

// Define component
export default {
    title: 'Atoms/Slider',
    component: SliderComponent,
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
    // You dont have to define any control types, as they are already handled by SB 6.3
} as Meta;

// Define template
const SliderTemplate: Story<SliderComponent> = (args: SliderComponent) => ({
    props: { ...args },
    template: `
        <nwn-slider></nwn-slider>
    `,
});

// Create an instances of the component
// Slider
export const Slider = SliderTemplate.bind({});
Slider.storyName = 'Slider Default';
// LinkToMars.args = {
//     href: 'https://www.mars.com/made-by-mars/mars-wrigley',
// };
