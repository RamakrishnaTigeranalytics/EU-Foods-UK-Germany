// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { PromotoolTabComponent } from '@molecules/promotool-tab/promotool-tab.component';

// Import Menu Item
import { PromoHeaderComponent } from './promo-header.component';

// Define component
export default {
    title: 'Organisms/Header',
    component: PromoHeaderComponent,
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [PromoHeaderComponent, SvgIconComponent, PromotoolTabComponent],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
    },
} as Meta;

// Define template
// primary button template
const HeaderTemplate: Story<PromoHeaderComponent> = (args: PromoHeaderComponent) => ({
    props: { ...args },
    template: `<nwn-promo-header ></nwn-promo-header>`,
});

//  Primary button
export const Header = HeaderTemplate.bind({});
Header.storyName = 'Header ';
Header.args = {};
