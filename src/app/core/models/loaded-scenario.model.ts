export interface PromoSimulatedWeeklyModel{
    asp: number;
    promo_depth:number;
    co_investment:number;
base_unit: number;
date: string;
year:string;
quater : any;
month : any;
period : any;
flag_promotype_motivation : number;
flag_promotype_n_pls_1 : number;
flag_promotype_traffic: number;
incremental_unit: number;
mars_cogs_per_unit: number;
mars_mac: number;
mars_mac_percent_of_nsv: number;
mars_total_net_invoice_price:number;
mars_total_nrv: number;
mars_total_off_invoice: number;
mars_total_on_invoice: number;
mars_uplift_net_invoice_price: number;
mars_uplift_nrv: number;
mars_uplift_off_invoice: number;
mars_uplift_on_invoice: number;
predicted_units: number;
promo_asp: number;
retailer_margin:number;
retailer_margin_percent_of_nsv: number;
retailer_margin_percent_of_rsp: number;
roi: number;
simulate_predicted_units: number;
te_per_units:number;
te_percent_of_lsv: number;
total_cogs: number;
total_lsv: number;
total_nsv: number;
total_rsv_w_o_vat: number;
total_trade_expense: number;
total_uplift_cost:number;
total_weight_in_tons: number;
tpr_budget: number;
tpr_budget_roi: number;
trade_expense: number;
uplift_cogs: number;
uplift_gmac_lsv: number;
uplift_lsv: number;
uplift_mac:number;
uplift_nsv: number;
uplift_promo_cost:number;
uplift_royalty: number;
uplift_trade_expense: number;
week:number;
}
export interface PromoSimulatedTotalModel{
    asp: number;
avg_promo_selling_price: number;
base_units: number;
increment_units: number;
lift: number;
lsv: number;
mac: number;
cogs:number;
mac_percent: number;
nsv: number;
roi: number;
rp: number;
rp_percent: number;
te: number;
te_per_unit:number;
te_percent_of_lsv: number;
total_rsv_w_o_vat: number;
units: number;
volume: number;
}

export interface LoadedScenarioModel {
    scenario_name:string;
    scenario_id : number
    account_name:string;
    corporate_segment:string;
    product_group:string;
    scenario_comment : string;
    scenario_type:string;
    promo_elasticity : number
    holiday_array : any[];
    pricing_id?:number
    
    base:{
        total : PromoSimulatedTotalModel;
        weekly : Array<PromoSimulatedWeeklyModel>
    }
    simulated:{
        total : PromoSimulatedTotalModel;
        weekly : Array<PromoSimulatedWeeklyModel>
    }
  }

