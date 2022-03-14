// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { ButtonComponent } from '@atoms/button/button.component';
import { CommandHeaderComponent } from '@molecules/command-header/command-header.component';
import { CommandIconitemComponent } from '@molecules/command-iconitem/command-iconitem.component';
import { SearchFooterComponent } from '@molecules/search-footer/search-footer.component';
import { UploadItemsComponent } from '@atoms/upload-items/upload-items.component';

// Import Menu Item
import { UploadWeeklyPromotionsComponent } from './upload-weekly-promotions.component';

// Define component
export default {
    title: 'Organisms/UploadWeeklyPromotions',
    component: UploadWeeklyPromotionsComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [
                UploadWeeklyPromotionsComponent,
                SvgIconComponent,
                ButtonComponent,
                CommandHeaderComponent,
                CommandIconitemComponent,
                SearchFooterComponent,
                UploadItemsComponent,
            ],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
        type: { control: 'select' },
    },
} as Meta;

// UploadWeeklyPromotions
const UploadWeeklyPromotionsTemplate: Story<UploadWeeklyPromotionsComponent> = (
    args: UploadWeeklyPromotionsComponent,
) => ({
    props: { ...args },
    template: `<nwn-upload-weekly-promotions></nwn-upload-weekly-promotions>`,
});

export const UploadWeeklyPromotions = UploadWeeklyPromotionsTemplate.bind({});
UploadWeeklyPromotions.storyName = 'Upload Weekly Promotions';
UploadWeeklyPromotions.args = {};
