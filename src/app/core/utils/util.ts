// import { type } from "os"

import * as moment from "moment"

export const DISPLAY = 'Display'
export const LEAFLET = 'Leaflet'
export  const DISTRIBUTION = 'Distribution'

export function get_tactics_from_mechanic(value){
  if(value){
    return value.split("+")[0]
  }
  return ''

}

export function reducePercent(value , percent){
  return value * (1  - (percent / 100))
}
export function increasePercent(value , percent){
  return value * (1  + (percent / 100))

}

export function findPercentDifference(a,b){
  if(a == 0 || b ==0){
    return 0
  }
  
  // console.log(a,b , "findPercentDifferencefindPercentDifferencefindPercentDifference")
  let val = ((a-b)/a) * 100
  
  return parseFloat(val.toFixed(2));
  
}
export function _divide(n1 , n2){
    if(!n1 || !n2){
      return 0

    }
    return n1/n2
  }

  export function isArray(obj : any ) {
    return Array.isArray(obj)
 }


export function convertMomentToDate(moment_date){
  console.log(moment_date , "moentdatemoentdatemoentdatemoentdatemoentdatemoentdate")
  // debugger
  if(!moment_date){
    return null
  }
  // console.log()
  let x = moment_date
  if(moment_date instanceof moment){
    x = x.toDate()
  }
  if(typeof(moment_date) == 'string'){
    console.log("str type...")
    x =new Date(moment_date)
  }
  
  let hoursDiff = x.getHours() - x.getTimezoneOffset() / 60;
  let minutesDiff = (x.getHours() - x.getTimezoneOffset()) % 60;
  x.setHours(hoursDiff);
  x.setMinutes(minutesDiff);
  return x
}


export function generateMessage1(metric , type){
  // debugger
  // arrow: "carret-up"
  let message = ``
  if(metric['arrow'] == "carret-up"){
    message += `in increase in ${type} by ${(metric['converted_difference']).replace(/[()]/g, '')} ${metric['percent']}`

  }
  else if(metric['arrow'] == "carret-down"){
    message += `in decrease in ${type} by ${(metric['converted_difference']).replace(/[()]/g, '')} ${metric['percent']}`

  }
  else {
    message += `in unchanged ${type}`

  }

return message
}
export function generateMessage2(metric){
  let message = ` Trade Margin `
  if(metric['arrow'] == "carret-up"){
    message +=  `has increased by ${(metric['converted_difference']).replace(/[()]/g, '')} ${metric['percent']} as compared to the base calendar`

  }
  else if(metric['arrow'] == "carret-down"){
    message +=  `has decreased by ${(metric['converted_difference']).replace(/[()]/g, '')} ${metric['percent']} as compared to the base calendar`

  }
  else {
    message +=  `is unchanged`

  }
  return message
}

export function generateMessage3(metric){
  let message = ` Trade expense `
  if(metric['arrow'] == "carret-up"){
    message+= `has increased by ${(metric['converted_difference']).replace(/[()]/g, '')} ${metric['percent']}`

  }
  else if(metric['arrow'] == "carret-down"){
    message+= `has reduced by ${(metric['converted_difference']).replace(/[()]/g, '')} ${metric['percent']}`
  }
  else{
    message+= `is unchanged`
  }
  
  return message
}




