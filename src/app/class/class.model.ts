import { Set } from "../set-list/cardset/set.model";
import { LocalUser } from "../user-page/localUser.model";

export class Class {
  constructor(
  public title:string,
  public sets: Set[],
  public students: LocalUser[],
  public creator: LocalUser,
  public id?:string,
  public tests?:any){}
}