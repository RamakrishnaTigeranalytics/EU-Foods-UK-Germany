// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { ButtonComponent } from '@atoms/button/button.component';
import { SimulatedFilterItemComponent } from '@atoms/simulated-filter-item/simulated-filter-item.component';
import { CommandHeaderComponent } from '@molecules/command-header/command-header.component';
import { CommandIconitemComponent } from '@molecules/command-iconitem/command-iconitem.component';
import { CommandSearchComponent } from '@molecules/command-search/command-search.component';
import { SearchFooterComponent } from '@molecules/search-footer/search-footer.component';
import { CheckboxComponent } from '@atoms/checkbox/checkbox.component';
import { CommandMultiselectComponent } from '@molecules/command-multiselect/command-multiselect.component';
import { WeekItemComponent } from '@molecules/week-item/week-item.component';
import { LegendItemsComponent } from '@atoms/legend-items/legend-items.component';

import { TabNavItemComponent } from '@molecules/tab-nav-item/tab-nav-item.component';
import { TabCtaComponent } from '@atoms/tab-cta/tab-cta.component';

// Import Menu Item
import { UserGuidePopupComponent } from './user-guide-popup.component';

// Define component
export default {
    title: 'Organisms/CompulsoryWeeksPopup',
    component: UserGuidePopupComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [
                UserGuidePopupComponent,
                SvgIconComponent,
                ButtonComponent,
                CommandHeaderComponent,
                CommandIconitemComponent,
                CommandMultiselectComponent,
                CommandSearchComponent,
                SearchFooterComponent,
                TabNavItemComponent,
                TabCtaComponent,
                UserGuidePopupComponent,
                CheckboxComponent,
                SimulatedFilterItemComponent,
                WeekItemComponent,
                LegendItemsComponent,
            ],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
        type: { control: 'select' },
    },
} as Meta;

// CompulsoryWeeksPopup template
const UserGuidePopupTemplate: Story<UserGuidePopupComponent> = (args: UserGuidePopupComponent) => ({
    props: { ...args },
    template: `<nwn-user-guide-popup></nwn-user-guide-popup>`,
});

export const UserGuidePopup = UserGuidePopupTemplate.bind({});
UserGuidePopup.storyName = 'Optimizer Summary Popup';
UserGuidePopup.args = {};