export function generateMessageRandom(index: any,financial_metrics,metric1: any,metric2: any,metric3 :any,flag="optimizer"){
  let result1:any = ''
  let result2:any = ''
  let result3:any = ''
  if(index == 2){
    if(financial_metrics['simulated']['total']['rp'] > financial_metrics['base']['total']['rp']) {
      result1 +=  'There is an increase of Trade margin by '+ (metric1['converted_difference']).replace(/[()]/g, '') + ' ' + metric1['percent']
    }
    else if(financial_metrics['simulated']['total']['rp'] < financial_metrics['base']['total']['rp']){
      result1 +=  'There is an decrease of Trade margin by '+ (metric1['converted_difference']).replace(/[()]/g, '') + ' ' + metric1['percent']
    }
    else if(financial_metrics['simulated']['total']['rp'] == financial_metrics['base']['total']['rp']) {
      result1 += 'There is an unchanged value for Trade margin '
    }


    if(financial_metrics['simulated']['total']['rp'] > financial_metrics['base']['total']['rp'] && financial_metrics['simulated']['total']['mac'] > financial_metrics['base']['total']['mac']) {
      result2 +=  ' and MAC by '+ (metric2['converted_difference']).replace(/[()]/g, '') + ' ' + metric2['percent'] +'.'
    }
    else if(financial_metrics['simulated']['total']['rp'] < financial_metrics['base']['total']['rp'] && financial_metrics['simulated']['total']['mac'] > financial_metrics['base']['total']['mac']) {
      result2 +=  ' and MAC increased by '+ (metric2['converted_difference']).replace(/[()]/g, '') + ' ' + metric2['percent'] +'.'
    }
    else if(financial_metrics['simulated']['total']['rp'] > financial_metrics['base']['total']['rp'] && financial_metrics['simulated']['total']['mac'] < financial_metrics['base']['total']['mac']) {
      result2 +=  ' and MAC decreased by '+ (metric2['converted_difference']).replace(/[()]/g, '') + ' ' + metric2['percent']+'.'
    }
    else if(financial_metrics['simulated']['total']['rp'] < financial_metrics['base']['total']['rp'] && financial_metrics['simulated']['total']['mac'] < financial_metrics['base']['total']['mac']) {
      result2 +=  ' and MAC by '+ (metric2['converted_difference']).replace(/[()]/g, '') + ' ' + metric2['percent']+'.'
    }
    else if(financial_metrics['simulated']['total']['rp'] > financial_metrics['base']['total']['rp'] || financial_metrics['simulated']['total']['rp'] < financial_metrics['base']['total']['rp'] && financial_metrics['simulated']['total']['mac'] == financial_metrics['base']['total']['mac']) {
      result2 += ' and MAC is unchanged.'
    }
    else if(financial_metrics['simulated']['total']['rp'] = financial_metrics['base']['total']['rp'] && financial_metrics['simulated']['total']['mac'] == financial_metrics['base']['total']['mac']) {
      result2 += ' and MAC.'
    }


    let flagContent: any = ''
    if(flag == 'optimizer'){
      flagContent = 'optimized'
    }
    else {
      flagContent = 'simulated'
    }
    if(financial_metrics['simulated']['total']['te'] > financial_metrics['base']['total']['te']) {
      result3 +=  ' Trade expense has increased by '+ (metric3['percent']).replace(/[()]/g, '') +' with the current '+ flagContent +' calendar results.'
    }
    else if(financial_metrics['simulated']['total']['te'] < financial_metrics['base']['total']['te']){
      result3 +=  ' Trade expense has come down by '+ (metric3['percent']).replace(/[()]/g, '') +' with the current '+ flagContent +' calendar results.'
    }
    else if(financial_metrics['simulated']['total']['te'] == financial_metrics['base']['total']['te']) {
      result3 += ' Trade expense is unchanged with the current '+ flagContent +' calendar results.'
    }

    result1 = {
      result1 :  result1,
      result2 :  result2,
      result3 :  result3
    } 
  }
  else if(index == 3){
    if(financial_metrics['simulated']['total']['rp'] > financial_metrics['base']['total']['rp']) {
      result1 +=  'Opportunity to increase Trade margin by '+ (metric1['converted_difference']).replace(/[()]/g, '') + ' ' +metric1['percent']
    }
    else if(financial_metrics['simulated']['total']['rp'] < financial_metrics['base']['total']['rp']){
      result1 +=  'Opportunity to decrease Trade margin by '+ (metric1['converted_difference']).replace(/[()]/g, '') + ' ' +metric1['percent']
    }
    else if(financial_metrics['simulated']['total']['rp'] == financial_metrics['base']['total']['rp']) {
      result1 += 'There is an unchanged value for Trade margin '
    }

    let flagContent: any = ''
    if(flag == 'optimizer'){
      flagContent = 'optimal'
    }
    else {
      flagContent = 'simulated'
    }


    if(financial_metrics['simulated']['total']['rp'] > financial_metrics['base']['total']['rp'] && financial_metrics['simulated']['total']['mac'] > financial_metrics['base']['total']['mac']) {
      result2 +=  ' and MAC by '+ (metric2['converted_difference']).replace(/[()]/g, '') + ' ' + metric2['percent'] + ' exists with this '+ flagContent +' calendar results.'
    }
    else if(financial_metrics['simulated']['total']['rp'] < financial_metrics['base']['total']['rp'] && financial_metrics['simulated']['total']['mac'] > financial_metrics['base']['total']['mac']) {
      result2 +=  ' and MAC increased by '+ (metric2['converted_difference']).replace(/[()]/g, '') + ' ' + metric2['percent'] + ' exists with this '+ flagContent +' calendar results.'
    }
    else if(financial_metrics['simulated']['total']['rp'] > financial_metrics['base']['total']['rp'] && financial_metrics['simulated']['total']['mac'] < financial_metrics['base']['total']['mac']) {
      result2 +=  ' and MAC decreased by '+ (metric2['converted_difference']).replace(/[()]/g, '') + ' ' + metric2['percent'] + ' exists with this '+ flagContent +' calendar results.'
    }
    else if(financial_metrics['simulated']['total']['rp'] < financial_metrics['base']['total']['rp'] && financial_metrics['simulated']['total']['mac'] < financial_metrics['base']['total']['mac']) {
      result2 +=  ' and MAC by '+ (metric2['converted_difference']).replace(/[()]/g, '') + ' ' + metric2['percent'] + ' exists with this '+ flagContent +' calendar results.'
    }
    else if(financial_metrics['simulated']['total']['rp'] > financial_metrics['base']['total']['rp'] || financial_metrics['simulated']['total']['rp'] < financial_metrics['base']['total']['rp'] && financial_metrics['simulated']['total']['mac'] == financial_metrics['base']['total']['mac']) {
      result2 += ' and MAC is unchanged exists with this '+ flagContent +' calendar results.'
    }
    else if(financial_metrics['simulated']['total']['rp'] = financial_metrics['base']['total']['rp'] && financial_metrics['simulated']['total']['mac'] == financial_metrics['base']['total']['mac']) {
      result2 += ' and MAC exists with this '+ flagContent +' calendar results.'
    }
    result1 = {
      result1 :  result1,
      result2 :  result2,
      result3 :  result3
    }
  }
  return result1
}

