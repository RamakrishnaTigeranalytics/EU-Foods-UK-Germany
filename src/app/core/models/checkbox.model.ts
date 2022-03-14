export interface CheckboxModel {
    value:string;
    checked:boolean;
    id?:number|string
  }

export interface HierarchyCheckBoxModel extends CheckboxModel{
  child : Array<CheckboxModel>,
  
    
}