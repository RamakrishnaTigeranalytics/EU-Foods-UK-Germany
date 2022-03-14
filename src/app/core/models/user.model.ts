export interface Group{
  name :string
}
export interface UserDetail{
  id : number,
  name : string
  email : string,
  is_superuser : boolean,
  groups : Group[]

}

export interface User {
    
    token: string;
     user : UserDetail
  }