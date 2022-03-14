import {ProductWeek} from './product-week.model'
export interface UploadPromotionWeekly{
    week : number,
    promo_depth : number,
    promo_mechanics : string,
    co_investment : number
}
export interface UploadModel {
    base : ProductWeek[],
    simulated : {
        account_name: string,
        brand: string
        brand_format: string
        corporate_segment: string
        param_depth_all: number
        product_group: string
        promo_elasticity: number
        strategic_cell: string,
        weekly : UploadPromotionWeekly[]

    }
   
  }