export function generateMessageRandomSimulator(index: any,financial_metrics,metric1: any,metric2: any,metric3 :any){
  let result1:any = ''
  let result2:any = ''
  let result3:any = ''
  if(index == 1){
    if(financial_metrics['simulated']['total']['rp'] > financial_metrics['base']['total']['rp']) {
      result1 +=  'Simulated scenario results in an increase of Trade margin by '+ (metric1['converted_difference']).replace(/[()]/g, '') + ' ' + metric1['percent']
    }
    else if(financial_metrics['simulated']['total']['rp'] < financial_metrics['base']['total']['rp']){
      result1 +=  'Simulated scenario results in an decrease of Trade margin by '+ (metric1['converted_difference']).replace(/[()]/g, '') + ' ' + metric1['percent']
    }
    else if(financial_metrics['simulated']['total']['rp'] == financial_metrics['base']['total']['rp']) {
      result1 += 'Simulated scenario results has a unchanged value for Trade margin '
    }


    if(financial_metrics['simulated']['total']['rp'] > financial_metrics['base']['total']['rp'] && financial_metrics['simulated']['total']['mac'] > financial_metrics['base']['total']['mac']) {
      result2 +=  ' and MAC by '+ (metric2['converted_difference']).replace(/[()]/g, '') + ' ' + metric2['percent'] +'.'
    }
    else if(financial_metrics['simulated']['total']['rp'] < financial_metrics['base']['total']['rp'] && financial_metrics['simulated']['total']['mac'] > financial_metrics['base']['total']['mac']) {
      result2 +=  ' and MAC increased by '+ (metric2['converted_difference']).replace(/[()]/g, '') + ' ' + metric2['percent'] +'.'
    }
    else if(financial_metrics['simulated']['total']['rp'] > financial_metrics['base']['total']['rp'] && financial_metrics['simulated']['total']['mac'] < financial_metrics['base']['total']['mac']) {
      result2 +=  ' and MAC decreased by '+ (metric2['converted_difference']).replace(/[()]/g, '') + ' ' + metric2['percent']+'.'
    }
    else if(financial_metrics['simulated']['total']['rp'] < financial_metrics['base']['total']['rp'] && financial_metrics['simulated']['total']['mac'] < financial_metrics['base']['total']['mac']) {
      result2 +=  ' and MAC by '+ (metric2['converted_difference']).replace(/[()]/g, '') + ' ' + metric2['percent']+'.'
    }
    else if(financial_metrics['simulated']['total']['rp'] > financial_metrics['base']['total']['rp'] || financial_metrics['simulated']['total']['rp'] < financial_metrics['base']['total']['rp'] && financial_metrics['simulated']['total']['mac'] == financial_metrics['base']['total']['mac']) {
      result2 += ' and MAC is unchanged.'
    }
    else if(financial_metrics['simulated']['total']['rp'] = financial_metrics['base']['total']['rp'] && financial_metrics['simulated']['total']['mac'] == financial_metrics['base']['total']['mac']) {
      result2 += ' and MAC.'
    }



    if(financial_metrics['simulated']['total']['units'] > financial_metrics['base']['total']['units']) {
      result3 +=  ' There is an increase in units by '+ (metric3['converted_difference']).replace(/[()]/g, '') + ' ' + metric3['percent']+'.'
    }
    else if(financial_metrics['simulated']['total']['units'] < financial_metrics['base']['total']['units']){
      result3 +=  ' There is an drop in units by '+ (metric3['converted_difference']).replace(/[()]/g, '')+ ' ' + metric3['percent']+'.'
    }
    else if(financial_metrics['simulated']['total']['units'] == financial_metrics['base']['total']['units']) {
      result3 += ' There is an unchanged value for units.'
    }

    result1 = {
      result1 :  result1,
      result2 :  result2,
      result3 :  result3
    } 
  }
  else if(index == 2){
    if(financial_metrics['simulated']['total']['rp'] > financial_metrics['base']['total']['rp']) {
      result1 +=  'Simulated scenario results in an increase of Trade margin by '+ (metric1['converted_difference']).replace(/[()]/g, '') + ' ' + metric1['percent']
    }
    else if(financial_metrics['simulated']['total']['rp'] < financial_metrics['base']['total']['rp']){
      result1 +=  'Simulated scenario results in an decrease of Trade margin by '+ (metric1['converted_difference']).replace(/[()]/g, '') + ' ' + metric1['percent']
    }
    else if(financial_metrics['simulated']['total']['rp'] == financial_metrics['base']['total']['rp']) {
      result1 += 'Simulated scenario results has a unchanged value for Trade margin '
    }


    if(financial_metrics['simulated']['total']['rp'] > financial_metrics['base']['total']['rp'] && financial_metrics['simulated']['total']['mac'] > financial_metrics['base']['total']['mac']) {
      result2 +=  ' and MAC by '+ (metric2['converted_difference']).replace(/[()]/g, '') + ' ' + metric2['percent'] +'.'
    }
    else if(financial_metrics['simulated']['total']['rp'] < financial_metrics['base']['total']['rp'] && financial_metrics['simulated']['total']['mac'] > financial_metrics['base']['total']['mac']) {
      result2 +=  ' and MAC increased by '+ (metric2['converted_difference']).replace(/[()]/g, '') + ' ' + metric2['percent'] +'.'
    }
    else if(financial_metrics['simulated']['total']['rp'] > financial_metrics['base']['total']['rp'] && financial_metrics['simulated']['total']['mac'] < financial_metrics['base']['total']['mac']) {
      result2 +=  ' and MAC decreased by '+ (metric2['converted_difference']).replace(/[()]/g, '') + ' ' + metric2['percent']+'.'
    }
    else if(financial_metrics['simulated']['total']['rp'] < financial_metrics['base']['total']['rp'] && financial_metrics['simulated']['total']['mac'] < financial_metrics['base']['total']['mac']) {
      result2 +=  ' and MAC by '+ (metric2['converted_difference']).replace(/[()]/g, '') + ' ' + metric2['percent']+'.'
    }
    else if(financial_metrics['simulated']['total']['rp'] > financial_metrics['base']['total']['rp'] || financial_metrics['simulated']['total']['rp'] < financial_metrics['base']['total']['rp'] && financial_metrics['simulated']['total']['mac'] == financial_metrics['base']['total']['mac']) {
      result2 += ' and MAC is unchanged.'
    }
    else if(financial_metrics['simulated']['total']['rp'] = financial_metrics['base']['total']['rp'] && financial_metrics['simulated']['total']['mac'] == financial_metrics['base']['total']['mac']) {
      result2 += ' and MAC.'
    }

    result1 = {
      result1 :  result1,
      result2 :  result2,
      result3 :  result3
    } 
  }
  return result1
}

