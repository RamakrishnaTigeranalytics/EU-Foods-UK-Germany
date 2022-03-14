import { Pipe, PipeTransform } from '@angular/core';
import { CheckboxModel } from '@core/models';

@Pipe({ name: 'subFilter' })
export class SubTabFilter implements PipeTransform {

  _checkProductExistance(is_retailer_checked , product , product_group:Array<CheckboxModel> | undefined) : boolean{
    if(!is_retailer_checked){
      return false
    }
    let retvalue = false
    if(product_group){

      retvalue =  product_group.filter(d=>(d.value == product) && (d.checked)).length > 0
    }
    console.log(product_group , "retvalue product_group")
    console.log(product , "retvalue product")

    console.log(retvalue , "retvalue")
    return retvalue
    


  }
   
  transform(items: any[], product: CheckboxModel,args?:any , product_group?:Array<CheckboxModel> , retailer?:any) {
   
    // // console.log(args , "args any extra")
      console.log(items ,"items in pipe ")
    // // if (!items) {
    // //   return [];
    // // }
    // console.log(items, "subFilter items ")
    // console.log(product , "subFilter product")
    // console.log(items , "iems in pipe")
    // console.log(product , "product in pipe")
    if(args){
      console.log(args , "argumrnts to pipe")
      console.log(product_group , "product group in pipe")
     
      return items.filter(d=>d.account_name == product.value).map(d=>({"value" : d.product_group,
      "checked" : this._checkProductExistance(product.checked , d.product_group , product_group),
    "retailer" : product.value}))
    }
    return items.filter(d=>d.account_name == product).map(d=>d.product_group)  

   
    
  }
} 