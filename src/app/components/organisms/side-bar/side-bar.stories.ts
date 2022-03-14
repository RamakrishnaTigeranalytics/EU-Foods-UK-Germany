// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { ButtonComponent } from '@atoms/button/button.component';
import { MenuItemComponent } from '@molecules/menu-item/menu-item.component';
import { SideMenuComponent } from '@organisms/side-menu/side-menu.component';

// Import Menu Item
import { SideBarComponent } from './side-bar.component';

// Define component
export default {
    title: 'Organisms/SideBar',
    component: SideBarComponent,
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [SideBarComponent, ButtonComponent, SvgIconComponent, MenuItemComponent, SideMenuComponent],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
    },
} as Meta;

// Define template
// primary button template
const SideBarTemplate: Story<SideBarComponent> = (args: SideBarComponent) => ({
    props: { ...args },
    template: `<nwn-side-bar ></nwn-side-bar>`,
});

//  Primary button
export const SideBar = SideBarTemplate.bind({});
SideBar.storyName = 'Side Bar';
SideBar.args = {};
