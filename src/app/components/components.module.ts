import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module"
import {RouterModule} from '@angular/router';

// Custom Components
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
// import { ChartsModule } from 'ng2-charts';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTreeModule} from "@angular/material/tree"
import {MatExpansionModule} from '@angular/material/expansion';

// Datepicker
import { DpDatePickerModule } from 'ng2-date-picker';
import { MyDatePickerModule } from 'mydatepicker';

// Tabs
import { MatTabsModule } from '@angular/material/tabs';

// Atoms
import { ButtonComponent } from '@atoms/button/button.component';
import { LinkComponent } from '@atoms/link/link.component';
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { CheckboxComponent } from '@atoms/checkbox/checkbox.component';
import { SvgIconDirective } from '@atoms/svg-icon/svg-icon.directive';
import { DropdownComponent } from '@atoms/dropdown/dropdown.component';
import { ToggleCtaComponent } from '@atoms/toggle-cta/toggle-cta.component';
import { SimulatedFilterItemDirective } from '@atoms/simulated-filter-item/simulated-filter-item.directive';
import { SimulatedFilterItemComponent } from '@atoms/simulated-filter-item/simulated-filter-item.component';
import { LegendItemsComponent } from '@atoms/legend-items/legend-items.component';
import { TabCtaComponent } from '@atoms/tab-cta/tab-cta.component';
import { LegendItemsDirective } from '@atoms/legend-items/legend-items.directive';
import { CellHeaderComponent } from '@atoms/cell-header/cell-header.component';
import { SliderComponent } from '@atoms/slider/slider.component';
import { SelectOptionComponent } from '@atoms/select-option/select-option.component';

// Molecules
import { SearchFooterComponent } from '@molecules/search-footer/search-footer.component';
import { CommandHeaderComponent } from '@molecules/command-header/command-header.component';
import { CommandIconitemComponent } from '@molecules/command-iconitem/command-iconitem.component';
import { CommandMultiselectComponent } from '@molecules/command-multiselect/command-multiselect.component';
import { CommandSearchComponent } from '@molecules/command-search/command-search.component';
import { FilterItemComponent } from '@molecules/filter-item/filter-item.component';
import { MenuItemComponent } from '@molecules/menu-item/menu-item.component';
import { MetricItemComponent } from '@molecules/metric-item/metric-item.component';
import { PromotoolTabComponent } from '@molecules/promotool-tab/promotool-tab.component';
import { StatusBarComponent } from '@molecules/status-bar/status-bar.component';
import { LoadedScenarioControlsComponent } from '@molecules/loaded-scenario-controls/loaded-scenario-controls.component';
import { LoadedScenarioExpandComponent } from '@molecules/loaded-scenario-expand/loaded-scenario-expand.component';
import { LoadedScenarioitemComponent } from '@molecules/loaded-scenarioitem/loaded-scenarioitem.component';
import { FilterComponent } from '@molecules/filter/filter.component';
import { StatusBarDirective } from '@molecules/status-bar/status-bar.directive';
import { PromoElasticityComponent } from '@molecules/promo-elasticity/promo-elasticity.component';
import { CellItemComponent } from '@molecules/cell-item/cell-item.component';
import { CellWeekItemComponent } from '@molecules/cell-week-item/cell-week-item.component';
import { ComparescenarioCellHeaderComponent } from '@molecules/comparescenario-cell-header/comparescenario-cell-header.component';
import { WeeklyPromotionComponent } from '@molecules/weekly-promotion/weekly-promotion.component';
import { ScenarioLoadCardComponent } from '@molecules/scenario-load-card/scenario-load-card.component';
import { SummaryPlaceholderComponent } from '@molecules/summary-placeholder/summary-placeholder.component';
import { ChartToolTipComponent } from '@molecules/chart-tool-tip/chart-tool-tip.component';
import { ToggleComponent } from '@molecules/toggle/toggle.component';
import { TabNavItemComponent } from '@molecules/tab-nav-item/tab-nav-item.component';
import { TableViewComponent } from '@molecules/table-view/table-view.component';
import { CellItemDirective } from '@molecules/cell-item/cell-item.directive';
import { MetricItemPopupComponent } from '@molecules/metric-item-popup/metric-item-popup.component';
import { ModalComponent } from '@molecules/modal/modal.component';
import { D3ChartComponent } from '@molecules/d3-chart/d3-chart.component';

