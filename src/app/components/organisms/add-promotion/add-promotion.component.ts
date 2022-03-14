import { Component, Input, OnInit } from '@angular/core';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {OptimizerService, PromotionService, SimulatorService} from '@core/services'
import {CheckboxModel, TacticsModel} from '@core/models'
import { ModalService } from '@molecules/modal/modal.service';
import * as Utils from "@core/utils"
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import {Subject} from 'rxjs';
import {takeUntil} from "rxjs/operators"
// import { tickStep } from 'd3-array';
const MUTLIBUY_KEY = 'Multibuy'
const TPR_KEY = 'TPR'
const TPR_MULTIBUY_KEY = 'TPR + Multibuy' 
const DISPLAY_KEY = 'Display'
const CP_KEY = 'Consumer Promotions'
const CUSTOM_KEY = 'Custom'
// 'Multibuy' , 'TPR' , 'TPR + Multibuy'
@Component({
    selector: 'nwn-add-promotion',
    templateUrl: './add-promotion.component.html',
    styleUrls: ['./add-promotion.component.css'],
})



export class AddPromotionComponent implements OnInit {
    private LEVEL_ONE_PROMO_KEY   = [MUTLIBUY_KEY , TPR_KEY,TPR_MULTIBUY_KEY]
    private DISPLAY_KEY = DISPLAY_KEY
    private CP_KEY = CP_KEY
    CUSTOM_KEY = CUSTOM_KEY
    promo_name:any[] = []
    promo_name2:any[] = []
    display_keys:CheckboxModel[] = []
    is_consumer_promotion = false
    tactics_data : TacticsModel[]
    disable_level_two = true
    show_custom = false
    selected_display:any[] = []
   
    private LEVEL_TWO_MAP = {}
    generated_promotion = ''
    errMsg:any = {
        mechanic: false,
        discount: false,
        co_investment: false
    }
    constructor(private toastr: ToastrService,private optimize : OptimizerService,
        public modalService: ModalService,public restApi: SimulatorService,
        private promotionService : PromotionService,
        ){

    }
    private unsubscribe$: Subject<any> = new Subject<any>();
    config:any = {
        displayKey: 'name', // if objects array passed which key to be displayed defaults to description
        search: true
    };
    promo_generated = ''
    input_promotions:Array<CheckboxModel> = []
    base_line_promotions:Array<CheckboxModel> = []
    history_baseline:Array<any> = []

    form = new FormGroup({
        promo_level_one: new FormControl('', []),
        promo_level_two: new FormControl('', []),
        display : new FormControl([],[]),
        cp : new FormControl(false , []),
        multibuy_split_1 :new FormControl(0, []),
        multibuy_split_2 :new FormControl(0.0, []),
        promo_price : new FormControl(0, []),
        custom_promo_name : new FormControl('' , []),
        generated_promo : new FormControl('',[])
      });
    @Input()
    valueDiscountdepth = 0;

    @Input()
    currency;

    @Input()
    valueCoInvestment = 0;

    @Input()
    discountdepth: Options = {
        floor: 0,
        ceil: 100,
        showSelectionBar: true,
        disabled: true,
        translate: (value: number, label: LabelType): string => {
            if(value!=100){
                // this.form.controls['tpr'].setValue(value);

            }
           
            switch (label) {
                case LabelType.Ceil:
                    return value + ' %';
                case LabelType.Floor:
                    return value + ' %';
                default:
                    return '' + value;
            }
        },
    };
    coInvestment: Options = {
        floor: 0,
        ceil: 100,
        showSelectionBar: true,
        disabled: true,
        translate: (value: number, label: LabelType): string => {
            if(value!=100){
                // this.form.controls['co_inv'].setValue(value);

            }
           
             
            switch (label) {
                case LabelType.Ceil:
                    return value + ' %';
                case LabelType.Floor:
                    return value + ' %';
                default:
                    return '' + value;
            }
        },  
    };
    get f(){
        return this.form.controls;
      }
    

