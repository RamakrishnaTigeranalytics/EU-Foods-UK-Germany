// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';

// Import Button
import { ButtonComponent } from './button.component';

// Define component
export default {
    title: 'Atoms/Button',
    component: ButtonComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [ButtonComponent, SvgIconComponent],
        }),
    ],
    // Define control types
    argTypes: {
        href: { control: 'text' },
        size: { control: 'select' },
        type: { control: 'select' },
        class: { control: 'text' },
    },
} as Meta;

// Define template
// primary button template
const PrimaryButtonTemplate: Story<ButtonComponent> = (args: ButtonComponent) => ({
    props: { ...args },
    template: `<nwn-button [class]="class" [href]="href" [type]="type" [disabled]="disabled" [size]="size">Primary Button</nwn-button>`,
});
export const PrimaryButton = PrimaryButtonTemplate.bind({});
PrimaryButton.storyName = 'Primary Button';
PrimaryButton.args = {
    href: '/',
    type: 'primary',
    size: 'lg',
};
// secondary button template
const SecondaryButtonTemplate: Story<ButtonComponent> = (args: ButtonComponent) => ({
    props: { ...args },
    template: `<nwn-button [class]="class" [href]="href" [type]="type" [disabled]="disabled" [size]="size">Secondary Button</nwn-button>`,
});
export const SecondaryButton = SecondaryButtonTemplate.bind({});
SecondaryButton.storyName = 'Secondary Button';
SecondaryButton.args = {
    href: '/',
    type: 'secondary',
};
// Link button template
const LinkButtonTemplate: Story<ButtonComponent> = (args: ButtonComponent) => ({
    props: { ...args },
    template: `<nwn-button [class]="class" [href]="href" [type]="type" [disabled]="disabled" [size]="size">Storybook</nwn-button>`,
});
export const LinkButton = LinkButtonTemplate.bind({});
LinkButton.storyName = 'Link Button';
LinkButton.args = {
    href: '/',
    type: 'link',
};
// Icon button template
const IconButtonTemplate: Story<ButtonComponent> = (args: ButtonComponent) => ({
    props: { ...args },
    template: `<nwn-button [class]="class" [href]="href" [type]="type" [disabled]="disabled" [size]="size"><nwn-svg-icon class="stroke-current group-hover:stroke-current hover:stroke-current
    "></nwn-svg-icon></nwn-button>`,
});
export const IconButton = IconButtonTemplate.bind({});
IconButton.storyName = 'Icon Button';
IconButton.args = {
    href: '/',
    size: 'iconlg',
    type: 'icon',
};
// Iconcontent button template
const IconContentButtonTemplate: Story<ButtonComponent> = (args: ButtonComponent) => ({
    props: { ...args },
    template: `<nwn-button [class]="class" [href]="href" [type]="type" [disabled]="disabled" [size]="size"><nwn-svg-icon nwnSvgIcon="logout" class="mr-2" type="stroke"></nwn-svg-icon>transparent</nwn-button>`,
});
export const IconContentButton = IconContentButtonTemplate.bind({});
IconContentButton.storyName = 'Icon Content Button';
IconContentButton.args = {
    href: '/',
    type: 'primary',
};