// Organisms
import { SideMenuComponent } from '@organisms/side-menu/side-menu.component';
import { SideBarComponent } from '@organisms/side-bar/side-bar.component';
import { PromoHeaderComponent } from '@organisms/promo-header/promo-header.component';
import { LoadedScenarioHeaderComponent } from '@organisms/loaded-scenario-header/loaded-scenario-header.component';
import { FilterRetailerComponent } from '@organisms/filter-retailer/filter-retailer.component';
import { SummaryComponent } from '@organisms/summary/summary.component';
import { FilterBasicComponent } from '@organisms/filter-basic/filter-basic.component';
import { PromoscenariobuilderInitialstateComponent } from '@organisms/promoscenariobuilder-initialstate/promoscenariobuilder-initialstate.component';
import { FilterCategoriesComponent } from '@organisms/filter-categories/filter-categories.component';
import { FilterStrageticCellsComponent } from '@organisms/filter-stragetic-cells/filter-stragetic-cells.component';
import { FilterBrandsComponent } from '@organisms/filter-brands/filter-brands.component';
import { FilterBrandsFormatsComponent } from '@organisms/filter-brands-formats/filter-brands-formats.component';
import { FilterProductGroupsComponent } from '@organisms/filter-product-groups/filter-product-groups.component';
import { LoadScenarioPricingComponent } from '@organisms/load-scenario-pricing/load-scenario-pricing.component';
import { LoadScenarioPromosimulatorComponent } from '@organisms/load-scenario-promosimulator/load-scenario-promosimulator.component';
import { PricingScenarioComponent } from '@organisms/pricing-scenario/pricing-scenario.component';
import { PromoSimulatorScenarioComponent } from '@organisms/promo-simulator-scenario/promo-simulator-scenario.component';
import { LoadedPricingScenarioComponent } from '@organisms/loaded-pricing-scenario/loaded-pricing-scenario.component';
import { LoadedPromosimulatorScenarioComponent } from '@organisms/loaded-promosimulator-scenario/loaded-promosimulator-scenario.component';
import { PromoScenariobuilderPopupComponent } from '@organisms/promo-scenariobuilder-popup/promo-scenariobuilder-popup.component';
import { PromoElasticityPopupComponent } from '@organisms/promo-elasticity-popup/promo-elasticity-popup.component';
import { PromoOptimizerPopupComponent } from '@organisms/promo-optimizer-popup/promo-optimizer-popup.component';
import { AddCompareScenarioComponent } from '@organisms/add-compare-scenario/add-compare-scenario.component';
import { ComparePromoOptimizerComponent } from '@organisms/compare-promo-optimizer/compare-promo-optimizer.component';
import { ComparePromoScenarioComponent } from '@organisms/compare-promo-scenario/compare-promo-scenario.component';
import { ManageMetricsComponent } from '@organisms/manage-metrics/manage-metrics.component';
import { CompulsoryWeeksPopupComponent } from '@organisms/compulsory-weeks-popup/compulsory-weeks-popup.component';
import { OptimizerSummaryPopupComponent } from '@organisms/optimizer-summary-popup/optimizer-summary-popup.component';
import { WeekItemComponent } from '@molecules/week-item/week-item.component';
import { WeeksIgnoredComponent } from '@organisms/weeks-ignored/weeks-ignored.component';
import { NumberPromoWeeksComponent } from '@organisms/number-promo-weeks/number-promo-weeks.component';
import { DurationPromoWavesComponent } from '@organisms/duration-promo-waves/duration-promo-waves.component';
import { MinimumGapWavesComponent } from '@organisms/minimum-gap-waves/minimum-gap-waves.component';
import { NumberPromoWavesComponent } from '@organisms/number-promo-waves/number-promo-waves.component';
import { MacPopupComponent } from '@organisms/mac-popup/mac-popup.component';
import { AddPromotionComponent } from '@organisms/add-promotion/add-promotion.component';
import { AddPromotionGermanyComponent } from '@organisms/add-promotion-germany/add-promotion-germany.component';
import { TextInputComponent } from '@atoms/text-input/text-input.component';
import { TextInputDirective } from '@atoms/text-input/text-input.directive';
import { SaveScenarioComponent } from './organisms/save-scenario/save-scenario.component';
import { UploadItemsDirective } from './atoms/upload-items/upload-items.directive';
import { UploadItemsComponent } from './atoms/upload-items/upload-items.component';
import { UploadWeeklyPromotionsComponent } from './organisms/upload-weekly-promotions/upload-weekly-promotions.component';
// import { BaselineLiftComponent } from './molecules/baseline-lift/baseline-lift.component';
import { PromosimulatorBuilderAggregatedComponent } from './organisms/promosimulator-builder-aggregated/promosimulator-builder-aggregated.component';
// import { MarsCustomerPlMetricsComponent } from './molecules/mars-customer-pl-metrics/mars-customer-pl-metrics.component';
import { PlChartComponent } from '@organisms/charts/pl-chart/pl-chart.component';
import { CompareScenarioChartComponent } from '@organisms/charts/compare-scenario-chart/compare-scenario-chart.component';
import { BaselineLiftChartComponent } from '@organisms/charts/baseline-lift-chart/baseline-lift-chart.component';
import { KpiMetricsComponent } from '@molecules/kpi-metrics/kpi-metrics.component';
import { CompareScenarioPopupComponent } from '@organisms/compare-scenario-popup/compare-scenario-popup.component';
import { PromotionPlansTabComponent } from '@molecules/promotion-plans-tab/promotion-plans-tab.component';
import { LoadedOptimizerHeaderComponent } from '@organisms/loaded-optimizer-header/loaded-optimizer-header.component';
import { MetricItemDirective } from '@molecules/metric-item/metric-item.directive';
import { LargeToolTipComponent } from '@molecules/large-tool-tip/large-tool-tip.component';
import { PromoOptimizerAggregatedComponent } from '@organisms/promo-optimizer-aggregated/promo-optimizer-aggregated.component';
import { CalendarChartComponent } from '@organisms/charts/calendar-chart/calendar-chart.component';
import { CalendarSimulatedChartComponent } from '@organisms/charts/calendar-simulated-chart/calendar-simulated-chart.component';
import { PromotionDetailsComponent } from './organisms/promotion-details/promotion-details.component';
import { OptimizeFunctionComponent } from '@organisms/optimize-function/optimize-function.component';
import {DeleteAlertComponent} from "@organisms/delete-alert/delete-alert.component"
import { UserGuidePopupComponent } from '@organisms/user-guide-popup/user-guide-popup.component';
import { FilterBasicOptimizerComponent } from '@organisms/filter-basic-optimizer/filter-basic-optimizer.component';
import {ConfirmationPopupComponent} from "@organisms/confirmation-popup/confirmation-popup.component"
import {PricingProductPopupComponent} from "@organisms/pricing-product-popup/pricing-product-popup.component"
import { PricingHeaderComponent } from './organisms/pricing-header/pricing-header.component';
import { LoadedPricingScenarioHeaderComponent } from './organisms/loaded-pricing-scenario-header/loaded-pricing-scenario-header.component';
import { LoadedPricingScenarioHeaderAdminComponent } from './organisms/loaded-pricing-scenario-header-admin/loaded-pricing-scenario-header-admin.component';
import { PricingScenarioBuilderTabsComponent } from './organisms/pricing-scenario-builder-tabs/pricing-scenario-builder-tabs.component';
import { PricingScenarioBuilderPopupComponent } from './organisms/pricing-scenario-builder-popup/pricing-scenario-builder-popup.component';
import { ComparePricingScenarioComponent } from './organisms/compare-pricing-scenario/compare-pricing-scenario.component';
import { ManageMetricsPricingtoolComponent } from './organisms/manage-metrics-pricingtool/manage-metrics-pricingtool.component';
import { AddNewPricingtoolPopupComponent } from './organisms/add-new-pricingtool-popup/add-new-pricingtool-popup.component';
import { CompetitionComponent } from './molecules/competition/competition.component';
import { PriceElasticityComponent } from './molecules/price-elasticity/price-elasticity.component';
import { PricingMetricComponent } from './molecules/pricing-metric/pricing-metric.component';
import { LoadScenarioPricingtoolPopupComponent } from './organisms/load-scenario-pricingtool-popup/load-scenario-pricingtool-popup.component';
import { PricingScenarioPricingtoolPopupComponent } from './organisms/pricing-scenario-pricingtool-popup/pricing-scenario-pricingtool-popup.component';
import { LoadedPricingScenarioPricingtoolComponent } from './organisms/loaded-pricing-scenario-pricingtool/loaded-pricing-scenario-pricingtool.component';
import { PricingProductItemComponent } from './atoms/pricing-product-item/pricing-product-item.component';
import { ProductTabsComponent } from './atoms/product-tabs/product-tabs.component';
import { CalendarComponent } from './atoms/calendar/calendar.component';
import { GraphicalSummaryDropdownComponent } from './molecules/graphical-summary-dropdown/graphical-summary-dropdown.component';
import { SubTabsComponent } from './molecules/sub-tabs/sub-tabs.component';

