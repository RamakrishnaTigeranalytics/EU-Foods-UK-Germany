// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { PromotoolTabComponent } from '@molecules/promotool-tab/promotool-tab.component';

// Import Menu Item
import { HeaderComponent } from './header.component';

// Define component
export default {
    title: 'Organisms/Header',
    component: HeaderComponent,
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [HeaderComponent, SvgIconComponent, PromotoolTabComponent],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
    },
} as Meta;

// Define template
// primary button template
const HeaderTemplate: Story<HeaderComponent> = (args: HeaderComponent) => ({
    props: { ...args },
    template: `<nwn-header ></nwn-header>`,
});

//  Primary button
export const Header = HeaderTemplate.bind({});
Header.storyName = 'Header ';
Header.args = {};