    ngOnInit(){
        this.optimize.getBaseLineObservable().pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(data=>{
            // this.base_line_promotions = data
            this.base_line_promotions = data.map(e=>({"value" : e,"checked" : false}))
            console.log(this.base_line_promotions , "base line promotions UK")
        })

        
         
        
        this.promotionService.getTactics().pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(data=>{
            if(data){
                this.tactics_data = data
                console.log(this.tactics_data , "tactics_datatactics_datatactics_data")
            this._generatePromotionVariables()
            console.log(this.promo_name , "level one result")

            }
            

        })
        
        this.restApi.ClearScearchText.asObservable().pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(data=>{
            if(data == "add-promotion"){
               
                this.valueCoInvestment = 0
                this.valueDiscountdepth = 0
                this.form.reset()
               
            }
            
            
          })
        //   setTimeout(()=>{
           
        //     },500)
    this.config = {
        displayKey: 'name', // if objects array passed which key to be displayed defaults to description
        // search: true,
    };
    // this.form.valueChanges.subscribe(data=>{
     
    // let final = Utils.genratePromotion(
    //     data.promo == "Motivation" ? 1 : 0,
    //     data.promo == "N+1" ? 1 : 0,
    //     data.promo == "Traffic" ? 1 : 0,
    //  data.tpr,
    //  data.co_inv
    // )
    // setTimeout(()=>{
    //     this.base_line_promotions = this.optimize.get_base_line_promotions().map(e=>({"value" : e,"checked" : false}))
    //     this.promo_name = this.optimize.get_base_line_promotions().map(e=>Utils.decodePromotion(e)['promo_mechanics'])
    //     this.promo_name = [...new Set(this.promo_name.map(item => item))]
    //     //console.log(this.base_line_promotions , "base line promotions")
    //     },100)
    //      setTimeout(()=>{
            
    //     this.promo_generated = final
    //     //console.log(this.promo_generated , "this.promo_generated this.promo_generated ")

    // },500)
    // })
  
    }
    _generate_form_promotion(){
        this.generated_promotion = ''
        let form_values = this.form.value
        console.log(form_values , "from values")
        let level_one = form_values['promo_level_one']
        let level_two = form_values['promo_level_two']
        if(level_two == CUSTOM_KEY && level_one == MUTLIBUY_KEY){
            this.generated_promotion += form_values['multibuy_split_2'] + "/" + this.currency + form_values['multibuy_split_1']
            // this.generated_promotion += this.currency+form_values['custom_promo_name']
        }
        else if(level_two == CUSTOM_KEY && level_one == TPR_KEY){
            this.generated_promotion +=this.currency + form_values['promo_price']

        }
        else{
            this.generated_promotion += level_two 
        }
        let joint_display = form_values['display']
        
        if(joint_display && joint_display.length>0){
            joint_display= joint_display.join("+")
            this.generated_promotion += "+" + joint_display

        }
        
        if(form_values['cp']){
            this.generated_promotion += "+CP"
        }
        
        // console.log(this.form.value , "current form values")
        console.log(this.generated_promotion , "generated promotion")
        console.log(joint_display , "joint disaply")
        this.form.patchValue({
            "generated_promo" : this.generated_promotion
        })
    }
    _generate_level_one_promo(data : TacticsModel){
        
        if(this.LEVEL_ONE_PROMO_KEY.includes(data.promo_mechanic_1) && 
            !this.promo_name.includes(data.promo_mechanic_1)){
            // this.promo_name.push(data.promo_mechanic_1)
            this.promo_name = [...this.promo_name , data.promo_mechanic_1]
        }

    }
    _generate_level_two_promo(data : TacticsModel){
        // this.LEVEL_TWO_MAP = {}
        // debugger
        if(
            (data.promo_mechanic_1 in this.LEVEL_TWO_MAP) && 
            this.LEVEL_ONE_PROMO_KEY.includes(data.promo_mechanic_1)
            )
            {
                if(!this.LEVEL_TWO_MAP[data.promo_mechanic_1].includes(data.promo_mechanic_2)){
                    this.LEVEL_TWO_MAP[data.promo_mechanic_1].push(data.promo_mechanic_2)
                }
                


        }
        else if (
            (!(data.promo_mechanic_1 in this.LEVEL_TWO_MAP)) && 
            this.LEVEL_ONE_PROMO_KEY.includes(data.promo_mechanic_1)
            ){
                this.LEVEL_TWO_MAP[data.promo_mechanic_1] = [data.promo_mechanic_2]

            }
        
    }
    _generate_display_cp_checkbox(data:TacticsModel){
        if(this.DISPLAY_KEY == data.promo_mechanic_1){
            this.display_keys.push({"value" : data.promo_mechanic_2 , "checked" : false})
        }
        else if(this.CP_KEY == data.promo_mechanic_1){
            this.is_consumer_promotion = true
        }
    }
    _generatePromotionVariables(){
        this.promo_name = []
        this.promo_name2 = []
        this.display_keys = []
    
       
        this.tactics_data.forEach(data=>{
            this._generate_level_one_promo(data)
            this._generate_level_two_promo(data)
            this._generate_display_cp_checkbox(data)
            
        

        })
        
    }
    hideNoResultsFound(){
        $( "#promo-details" ).click(function() {
           let temp:any =  $(".available-items").text();
           if(temp == "No results found!"){
            $(".available-items").hide()
           }
           else {
            $(".available-items").show()
           }
        })
    }
    valueChangePromo(e:any){
        //console.log(e.value , "promo value selected")
    }
    valueChangeDisplay(e){
       
        if(e.checked){
            this.selected_display.push(e.value)

        }
        else{
        var idx = this.selected_display.findIndex(p =>p== e.value);
    this.selected_display.splice(idx,1);

        }
        this.form.patchValue({
            "display" : this.selected_display
        })
       
        console.log(e , "checkbox change...")
        this._generate_form_promotion()
        // console.log(e , "checkbox change...")
    }
    valueChangeCP(e){
        this.form.patchValue({
            "cp" :e.checked
        })

        this._generate_form_promotion()
    }
    valueChangeBaseline(e:any){
        let f = this.input_promotions.find(i=>i.value == e.value)
        if(!f){
            this.history_baseline.push(e.value)
            this.input_promotions.push({"value" : e.value, "checked" : e.checked})
            // //console.log(this.input_promotions , "input promotions ")
            // debugger
            this.base_line_promotions = this.base_line_promotions.filter(val=>val.value!=e.value)
            // this.base_line_promotions.indexOf()
            // //console.log(e.value , "base line promo value")
        }
       

    }
    applyPromotion(){
        if(this.input_promotions.length > 0){
            let val = this.input_promotions.map(e=>e.value)
            //console.log(val , "val genetratefd")
            this.optimize.setPromotionObservable(val)
            //console.log(this.input_promotions , "input promotions ") 
            var modal_id:any = this.modalService.opened_modal
            if(modal_id.length > 0){
                modal_id = modal_id[modal_id.length-1]
                // $('#'+modal_id).hide(); 
                this.modalService.close(modal_id)
                this.restApi.setClearScearchTextObservable(modal_id)
            }
        }
        else{
            this.toastr.error("Please select atleast one promotion")
        }
    }   