// Scrollable Directive
import { ScrollableDirective } from './molecules/sub-tabs/scrollable.directive';
import {PricingMetricInputComponent} from "./molecules/pricing-metric-input/pricing-metric-input.component"
import {PricingMetricIpComponent} from "./molecules/pricing-metric-ip/pricing-metric-ip.component"
import {ApplyAllPopupComponent} from "./molecules/apply-all-popup/apply-all-popup.component"
import {PricingIpComponent} from "./molecules/pricing-ip/pricing-ip.component"
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ToggleSwitchComponent } from './atoms/toggle-switch/toggle-switch.component';


@NgModule({
    imports: [RouterModule,SharedModule,CommonModule, NgxSliderModule, NgSelectModule, FormsModule, 
        // ChartsModule,
        SelectDropDownModule,
        DragDropModule,
        MatDatepickerModule,
    MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatTreeModule,
        MatExpansionModule,
        DpDatePickerModule,
        // MyDatePickerModule,
        MatTabsModule,
    ],
    declarations: [
        ScrollableDirective,
        ButtonComponent,
        LinkComponent,
        CommandSearchComponent,
        PromotoolTabComponent,
        SvgIconComponent,
        StatusBarComponent,
        MenuItemComponent,
        FilterItemComponent,
        MetricItemComponent,
        CommandHeaderComponent,
        CommandMultiselectComponent,
        CommandIconitemComponent,
        SearchFooterComponent,
        CheckboxComponent,
        SideMenuComponent,
        SideBarComponent,
        PromoHeaderComponent,
        LoadedScenarioitemComponent,
        LoadedScenarioHeaderComponent,
        LoadedScenarioControlsComponent,
        LoadedScenarioExpandComponent,
        PromoElasticityComponent,
        DropdownComponent,
        CellItemComponent,
        CellWeekItemComponent,
        ComparescenarioCellHeaderComponent,
        ScenarioLoadCardComponent,
        ChartToolTipComponent,
        FilterRetailerComponent,
        FilterComponent,
        SvgIconDirective,
        StatusBarDirective,
        SimulatedFilterItemDirective,
        SimulatedFilterItemComponent,
        WeeklyPromotionComponent,
        SummaryComponent,
        SummaryPlaceholderComponent,
        ToggleCtaComponent,
        ToggleComponent,
        TabNavItemComponent,
        TabCtaComponent,
        LegendItemsComponent,
        LegendItemsDirective,
        FilterBasicComponent,
        PromoscenariobuilderInitialstateComponent,
        TableViewComponent,
        CellHeaderComponent,
        CellItemDirective,
        FilterCategoriesComponent,
        FilterStrageticCellsComponent,
        FilterBrandsComponent,
        FilterBrandsFormatsComponent,
        FilterProductGroupsComponent,
        LoadScenarioPricingComponent,
        LoadScenarioPromosimulatorComponent,
        PricingScenarioComponent,
        PromoSimulatorScenarioComponent,
        MetricItemPopupComponent,
        LoadedPricingScenarioComponent,
        LoadedPromosimulatorScenarioComponent,
        PromoScenariobuilderPopupComponent,
        PromoElasticityPopupComponent,
        PromoOptimizerPopupComponent,
        SliderComponent,
        AddCompareScenarioComponent,
        ComparePromoOptimizerComponent,
        ComparePromoScenarioComponent,
        ManageMetricsComponent,
        CompulsoryWeeksPopupComponent,
        OptimizerSummaryPopupComponent,
        WeekItemComponent,
        WeeksIgnoredComponent,
        NumberPromoWeeksComponent,
        DurationPromoWavesComponent,
        MinimumGapWavesComponent,
        NumberPromoWavesComponent,
        MacPopupComponent,
        AddPromotionComponent,
        AddPromotionGermanyComponent,
        TextInputComponent,
        TextInputDirective,
        SaveScenarioComponent,
        UploadItemsDirective,
        UploadItemsComponent,
        UploadWeeklyPromotionsComponent,
        ModalComponent,
        // BaselineLiftComponent,
        PromosimulatorBuilderAggregatedComponent,
        // MarsCustomerPlMetricsComponent,
        SelectOptionComponent,
        D3ChartComponent,
        PlChartComponent,
        CompareScenarioChartComponent,
        BaselineLiftChartComponent,
        KpiMetricsComponent,
        CompareScenarioPopupComponent,
        PromotionPlansTabComponent,
        LoadedOptimizerHeaderComponent,
        MetricItemDirective,
        LargeToolTipComponent,
        PromoOptimizerAggregatedComponent,
        CalendarChartComponent,
        CalendarSimulatedChartComponent,
        PromotionDetailsComponent,
        OptimizeFunctionComponent,
        DeleteAlertComponent,
        UserGuidePopupComponent,
        FilterBasicOptimizerComponent,
        ConfirmationPopupComponent,
        PricingProductPopupComponent,
        PricingHeaderComponent,
        LoadedPricingScenarioHeaderComponent,
        LoadedPricingScenarioHeaderAdminComponent,
        PricingScenarioBuilderTabsComponent,
        PricingScenarioBuilderPopupComponent,
        ComparePricingScenarioComponent,
        ManageMetricsPricingtoolComponent,
        AddNewPricingtoolPopupComponent,
        CompetitionComponent,
        PriceElasticityComponent,
        PricingMetricComponent,
        LoadScenarioPricingtoolPopupComponent,
        PricingScenarioPricingtoolPopupComponent,
        LoadedPricingScenarioPricingtoolComponent,
        PricingProductItemComponent,
        ProductTabsComponent,
        CalendarComponent,
        GraphicalSummaryDropdownComponent,
        SubTabsComponent,
        PricingMetricInputComponent,
        PricingMetricIpComponent,
        PricingIpComponent,
        ApplyAllPopupComponent,
        ToggleSwitchComponent
    ],
    exports: [
        ButtonComponent,
        LinkComponent,
        CommandSearchComponent,
        PromotoolTabComponent,
        SvgIconComponent,
        StatusBarComponent,
        MenuItemComponent,
        FilterItemComponent,
        MetricItemComponent,
        CommandHeaderComponent,
        CommandMultiselectComponent,
        CommandIconitemComponent,
        SearchFooterComponent,
        CheckboxComponent,
        SideMenuComponent,
        SideBarComponent,
        PromoHeaderComponent,
        LoadedScenarioitemComponent,
        LoadedScenarioHeaderComponent,
        LoadedScenarioControlsComponent,
        LoadedScenarioExpandComponent,
        PromoElasticityComponent,
        CellItemComponent,
        CellWeekItemComponent,
        ComparescenarioCellHeaderComponent,
        ScenarioLoadCardComponent,
        ChartToolTipComponent,
        FilterRetailerComponent,
        FilterComponent,
        SvgIconDirective,
        StatusBarDirective,
        SimulatedFilterItemDirective,
        SimulatedFilterItemComponent,
        WeeklyPromotionComponent,
        SummaryComponent,
        SummaryPlaceholderComponent,
        ToggleCtaComponent,
        ToggleComponent,
        TabNavItemComponent,
        TabCtaComponent,
        LegendItemsComponent,
        LegendItemsDirective,
        FilterBasicComponent,
        PromoscenariobuilderInitialstateComponent,
        TableViewComponent,
        CellHeaderComponent,
        CellItemDirective,
        FilterCategoriesComponent,
        FilterStrageticCellsComponent,
        FilterBrandsComponent,
        FilterBrandsFormatsComponent,
        FilterProductGroupsComponent,
        LoadScenarioPricingComponent,
        LoadScenarioPromosimulatorComponent,
        PricingScenarioComponent,
        PromoSimulatorScenarioComponent,
        MetricItemPopupComponent,
        LoadedPricingScenarioComponent,
        LoadedPromosimulatorScenarioComponent,
        PromoScenariobuilderPopupComponent,
        PromoElasticityPopupComponent,
        ModalComponent,
        PromoOptimizerPopupComponent,
        SliderComponent,
        NgxSliderModule,
        NgSelectModule,
        FormsModule,
        AddCompareScenarioComponent,
        ComparePromoOptimizerComponent,
        ComparePromoScenarioComponent,
        ManageMetricsComponent,
        TextInputComponent,
        TextInputDirective,
        SaveScenarioComponent,
        UploadItemsDirective,
        UploadItemsComponent,
        NgxSliderModule,
        UploadWeeklyPromotionsComponent,
        NgxSliderModule,
        AddPromotionComponent,
        AddPromotionGermanyComponent,
        // BaselineLiftComponent,
        // MarsCustomerPlMetricsComponent,
        PromosimulatorBuilderAggregatedComponent,
        PromoOptimizerAggregatedComponent,
        SelectOptionComponent,
        DropdownComponent,
        SelectDropDownModule,
        D3ChartComponent,
        PlChartComponent,
        CompareScenarioChartComponent,
        BaselineLiftChartComponent,
        KpiMetricsComponent,
        CompareScenarioPopupComponent,
        LoadedOptimizerHeaderComponent,
        MetricItemDirective,
        CalendarChartComponent,
        CalendarSimulatedChartComponent,
        NumberPromoWavesComponent,
        ComparePricingScenarioComponent,
        PromotionDetailsComponent,
        OptimizeFunctionComponent,
        DurationPromoWavesComponent,
        MinimumGapWavesComponent,
        CompulsoryWeeksPopupComponent,
        OptimizerSummaryPopupComponent,
        UserGuidePopupComponent,
        WeeksIgnoredComponent,
        MacPopupComponent,
        NumberPromoWeeksComponent,
        SaveScenarioComponent,
        DeleteAlertComponent,
        FilterBasicOptimizerComponent,
        ConfirmationPopupComponent,
        PricingProductPopupComponent,
        PricingHeaderComponent,
        LoadedPricingScenarioHeaderComponent,
        LoadedPricingScenarioHeaderAdminComponent,
        LoadScenarioPricingtoolPopupComponent,
        PricingScenarioBuilderTabsComponent,
        PricingProductItemComponent,
        AddNewPricingtoolPopupComponent,
        ProductTabsComponent,
        DpDatePickerModule,
        MatDatepickerModule,
       MatNativeDateModule,
       MatInputModule,
       MatFormFieldModule,

        // MyDatePickerModule,
        CalendarComponent,
        MatTabsModule,
        ApplyAllPopupComponent,
        ToggleSwitchComponent
    ],
})
export class ComponentModule {}