export function decodePromotionUK(element){
  // debugger

  // let regex = /\d+(\.\d{0,4})/g
  // let regex = /\d+(?:\.\d{0,4})?/g
  // /\d+/g
  // debugger
  let obj ={
    "selected_promotion" : element.selected_promotion,
    "promo_price" : element.week.promo_price,
    "base_promotion" : element.promotion_name
    

  }
  // if(promo_name.includes("N+1")){
  //   obj["promo_mechanics"] = "N+1"
  //   let arr:Array<any>|null = promo_name.match(regex) 
  //   if(arr?.length ==3){
  //     obj["promo_depth"] = parseFloat(arr[1])
  //     obj["co_investment"] = parseFloat(arr[2])
      
  //   }
  //   if(arr?.length ==2){
  //     obj["promo_depth"] = parseFloat(arr[1])
  //     obj["co_investment"] = 0
  //   }
  // }
  // else if(promo_name.includes("Motivation")){
  //   let arr:Array<any>|null = promo_name.match(regex) 
  //   obj["promo_mechanics"] = "Motivation"
  //   if(arr?.length ==2){
  //     obj["promo_depth"] = parseFloat(arr[0])
  //     obj["co_investment"] = parseFloat(arr[1])
  //   }
  //   if(arr?.length ==1){
  //     obj["promo_depth"] = parseFloat(arr[0])
  //     obj["co_investment"] = 0
  //   }
  // }
  // else if(promo_name.includes("Traffic")){
  //   let arr:Array<any>|null = promo_name.match(regex)
  //   obj["promo_mechanics"] = "Traffic"
  //   if(arr?.length ==2){
  //     obj["promo_depth"] = parseFloat(arr[0])
  //     obj["co_investment"] = parseFloat(arr[1])
  //   }
  //   if(arr?.length ==1){
  //     obj["promo_depth"] = parseFloat(arr[0])
  //     obj["co_investment"] = 0
  //   }
  // }
  // else if(promo_name.includes("TPR")){
  //   // debugger
    
  //   obj["promo_mechanics"] = "TPR"
  //   let arr:Array<any>|null = promo_name.match(regex)
  //   if(arr?.length ==2){
  //     obj["promo_depth"] = parseFloat(arr[0])
  //     obj["co_investment"] = parseFloat(arr[1])
  //   }
  //   if(arr?.length ==1){
  //     if(promo_name.includes("Co")){
  //       obj["promo_depth"] = 0
  //       obj["co_investment"] = parseFloat(arr[0])
  //     }
  //     else{
  //       obj["promo_depth"] = parseFloat(arr[0])
  //       obj["co_investment"] = 0

  //     }
     
  //   }
  // }
  return obj
  // "N+1-25% (Co-8%)"
}

