import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'weekTypePipe' })
export class  WeekType implements PipeTransform {
   
  transform(selected_quarter:any , weekly_map:any[],current_quarter:any): string {
    // 'default' | 'active' | 'filled' | 'filled-active' = 'default';
    // console.log(current_quarter , "current quarter...")
    // console.log(selected_quarter , "selected_quarter in weektype pipe")
    // console.log(selected_quarter.match(/\d/g) , "selected quater in pipe................")
    // console.log(current_quarter.match(/\d/g) , "selected quater in pipe current_quarter ................")
    if(current_quarter.match(/\d/g)[0] != "1"){
      return 'default'
    }
    
    // console.log(weekly_map , "weekly map in weektype pipe")
    let av_quater = weekly_map.map(d=>{
      if('selected_promotion' in d){
        return d.week.quater
      }
     return d.quater
    }
      )
    if(selected_quarter == current_quarter){
      let key_split = Number(selected_quarter.split("Q")[1])
      if(av_quater.includes(key_split)){
        return 'filled-active'

      }
      else{
        return 'active'

      }
     
    }
    if(weekly_map && weekly_map.length > 0){
   
    // console.log(av_quater , "avq")
      let key_split = Number(current_quarter.split("Q")[1])
      // console.log(key_split , "keysplit")
       if(av_quater.includes(key_split)){
        //  console.log("filled...")
                            return 'filled'

                        }
                        else{
                          // console.log("default...")
                            return 'default'


                        }
                            
   
                      }
                      return "default" 
      
  }
}

