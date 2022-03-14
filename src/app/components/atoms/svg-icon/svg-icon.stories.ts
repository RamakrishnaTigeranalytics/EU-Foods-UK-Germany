// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import Menu Item
import { SvgIconComponent } from './svg-icon.component';
import { SvgIconDirective } from './svg-icon.directive';

// Define component
export default {
    title: 'Atoms/Svg',
    component: SvgIconComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [SvgIconComponent, SvgIconDirective],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
        size: { control: 'select' },
        nwnSvgIcon: { control: 'select' },
        type: { control: 'select' },
    },
} as Meta;

// Define template
// Logout Icon template
const LogoutIconTemplate: Story<SvgIconComponent> = (args: SvgIconComponent) => ({
    props: { ...args },
    template: `<nwn-svg-icon [nwnSvgIcon]="nwnSvgIcon" [class]="class" [type]="type" [size]="size"></nwn-svg-icon>`,
});

export const LogoutIcon = LogoutIconTemplate.bind({});
LogoutIcon.storyName = 'Logout Icon';
LogoutIcon.args = {
    nwnSvgIcon: 'logout',
    class: 'text-marsgray-700',
    type: 'stroke',
    size: 'lg',
};
// Logout Icon template
const SimulatorIconTemplate: Story<SvgIconComponent> = (args: SvgIconComponent) => ({
    props: { ...args },
    template: `<nwn-svg-icon [nwnSvgIcon]="nwnSvgIcon" [class]="class" [type]="type" [size]="size"></nwn-svg-icon>`,
});

export const SimulatorIcon = SimulatorIconTemplate.bind({});
SimulatorIcon.storyName = 'Simulator Icon';
SimulatorIcon.args = {
    nwnSvgIcon: 'simulator',
    class: 'text-marsgray-700',
    type: 'fill',
    size: 'lg',
};
