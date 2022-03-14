// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { Story, Meta, moduleMetadata } from '@storybook/angular';
// import { CommonModule } from '@angular/common';

// // Import all components used
// import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';

// // Import Menu Item
// import { DropdownComponent } from './dropdown.component';

// // Define component
// export default {
//     title: 'UnderMaintenance/Dropdown',
//     component: DropdownComponent,
//     // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
//     parameters: {
//         layout: 'centered',
//     },
//     decorators: [
//         moduleMetadata({
//             imports: [CommonModule],
//             // Declare all components used here including the actual component
//             declarations: [DropdownComponent, SvgIconComponent],
//         }),
//     ],
//     // Define control types
//     argTypes: {
//         class: { control: 'text' },
//         ngIf: { control: 'select' },
//     },
// } as Meta;

// // Define template
// // primary button template
// const DropdownTemplate: Story<DropdownComponent> = (args: DropdownComponent) => ({
//     props: { ...args },
//     template: `<nwn-dropdown></nwn-dropdown>`,
// });

// //  Primary button
// export const Dropdown = DropdownTemplate.bind({});
// Dropdown.storyName = 'Dropdown ';
// Dropdown.args = {};
