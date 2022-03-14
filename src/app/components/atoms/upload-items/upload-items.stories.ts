// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import components
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { ButtonComponent } from '@atoms/button/button.component';

// Import UploadItems
import { UploadItemsComponent } from './upload-items.component';

// Define component
export default {
    title: 'Atoms/UploadItems',
    component: UploadItemsComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            declarations: [SvgIconComponent, ButtonComponent],
        }),
    ],
    // Define control types
    // You dont have to define any control types, as they are already handled by SB 6.3
} as Meta;

// UploadItemsComponent
const UploadItemsTemplate: Story<UploadItemsComponent> = (args: UploadItemsComponent) => ({
    props: { ...args },
    template: `
        <nwn-upload-items></nwn-upload-items>
    `,
});

export const UploadItems = UploadItemsTemplate.bind({});
UploadItems.storyName = 'Upload Items';
UploadItems.args = {};