export function decodePromotion(promo_name:string){
 
  // let regex = /\d+(\.\d{0,4})/g
  let regex = /\d+(?:\.\d{0,4})?/g
  // /\d+/g
  // debugger
  let obj ={
    "promo_mechanics" : "",
    "promo_depth" : 0,
    // "co_investment":0

  }
  if(promo_name.includes("TPR")){
    // debugger
    
    obj["promo_mechanics"] = "TPR"
    let arr:Array<any>|null = promo_name.match(regex)
    if(arr?.length ==2){
      obj["promo_depth"] = parseFloat(arr[0])
      // obj["co_investment"] = parseFloat(arr[1])
    }
    if(arr?.length ==1){
      if(promo_name.includes("Co")){
        obj["promo_depth"] = 0
        // obj["co_investment"] = parseFloat(arr[0])
      }
      else{
        obj["promo_depth"] = parseFloat(arr[0])
        // obj["co_investment"] = 0

      }
     
    }
  }
  if(promo_name.includes(LEAFLET)){
    obj["promo_mechanics"] += "+" + LEAFLET
    let arr:Array<any>|null = promo_name.match(regex) 
    if(arr?.length ==3){
      obj["promo_depth"] = parseFloat(arr[1])
      // obj["co_investment"] = parseFloat(arr[2])
      
    }
    if(arr?.length ==2){
      obj["promo_depth"] = parseFloat(arr[1])
      // obj["co_investment"] = 0
    }
  }
   if(promo_name.includes(DISPLAY)){
    let arr:Array<any>|null = promo_name.match(regex) 
    obj["promo_mechanics"] += "+" +DISPLAY
    if(arr?.length ==2){
      obj["promo_depth"] = parseFloat(arr[0])
      // obj["co_investment"] = parseFloat(arr[1])
    }
    if(arr?.length ==1){
      obj["promo_depth"] = parseFloat(arr[0])
      // obj["co_investment"] = 0
    }
  }
  if(promo_name.includes(DISTRIBUTION)){
    let arr:Array<any>|null = promo_name.match(regex)
    obj["promo_mechanics"] += "+" + DISTRIBUTION
    if(arr?.length ==2){
      obj["promo_depth"] = parseFloat(arr[0])
      // obj["co_investment"] = parseFloat(arr[1])
    }
    if(arr?.length ==1){
      obj["promo_depth"] = parseFloat(arr[0])
      // obj["co_investment"] = 0
    }
  }
 
  return obj
  // "N+1-25% (Co-8%)"
}



