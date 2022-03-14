import { Component, Input,OnInit, SimpleChanges } from '@angular/core';

@Component({
    selector: 'nwn-simulated-filter-item',
    templateUrl: './simulated-filter-item.component.html',
    styleUrls: ['./simulated-filter-item.component.css'],
})
export class SimulatedFilterItemComponent  implements OnInit{
    @Input()
    type: 'default' | 'active' | 'filled' | 'filled-active' = 'default';
    @Input()
    size: 'sfi' = 'sfi';
    @Input()
    key:string = ''
    @Input()
    selected_quarter:string=''
    @Input()
    promotion_map : any[]
    @Input()
    showClose: boolean = false;
    ngOnInit(){
        // if(this.key == this.selected_quarter){
        //     this.type = 'active'
        // }
        // else{
        //     this.type = 'default'
        // }
       
    }
    ngOnChanges(changes : SimpleChanges) :void
    {   
        for (let property in changes) {
            if (property === 'selected_quarter') {
                // if(this.key == changes.selected_quarter.currentValue){
                //                 this.type = 'active'
                //             }
                //             else{
                //                 this.type = 'default'

                //             }
                        //     else{
                        //         if(this.promotion_map && this.promotion_map.length > 0){
                        //             let av_quater = this.promotion_map.map(d=>d.week.quater)
                        // let key_split = Number(this.key.split("Q")[1])
                        // if(av_quater.includes(key_split)){
                        //     this.type = 'filled'

                        // }
                        // else{
                        //     this.type = 'default'


                        // }
                                       
                                       
                        //             }
                                   
                               
                        //     }
               
            } 
            // if (property === 'promotion_map') {

            //     this.promotion_map = changes.promotion_map.currentValue
            //     if(this.key == this.selected_quarter){
            //         this.type = 'active'
            //     }
            //     else{
            //         if(this.promotion_map && this.promotion_map.length > 0){
            //             let av_quater = this.promotion_map.map(d=>d.week.quater)
            //             let key_split = Number(this.key.split("Q")[1])
            //             if(av_quater.includes(key_split)){
            //                 this.type = 'filled'

            //             }
            //             else{
            //                 this.type = 'default'


            //             }
                             
                           
            //             }
                       
                   
            //     }
                
             
                 
                
               
            // } 
            
        }
    //     if(changes.selected_quarter != undefined){
    //     if(!changes.selected_quarter.firstChange){
    //         if(this.key == changes.selected_quarter.currentValue){
    //             this.type = 'active'
    //         }
    //         else{
    //             this.type = 'default'
    //         }
            
    //     }
    // }
       
    }
}
