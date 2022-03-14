// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { ButtonComponent } from '@atoms/button/button.component';

// Import Menu Item
import { PriceElasticityComponent } from './price-elasticity.component';

// Define component
export default {
    title: 'Molecules/PriceElasticity',
    component: PriceElasticityComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [PriceElasticityComponent, SvgIconComponent, ButtonComponent],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
    },
} as Meta;

// Define template
// primary button template
const PriceElasticityTemplate: Story<PriceElasticityComponent> = (args: PriceElasticityComponent) => ({
    props: { ...args },
    template: `<nwn-price-elasticity>Price elasticity</nwn-price-elasticity>`,
});

//  Primary button
export const PriceElasticity = PriceElasticityTemplate.bind({});
PriceElasticity.storyName = 'Price Elasticity';
PriceElasticity.args = {};