export function decodePromotionGermany(promo_name){
  
  // let regex = /\d+(\.\d{0,4})/g
  let regex = /\d+(?:\.\d{0,4})?/g
  // /\d+/g
  // debugger
  let obj ={
    "promo_mechanics" : "",
    "promo_depth" : 0,
    // "co_investment":0

  }
  if(promo_name.includes(LEAFLET)){
    obj["promo_mechanics"] = LEAFLET
    // debugger
    let arr:Array<any>|null = promo_name.match(regex) 
    if(arr?.length == 1){
      obj["promo_depth"] = parseFloat(arr[0])
      // obj["co_investment"] = parseFloat(arr[2])
      
    }
    // if(arr?.length ==2){
    //   obj["promo_depth"] = parseFloat(arr[1])
    //   obj["co_investment"] = 0
    // }
  }
  else if(promo_name.includes(DISPLAY)){
    let arr:Array<any>|null = promo_name.match(regex) 
    obj["promo_mechanics"] = DISPLAY
    if(arr?.length == 1){
      obj["promo_depth"] = parseFloat(arr[0])
      // obj["co_investment"] = parseFloat(arr[2])
      
    }
    // if(arr?.length ==2){
    //   obj["promo_depth"] = parseFloat(arr[0])
    //   obj["co_investment"] = parseFloat(arr[1])
    // }
    // if(arr?.length ==1){
    //   obj["promo_depth"] = parseFloat(arr[0])
    //   obj["co_investment"] = 0
    // }
  }
  else if(promo_name.includes(DISTRIBUTION)){
    let arr:Array<any>|null = promo_name.match(regex)
    obj["promo_mechanics"] = DISTRIBUTION
    if(arr?.length == 1){
      obj["promo_depth"] = parseFloat(arr[0])
      // obj["co_investment"] = parseFloat(arr[2])
      
    }
    // if(arr?.length ==2){
    //   obj["promo_depth"] = parseFloat(arr[0])
    //   obj["co_investment"] = parseFloat(arr[1])
    // }
    // if(arr?.length ==1){
    //   obj["promo_depth"] = parseFloat(arr[0])
    //   obj["co_investment"] = 0
    // }
  }
  else if(promo_name.includes("TPR")){
    // debugger
    
    obj["promo_mechanics"] = "TPR"
    let arr:Array<any>|null = promo_name.match(regex)
  
    if(arr?.length ==1){
      obj["promo_depth"] = parseFloat(arr[0])
      // if(promo_name.includes("Co")){
      //   obj["promo_depth"] = 0
      //   obj["co_investment"] = parseFloat(arr[0])
      // }
      // else{
      //   obj["promo_depth"] = parseFloat(arr[0])
      //   obj["co_investment"] = 0

      // }
     
    }
  }
  return obj
  // "N+1-25% (Co-8%)"
}

// export function decodePromotion(promo_name:string){
//   // let regex = /\d+(\.\d{0,4})/g
//   let regex = /\d+(?:\.\d{0,4})?/g
//   // /\d+/g
//   // debugger
//   let obj ={
//     "promo_mechanics" : "",
//     "promo_depth" : 0,
//     "co_investment":0

//   }
//   if(promo_name.includes("N+1")){
//     obj["promo_mechanics"] = "N+1"
//     let arr:Array<any>|null = promo_name.match(regex) 
//     if(arr?.length ==3){
//       obj["promo_depth"] = parseFloat(arr[1])
//       obj["co_investment"] = parseFloat(arr[2])
      
//     }
//     if(arr?.length ==2){
//       obj["promo_depth"] = parseFloat(arr[1])
//       obj["co_investment"] = 0
//     }
//   }
//   else if(promo_name.includes("Motivation")){
//     let arr:Array<any>|null = promo_name.match(regex) 
//     obj["promo_mechanics"] = "Motivation"
//     if(arr?.length ==2){
//       obj["promo_depth"] = parseFloat(arr[0])
//       obj["co_investment"] = parseFloat(arr[1])
//     }
//     if(arr?.length ==1){
//       obj["promo_depth"] = parseFloat(arr[0])
//       obj["co_investment"] = 0
//     }
//   }
//   else if(promo_name.includes("Traffic")){
//     let arr:Array<any>|null = promo_name.match(regex)
//     obj["promo_mechanics"] = "Traffic"
//     if(arr?.length ==2){
//       obj["promo_depth"] = parseFloat(arr[0])
//       obj["co_investment"] = parseFloat(arr[1])
//     }
//     if(arr?.length ==1){
//       obj["promo_depth"] = parseFloat(arr[0])
//       obj["co_investment"] = 0
//     }
//   }
//   else if(promo_name.includes("TPR")){
//     // debugger
    
//     obj["promo_mechanics"] = "TPR"
//     let arr:Array<any>|null = promo_name.match(regex)
//     if(arr?.length ==2){
//       obj["promo_depth"] = parseFloat(arr[0])
//       obj["co_investment"] = parseFloat(arr[1])
//     }
//     if(arr?.length ==1){
//       if(promo_name.includes("Co")){
//         obj["promo_depth"] = 0
//         obj["co_investment"] = parseFloat(arr[0])
//       }
//       else{
//         obj["promo_depth"] = parseFloat(arr[0])
//         obj["co_investment"] = 0

//       }
     
//     }
//   }
//   return obj
//   // "N+1-25% (Co-8%)"
// }