    addPromotions(){
        // form_values
        
        let form_values = this.form.value
        if(form_values['promo_level_one'] == MUTLIBUY_KEY){
            if(form_values['promo_level_two'] == CUSTOM_KEY){
                let tactic = {
                    "model_meta" : 0,
                    "promo_mechanic_1" : form_values['promo_level_one'],
                    "promo_mechanic_2" : form_values['multibuy_split_2'] + "/" + this.currency + form_values['multibuy_split_1'],
                    "promo_price" : form_values['promo_price']
                }
                console.log(tactic , "tactic gemenrations")
                this.promotionService.addTactics(tactic)

            }
        }
        else if(form_values['promo_level_one'] == TPR_KEY){
            if(form_values['promo_level_two'] == CUSTOM_KEY){
                let tactic = {
                    "model_meta" : 0,
                    "promo_mechanic_1" : form_values['promo_level_one'],
                    "promo_mechanic_2" : this.currency + form_values['promo_price'],
                    "promo_price" : form_values['promo_price']
                }
                console.log(tactic , "tactic gemenrations")
                this.promotionService.addTactics(tactic)

            }
        }
       
        // debugger 
        // if(this.form.value.promo != ""){
        //     if(Object.prototype.toString.call(this.form.value.promo).slice(8, -1).toLowerCase() == 'array'){
        //         this.errMsg.mechanic = true
        //         return
        //     }
        // }
        // else if(this.form.value.promo == ""){
        //     this.errMsg.mechanic = true
        //     return
        // }

        // if((this.form.value.tpr == 0 || this.form.value.tpr == null) && (this.form.value.co_inv == 0 || this.form.value.co_inv == null)){
        //     this.errMsg.discount = true
        //     return
        // }

        // if(this.form.value.co_inv == 0 || this.form.value.co_inv == null){
        //     this.errMsg.co_investment = true
        //     return
        // }
        var gen_promo = this.form.value['generated_promo']
        if(gen_promo){
            if(!this.input_promotions.find(v=>v.value == gen_promo)){
                this.input_promotions.push({"value" : gen_promo , "checked" : false})
            }
        // if(this.promo_generated){
            // if(!this.input_promotions.find(v=>v.value == this.promo_generated)){
            //     this.input_promotions.push({"value" : this.promo_generated , "checked" : false})
            // }
        // }
       
        // this.valueCoInvestment = 0
        // this.valueDiscountdepth = 0
        this.form.reset()
        this.selected_display = []
        this.display_keys = this.display_keys.map(a => {
            var returnValue = {...a , ...{"checked" : false}};
            
            return returnValue
          })
        console.log(this.display_keys , "display keys..")
        this.errMsg.mechanic = false
        this.errMsg.discount = false
        this.errMsg.co_investment = false
        this.show_custom = false
       

        }
         
        // //console.log(this.promo_generated , "promotion generated")
    }
    clickClosedEvent($event){
        //console.log($event , "click closed event")
        // debugger
        // let val = parseInt($event.replace(/[^0-9]/g,''))
        //console.log($event , "click closed")
        //console.log(this.history_baseline , "history baseline")
        if(this.history_baseline.includes($event)){
            this.base_line_promotions.push({"value" : $event,"checked" : false})
            this.input_promotions = this.input_promotions.filter(val=>val.value!=$event)
        }
        else{
            this.input_promotions = this.input_promotions.filter(val=>val.value!=$event)

        }
        // ignoreElements()
    }
    changeLevelOnePromotion(e:any){
        this.show_custom = false
        this.generated_promotion = ''
        // this.form.patchValue({
            
        // })
        this.form.patchValue({
            "promo_level_two" : '',
            "generated_promo" : ''
        })
        if(e.value == TPR_MULTIBUY_KEY){
            this.promo_name2 = []
        }
        else{
            this.promo_name2 = [this.CUSTOM_KEY]

        }
        
        console.log(e , "level one promotion")
        if(e.value){    
            this.disable_level_two = false
            this.promo_name2 = [...this.promo_name2 , ...this.LEVEL_TWO_MAP[e.value]]
            console.log(this.promo_name2 , "level two promo..")
        }
    }
    onInputChange(e){
        // let ip = e.target.value
        this._generate_form_promotion()

    }
    changePromotion(e:any){
        this.generated_promotion = ''
        this.form.patchValue({
            "generated_promo" : ''
        })
        if(e.value){
            if(e.value == this.CUSTOM_KEY){
                this.show_custom = true
               

            }
            else{
                this.show_custom = false
                this._generate_form_promotion()
                // this.generated_promotion += e.value
            }
           
        }
        //console.log(e.value.length , "lenth of sselscted promotion")
        // if(e.value.length == 0){
        //     this.coInvestment = Object.assign({}, this.coInvestment, {disabled: true})
        // this.discountdepth = Object.assign({}, this.discountdepth, {disabled: true});
        // this.valueDiscountdepth = 0
        // this.valueCoInvestment = 0

        // }
        // else{
        //     this.coInvestment = Object.assign({}, this.coInvestment, {disabled: false})
        // this.discountdepth = Object.assign({}, this.discountdepth, {disabled: false});

        // }
        // this.errMsg.mechanic = false
        // this.form.controls['promo'].setValue(e.value);
        
        //console.log(e.value , "selected value");
        //console.log(this.form.value , "fomr value")
    }
    sliderEvent(){
        this.errMsg.discount = false
    }
    ngOnDestroy(){
        console.log("destroying pricing scenario builderadin header")
        // this.optimizer.getCompareScenarioObservable()
       
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
