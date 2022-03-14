import { Component, Input } from '@angular/core';

@Component({
    selector: 'nwn-svg-icon',
    templateUrl: './svg-icon.component.html',
    styleUrls: ['./svg-icon.component.css'],
})
export class SvgIconComponent {
    @Input()
    size: string | 'xs' | 'sm' | 'md' | 'lg' = 'lg';

    @Input()
    type: string | 'stroke' | 'fill' | 'fill-stroke' = 'stroke';

    @Input()
    class = '';

    @Input()
    nwnSvgIcon:
        | string
        | 'logout'
        | 'simulator'
        | 'optimizer'
        | 'pricing-capabilities'
        | 'pricing-tool'
        | 'profit-tool'
        | 'promo-tool'
        | 'srm-insight'
        | 'close'
        | 'clock'
        | 'retailers'
        | 'categories'
        | 'strategic-cells'
        | 'brands'
        | 'brand-formats'
        | 'product-groups'
        | 'info'
        | 'minus'
        | 'plus'
        | 'upload'
        | 'download'
        | 'tickmark'
        | 'lightning-bolt'
        | 'save'
        | 'save-download'
        | 'more-horizontal'
        | 'chevron-up'
        | 'chevron-down'
        | 'copy'
        | 'arrow-up'
        | 'arrow-down'
        | 'filter'
        | 'carret-up'
        | 'my-scenarios'
        | 'user-guide'
        | 'light-bulb'
        | 'date'
        | 'carret-down' = 'logout';
}