export function genratePromotion(motivation , n_plus_1, traffic , promo_depth , co_inv ){
  let promo_name = "TPR"
  let promo_string = ""
  // debugger
  // console.log(motivation , n_plus_1, traffic , promo_depth , co_inv , "generate promotion details")
  if(motivation){
    promo_name = "Motivation"

  }
  else if(n_plus_1){
    promo_name = "N+1"
  }
  else if(traffic){
    promo_name = "Traffic"
  }
  if(promo_depth){
promo_string+=promo_name + "-" + promo_depth + "%"
  }
  if(co_inv){
    if(promo_depth){
      promo_string+= " (Co-"+co_inv+"%)"
    }
    else{
      promo_string+=promo_name + " (Co-"+co_inv+"%)"

    }
   
  }
  // console.log(promo_string , "generate promotion details promo-string")
  return promo_string
}

export function genratePromotionUK(base_tactics,tpr_discount , flag_promotype_display_ge, 
  flag_promotype_display_ss ,flag_promotype_pl , flag_promotype_poweraisle,
  flag_promotype_consumer_promotions ){ 
    let promo_string = ''
    // if(tpr_discount){
      promo_string += base_tactics
    
   
    if(flag_promotype_display_ge){
      promo_string+="+GE"
    }
    if(flag_promotype_display_ss){
      promo_string+="+SS"
    }
    if(flag_promotype_pl){
      promo_string+="+PL"
    }
    if(flag_promotype_poweraisle){
      promo_string+="+poweraisle"
    }
    if(flag_promotype_consumer_promotions){
      promo_string+="+CP"
    }
  // }
  if(promo_string){
    if(promo_string.charAt(0) === '+')
    {
      promo_string = promo_string.substring(1);
    }
  }
    

  return promo_string
}


export function genratePromotionGermany(tpr_discount , flag_promotype_leaflet, 
  flag_promotype_display ,flag_promotype_distribution_500){ 
    let promo_name = ""
    let promo_string = ""
    if(tpr_discount!=null){
    tpr_discount =  Number((tpr_discount).toFixed(2))
    promo_name += "TPR"
   
  // debugger
  // console.log(motivation , n_plus_1, traffic , promo_depth , co_inv , "generate promotion details")
  if(flag_promotype_leaflet){
    promo_name += "+Leaflet"

  }
  if(flag_promotype_display){
    promo_name += "+Display"
  }
  if(flag_promotype_distribution_500){
    promo_name += "+Distribution"
  }
 
promo_string+=promo_name + "-" + tpr_discount + "%"
 
  if(promo_string.charAt(0) === '-')
  {
    promo_string = "TPR" + promo_string
  }

  
  }
   
  // console.log(promo_string , "generate promotion details promo-string")
  return promo_string
}

export function convertCurrency(value:any , per?:any , is_curr = ''){
    if(value){
      let symbol = ""
      if(is_curr){
        symbol  = is_curr

      }
      
      let str = value.toFixed(2).split(".")[0]
      let strlen = str.length
      let final = value
      let curr = ""
      if(strlen >=4 && strlen <=6){
        final = value / 1000;
        curr = "K"
  
      }
      else if (strlen >=7 && strlen <=9){
        final = value / 1000000
        curr = "M"
      }
      else if(strlen >= 10){
        final = value / 1000000000
        curr = "B"
      }
      // console.log(value , "ACTUAL")
      // console.log(strlen , "ACTUAL LEN")
      // console.log(final , "FINAL")
      if(per){
        symbol = " %"
      }
      return  final.toFixed(2) + curr + symbol
  
    }
    return 0
  }

  export function  percentageDifference(a: number, b: number , debug = false){
    // if(debug){
    //   debugger
    // }
    a  = parseFloat(a.toFixed(4));
    b  = parseFloat(b.toFixed(4));
    
    if (a == 0 && b == 0){
        return (0).toFixed(2)
    }
    if (a > 0 && b == 0){
        return (100).toFixed(2)
    }
    // return  (100 * Math.abs( ( a - b ) / ( (a+b)/2 ) )).toFixed(2);
    // return  (100 * ( ( a - b ) / ( (a+b)/2 ) )).toFixed(2);
    return (100 * ((a - b)/b)).toFixed(2);
}

export function colorForDifference(base:any, simulated:any){
  if(simulated > base){
      return 'green'
  }
  else if(simulated < base){
      return 'red'
  }
  else if(base == simulated){
      return 'neutral'
  }
  return 'green'
}
function formatCurrency(curr){
  return curr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "k";
}

