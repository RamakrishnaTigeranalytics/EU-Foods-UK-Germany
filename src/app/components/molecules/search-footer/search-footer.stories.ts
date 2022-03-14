// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { ButtonComponent } from '@atoms/button/button.component';

// Import Menu Item
import { SearchFooterComponent } from './search-footer.component';

// Define component
export default {
    title: 'Molecules/SearchFooter',
    component: SearchFooterComponent,
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [SearchFooterComponent, ButtonComponent, SvgIconComponent],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
    },
} as Meta;

// Define template
// primary button template
const SearchFooterTemplate: Story<SearchFooterComponent> = (args: SearchFooterComponent) => ({
    props: { ...args },
    template: `<div class="w-[650px] bg-white"><nwn-search-footer [showKeyBoardCtrl]="true"
    [showApply]="true"
    [showBack]="true"></nwn-search-footer></div>`,
});

//  Primary button
export const SearchFooter = SearchFooterTemplate.bind({});
SearchFooter.storyName = 'Search Footer';
SearchFooter.args = {};
