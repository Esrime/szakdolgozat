import { Set } from "../set-list/cardset/set.model";
import { LocalUser } from "../user-page/localUser.model";

export class Test {
  constructor(public title: string,public sets: Set[],public attempts: {mistakes:number, student:LocalUser}) {
  }
}