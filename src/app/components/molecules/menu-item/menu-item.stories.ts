// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';

// Import Menu Item
import { MenuItemComponent } from './menu-item.component';

// Define component
export default {
    title: 'Molecules/MenuItem',
    component: MenuItemComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [MenuItemComponent, SvgIconComponent],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
    },
} as Meta;

// Define template
// primary button template
const MenuItemTemplate: Story<MenuItemComponent> = (args: MenuItemComponent) => ({
    props: { ...args },
    template: `<nwn-menu-item [href]="href" type="stroke" [nwnSvgIcon]="nwnSvgIcon">Promo Tool</nwn-menu-item>`,
});

//  Primary button
export const MenuItem = MenuItemTemplate.bind({});
MenuItem.storyName = 'Menu Item';
MenuItem.args = {
    href: '/',
    nwnSvgIcon: 'promo-tool',
};
