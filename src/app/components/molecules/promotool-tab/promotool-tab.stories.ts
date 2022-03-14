// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';

// Import Menu Item
import { PromotoolTabComponent } from './promotool-tab.component';

// Define component
export default {
    title: 'Molecules/PromotoolTab',
    component: PromotoolTabComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [PromotoolTabComponent, SvgIconComponent],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
    },
} as Meta;

// Define template
// primary button template
const PromotoolTabTemplate: Story<PromotoolTabComponent> = (args: PromotoolTabComponent) => ({
    props: { ...args },
    template: `<nwn-promotool-tab [href]="href" type="fill" nwnSvgIcon="optimizer" [active]="active">Promo Optimizer</nwn-promotool-tab>`,
});

//  Primary button
export const PromotoolTab = PromotoolTabTemplate.bind({});
PromotoolTab.storyName = 'Promotool Tab';
PromotoolTab.args = {};
