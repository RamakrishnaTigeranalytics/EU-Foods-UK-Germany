// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { ButtonComponent } from '@atoms/button/button.component';
import { MenuItemComponent } from '@molecules/menu-item/menu-item.component';

// Import Menu Item
import { SideMenuComponent } from './side-menu.component';

// Define component
export default {
    title: 'Organisms/SideMenu',
    component: SideMenuComponent,
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [SideMenuComponent, ButtonComponent, SvgIconComponent, MenuItemComponent],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
    },
} as Meta;

// Define template
// primary button template
const SideMenuTemplate: Story<SideMenuComponent> = (args: SideMenuComponent) => ({
    props: { ...args },
    template: `<nwn-side-menu ></nwn-side-menu>`,
});

//  Primary button
export const SideMenu = SideMenuTemplate.bind({});
SideMenu.storyName = 'Side Menu';
SideMenu.args = {};
