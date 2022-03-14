// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { CellHeaderComponent } from '@atoms/cell-header/cell-header.component';

import { CellItemComponent } from '@molecules/cell-item/cell-item.component';
import { CellItemDirective } from '@molecules/cell-item/cell-item.directive';
import { CellWeekItemComponent } from '@molecules/cell-week-item/cell-week-item.component';

// Import Menu Item
import { TableViewComponent } from './table-view.component';

// Define component
export default {
    title: 'Molecules/TableView',
    component: TableViewComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [
                TableViewComponent,
                CellItemComponent,
                CellWeekItemComponent,
                SvgIconComponent,
                CellItemDirective,
                CellHeaderComponent,
            ],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
        type: { control: 'select' },
    },
} as Meta;

// Define template
const TableViewComponentTemplate: Story<TableViewComponent> = (args: TableViewComponent) => ({
    props: { ...args },
    template: `<nwn-table-view></nwn-table-view>`,
});

export const TableView = TableViewComponentTemplate.bind({});
TableView.storyName = 'Table View ';
TableView.args = {};
