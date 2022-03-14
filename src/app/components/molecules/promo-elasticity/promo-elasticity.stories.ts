// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { ButtonComponent } from '@atoms/button/button.component';

// Import Menu Item
import { PromoElasticityComponent } from './promo-elasticity.component';

// Define component
export default {
    title: 'Molecules/PromoElasticity',
    component: PromoElasticityComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [PromoElasticityComponent, SvgIconComponent, ButtonComponent],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
    },
} as Meta;

// Define template
// primary button template
const PromoElasticityTemplate: Story<PromoElasticityComponent> = (args: PromoElasticityComponent) => ({
    props: { ...args },
    template: `<nwn-promo-elasticity>Promo elasticity</nwn-promo-elasticity>`,
});

//  Primary button
export const PromoElasticity = PromoElasticityTemplate.bind({});
PromoElasticity.storyName = 'Promo Elasticity';
PromoElasticity.args = {};
