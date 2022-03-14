export interface ProductWeek {
model_meta: number,
year: number,
quater: number,
month: number,
period: number,
week: number,
date: string,
tpr_discount: any,
flag_promotype_leaflet: any,
flag_promotype_display: any,
flag_promotype_distribution_500: any,
median_base_price_log : number,
// flag_promotype_traffic: any
promotion_name?:any,
base_promo_price?:any,
promo_price?:any
}

export interface ProductWeekUk{

    model_meta: number,
year: number,
quater: number,
month: number,
period: number,
week: number,
date: string,
tpr_discount: any,
flag_promotype_chille:number,
flag_promotype_clubcard:number,
flag_promotype_consumer_promotions:number,
flag_promotype_display_ge:number,
flag_promotype_display_ss:number,
flag_promotype_long_term_multibuy: number,
flag_promotype_long_term_tpr:number,
flag_promotype_pl:number,
flag_promotype_poweraisle:number,
flag_promotype_short_term_multibuy:number,
flag_promotype_short_term_tpr:number,
median_base_price_log : number,
base_tactics: string
// flag_promotype_traffic: any
promotion_name?:any,
base_promo_price?:any,
promo_price?:any

}

