import { Pipe, PipeTransform } from '@angular/core';
import {HierarchyCheckBoxModel , CheckboxModel} from "@core/models"

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {
   
  transform(items: any[], searchText: string,args?:any): any[] {
    // console.log(items , "ITEMS HIER")
    // console.log(args , "args any extra")
      // console.log(items ,"items in pipe ")
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    // debugger
    searchText = searchText.toLocaleLowerCase();
    if(args && args == 'promo'){
      return items.filter(it => {
        return it.name.toLocaleLowerCase().includes(searchText);
      });
    }
    if(args && args == 'hierarchy'){
      // debugger
      // it.value.toLocaleLowerCase().includes(searchText) || 
      return (items as CheckboxModel[]).filter(it=>{
       return it.value.toLocaleLowerCase().includes(searchText);
      })
      // console.log(items , "ITEMS HIER RET")
      // return items

    }

    return items.filter(it => {
      return it.value.toLocaleLowerCase().includes(searchText);
    });
  }
} 