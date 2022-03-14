import { Component, OnInit, AfterViewInit, ViewChild, ElementRef,Input,SimpleChanges } from '@angular/core';
import { LoadedScenarioModel , PromoCompareModel} from 'src/app/core/models';
import * as Utils from "@core/utils"
@Component({
    selector: 'nwn-promotion-plans-tab',
    templateUrl: './promotion-plans-tab.component.html',
    styleUrls: ['./promotion-plans-tab.component.css'],
})
export class PromotionPlansTabComponent implements OnInit, AfterViewInit {
    scenario_names:Array<string> = []
    translate_y: string = '';
    currentTranslateRate: string = '';
    @Input()
    loaded_scenario:Array<any> = []

    @Input()
    tenant:any
    promotions :PromoCompareModel[] = []
    constructor(private elRef: ElementRef,) {}

    public ppTableWidth: any;
    public ppTableHeight: any;

    ngOnInit(): void {
        this.ppTableWidth = window.innerWidth - 155;
        this.ppTableHeight = window.innerHeight - 250;
        // this.generate_metrics(this.loaded_scenario)
    }
    _get_uk_promotion(){

    }
    _get_germany_promotion(data){
        return Utils.genratePromotionGermany(
            parseFloat(data.promo_depth) , 
            parseFloat(data.flag_promotype_leaflet) , 
            parseFloat(data.flag_promotype_display),
            parseFloat(data.flag_promotype_distribution_500),
            
        )
        // let simulated_promotion = Utils.genratePromotion(
        //     parseFloat(data.flag_promotype_motivation) , 
        //     parseFloat(data.flag_promotype_n_pls_1),
        //     parseFloat(data.flag_promotype_traffic),
        //     parseFloat(data.promo_depth) , 
        //     parseFloat(data.co_investment)
        // )
        // let base_promo = Utils.genratePromotion(
        //     parseFloat(base_value[index].flag_promotype_motivation) , 
        //     parseFloat(base_value[index].flag_promotype_n_pls_1),
        //     parseFloat(base_value[index].flag_promotype_traffic),
        //     parseFloat(base_value[index].promo_depth) , 
        //     parseFloat(base_value[index].co_investment)
        // )

    }
    generate_metrics(loaded_scenario : Array<any>){
        
        this.promotions = []
        this.scenario_names = []
        loaded_scenario.forEach(element => {
            
        //    console.log(element,"check promotion here")
            let base_value:any = element.base.weekly
            let ele:any = {
                "id" : element.scenario_id,
                "name" : element.scenario_name,
                "comment" : element.scenario_comment,
                "retailer" : {
                    "account_name" : element.account_name,
                    "product_group" : element.product_group
                }
            }
            this.scenario_names.push(ele)
            element.simulated.weekly.forEach((data:any,index)=>{
                // console.log(data , "promotion plans tabs value")
                // debugger

                let promo = this.promotions.find(d=>d.week == data.week)
                let simulated_promotion
                let base_promo
                if(this.tenant == 'uk'){
                    simulated_promotion = data.tactic
                    base_promo = base_value[index].tactic
                }
                else{
                    simulated_promotion = this._get_germany_promotion(data)
                    base_promo = this._get_germany_promotion(base_value[index])
                    // Utils.genratePromotion(
                    //     parseFloat(.flag_promotype_motivation) , 
                    //     parseFloat(base_value[index].flag_promotype_n_pls_1),
                    //     parseFloat(base_value[index].flag_promotype_traffic),
                    //     parseFloat(base_value[index].promo_depth) , 
                    //     parseFloat(base_value[index].co_investment)
                    // )
            

                }
                
                if(promo){
                    promo.discount.push({"promotion_value": base_promo,"promotion_value_simulated": simulated_promotion})

                }
                else{
                    this.promotions.push(
                        {"week" : data.week,
                        "date":data.date , 
                        discount:[{"promotion_value": base_promo,"promotion_value_simulated": simulated_promotion}]
                    })
                }
               
                
            })
      
        });
        // console.log(this.promotions , "promotions data in promo plans")
       
       

    }


    @ViewChild('promoplanTableScroll', { static: false }) promoplanTableScroll: any;
    scrolling_table: any;

    ngAfterViewInit() {
        // this.slider = this.elRef.nativeElement.querySelector('.slide');
        this.scrolling_table = this.elRef.nativeElement.querySelector('.promoplanTableScroll');
        this.scrolling_table.addEventListener('scroll', this.freeze_pane_listener(this.scrolling_table));
    }

    freeze_pane_listener(what_is_this: { scrollTop: string; scrollLeft: string }) {
        return () => {
            var i;
            var self = this;
            self.translate_y = '';

            var translate_y = 'translate(0px,' + what_is_this.scrollTop + 'px)';
            var translate_x = 'translate(' + what_is_this.scrollLeft + 'px)';
            var translate_xy = 'translate(' + what_is_this.scrollLeft + 'px,' + what_is_this.scrollTop + 'px)';

            self.currentTranslateRate = what_is_this.scrollLeft;

            var fixed_vertical_elts = document.getElementsByClassName(
                'ppfreeze_vertical',
            ) as HTMLCollectionOf<HTMLElement>;
            var fixed_horizontal_elts = document.getElementsByClassName(
                'ppfreeze_horizontal',
            ) as HTMLCollectionOf<HTMLElement>;
            var fixed_both_elts = document.getElementsByClassName('ppfreeze') as HTMLCollectionOf<HTMLElement>;

            for (i = 0; i < fixed_horizontal_elts.length; i++) {
                // fixed_horizontal_elts[i].style.webkitTransform = translate_x;
                fixed_horizontal_elts[i].style.transform = translate_x;
            }
            for (i = 0; i < fixed_vertical_elts.length; i++) {
                // fixed_vertical_elts[i].style.webkitTransform = translate_y;
                fixed_vertical_elts[i].style.transform = translate_y;
            }
            for (i = 0; i < fixed_both_elts.length; i++) {
                // fixed_both_elts[i].style.webkitTransform = translate_xy;
                fixed_both_elts[i].style.transform = translate_xy;
            }
        };
    }
    singleSelect: any = [];
    config = {
        displayKey: 'name', // if objects array passed which key to be displayed defaults to description
        search: false,
    };
    yearValue = [
        {
            _id: '1year',
            index: 0,
            name: '1 Year',
        },
        {
            _id: '2year',
            index: 0,
            name: '2 Year',
        },
        {
            _id: '3year',
            index: 0,
            name: '3 Year',
        },
    ];
    ngOnChanges(changes: SimpleChanges) {
 
        for (let property in changes) {
            if (property === 'loaded_scenario') {
                
                this.loaded_scenario = changes[property].currentValue
                this.generate_metrics(this.loaded_scenario)
               
            } 
        }
    }
}
