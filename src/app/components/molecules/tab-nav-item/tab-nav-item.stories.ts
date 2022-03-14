// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { TabCtaComponent } from '@atoms/tab-cta/tab-cta.component';

// Import Menu Item
import { TabNavItemComponent } from './tab-nav-item.component';

// Define component
export default {
    title: 'Molecules/TabNavItem',
    component: TabNavItemComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [TabNavItemComponent, TabCtaComponent],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
        type: { control: 'select' },
    },
} as Meta;

// Define template
// Summary Placeholder Template
const TabNavItemComponentTemplate: Story<TabNavItemComponent> = (args: TabNavItemComponent) => ({
    props: { ...args },
    template: `<nwn-tab-nav-item [type]="type"></nwn-tab-nav-item>`,
});

export const TabNavItem = TabNavItemComponentTemplate.bind({});
TabNavItem.storyName = 'Tab Nav Item';
TabNavItem.args = {
    type: 'unselectedtab',
};
