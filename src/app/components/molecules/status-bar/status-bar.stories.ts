// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { ButtonComponent } from '@atoms/button/button.component';

// Import Menu Item
import { StatusBarComponent } from './status-bar.component';
import { StatusBarDirective } from './status-bar.directive';

// Define component
export default {
    title: 'Molecules/StatusBar',
    component: StatusBarComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [StatusBarComponent, SvgIconComponent, ButtonComponent, StatusBarDirective],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
        nwnStatusBar: { control: 'select' },
    },
} as Meta;

// Define template
// Yet to be simulated Template
const YetToBeSimulatedTemplate: Story<StatusBarComponent> = (args: StatusBarComponent) => ({
    props: { ...args },
    template: `<nwn-status-bar [nwnStatusBar]="nwnStatusBar"></nwn-status-bar>`,
});

export const YetToBeSimulatedStatus = YetToBeSimulatedTemplate.bind({});
YetToBeSimulatedStatus.storyName = 'Yet To Be Simulated';
YetToBeSimulatedStatus.args = {
    nwnStatusBar: 'yettobesimulated',
};

// ViewLess Template
const ViewMoreTemplate: Story<StatusBarComponent> = (args: StatusBarComponent) => ({
    props: { ...args },
    template: `<nwn-status-bar [nwnStatusBar]="nwnStatusBar"></nwn-status-bar>`,
});

export const ViewMoreStatus = ViewMoreTemplate.bind({});
ViewMoreStatus.storyName = 'View More';
ViewMoreStatus.args = {
    nwnStatusBar: 'viewmore',
};

// ViewLess Template
const ViewLessTemplate: Story<StatusBarComponent> = (args: StatusBarComponent) => ({
    props: { ...args },
    template: `<nwn-status-bar [nwnStatusBar]="nwnStatusBar"></nwn-status-bar>`,
});

export const ViewLessStatus = ViewLessTemplate.bind({});
ViewLessStatus.storyName = 'View Less';
ViewLessStatus.args = {
    nwnStatusBar: 'viewless',
};
