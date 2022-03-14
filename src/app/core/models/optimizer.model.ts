import {ProductWeek} from "./product-week.model"
export interface OptimizerConfigModel{
    account_name : string
    brand:string
    brand_format : string
    corporate_segment:string
    strategic_cell : string
    product_group : string
    config_gsv: boolean
    config_mac: boolean
    config_mac_perc: boolean
    config_max_consecutive_promo: boolean
    config_min_consecutive_promo: boolean
    config_nsv: boolean
    config_promo_gap: boolean
    config_rp: boolean
    config_rp_perc: boolean
    config_sales: boolean
    config_trade_expense: boolean
    config_units: boolean
    param_gsv: any
    param_mac: any
    param_mac_perc: any
    param_max_consecutive_promo: any
    param_min_consecutive_promo: any
    param_nsv: any
    param_promo_gap: any
    param_rp: any
    param_rp_perc: any
    param_sales: any
    param_trade_expense: any
    param_units: any
    param_no_of_waves:any
    param_no_of_promo : any
}

export interface OptimizerModel {
    data : OptimizerConfigModel,
    weekly :  ProductWeek[]
}
    
    