export function formatPlain(number: any,is_currency: boolean|string,percentage: boolean,debug=false ){
  // if(debug){
  //   debugger
  // }
  if(number!=null){
    number  = parseFloat(number.toFixed(4));
  if(number < 1000){
    
    if(is_currency && !percentage){
      return  `${is_currency} ` + formatCurrency(number.toFixed(0))
     }
     else if(percentage){
      return number.toFixed(2) + "%"
     }

  // format number and add suffix
  return  formatCurrency(number.toFixed(2))

  }
  else{
    number = number/1000
    if(is_currency && !percentage){
      return  `${is_currency} ` + formatCurrency(number.toFixed(0))
  }
  else if(percentage){
    return formatCurrency(number.toFixed(2)) + "%"
   }

  // format number and add suffix
  return  formatCurrency(number.toFixed(0))


    
  }
 
  
  }
  return 0
    
  // var SI_SYMBOL = ["", "K", "M", "B", "T", "P", "E"];
  // // what tier? (determines SI symbol)
  // var tier = Math.log10(Math.abs(number)) / 3 | 0;

  // // if zero, we don't need a suffix
  // if(tier == 0) return number.toFixed(2);

  // // get suffix and determine scale
  // var suffix = SI_SYMBOL[tier];
  // var scale = Math.pow(10, tier * 3);

  // // scale the number
  // var scaled = number / scale;

  // if(currency && percentage){
  //     return scaled.toFixed(1) + '%';
  // }
  
 

}

export function formatNumber(number: any,currency: boolean|string,percentage: boolean,debug=false ){
  // console.log(number , "format Fplchatdata....number funtion ")
  // if(debug){
  //   debugger
  // }
  number  = parseFloat(number.toFixed(4));
  
    var SI_SYMBOL = ["", "K", "M", "B", "T", "P", "E"];
    // what tier? (determines SI symbol)
    var tier = Math.log10(Math.abs(number)) / 3 | 0;

    // if zero, we don't need a suffix
    if(tier <= 0) return number.toFixed(2);

    // get suffix and determine scale
    var suffix = SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);

    // scale the number
    var scaled = number / scale;

    if(currency && percentage){
        return scaled.toFixed(1) + '%';
    }

    if(currency && !percentage){
        return  ` ${currency}` + scaled.toFixed(1) + suffix ;
    }
    // format number and add suffix
    return scaled.toFixed(1) + suffix;
}

export function formatNumberBKP(number: any,currency: boolean|string,percentage: boolean,debug=false ){
  // console.log(number , "format Fplchatdata....number funtion ")
  // if(debug){
  //   debugger
  // }
  number  = parseFloat(number.toFixed(4));
  
    var SI_SYMBOL = ["", "K", "M", "B", "T", "P", "E"];
    // what tier? (determines SI symbol)
    var tier = Math.log10(Math.abs(number)) / 3 | 0;

    // if zero, we don't need a suffix
    if(tier <= 0) return number.toFixed(2);

    // get suffix and determine scale
    var suffix = SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);

    // scale the number
    var scaled = number / scale;

    if(currency && percentage){
        return scaled.toFixed(1) + '%';
    }

    if(currency && !percentage){
        return  ` ${currency}` + scaled.toFixed(1) + suffix ;
    }
    // format number and add suffix
    return scaled.toFixed(1) + suffix;
}


export function generate_consecutive_list_max_diff(arr:Array<number>){
  // debugger
  if(arr.length > 0){
    let final:any[] = []
    let temp:number[] = [arr[0]]
    let max_diff = 52
    for(let i =1;i <= arr.length;i++ ){
      if(arr[i] - arr[i-1]!=1){
        let diff = arr[i] - temp[temp.length -1]
        if(diff < max_diff){
          max_diff = diff
        }
        final.push(temp)
        temp = []
        if(arr[i]){
          temp.push(arr[i])

        }
        
      }
      else{
        temp.push(arr[i])
      }
    }
    if(temp.length > 0){
      final.push(temp)

    }
    
    // console.log(final , "final brfore return")

    return {
      "min_diff" : max_diff,
      "consecutive" : final,
      "max_len_consecutive" : Math.max(...final.map(d=>d.length)),
     
    }

  }
  
return {
  "min_diff" : 0,
  "max_len_consecutive" : 52,
  "consecutive" : []
}
}

export function check_validate_gap(min_gap , calculated_gap){
  return calculated_gap > min_gap || calculated_gap == 0 || calculated_gap == 1

}

export function calculate_not_allowed_array(comp_week , max_con){
  // console.log(comp_week , "calculate not allowed comp")
  let not_allowed:any[]= []
  // debugger
  for(let i =0;i < comp_week.length;i++ ){
    let min_extreme = comp_week[i][0]  - max_con
    let max_extreme = comp_week[i][comp_week[i].length - 1]  + max_con
    for(let j = min_extreme ; j <=max_extreme ; j++){
      // console.log(j)
      not_allowed.push(j)
      // not_allowed.push(j)

    }
  }
  return not_allowed
  

}
  
  
// def check_valide_gap(min_gap , calculated_gap):
// return calculated_gap >= min_gap or calculated_gap ==1 or calculated_gap ==0