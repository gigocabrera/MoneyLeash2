
// Firebase
declare var firebase: any;

export interface IMyInfo {
  myinfokey: string;
  //dateCreated: number;
  email: string;
  namefirst: string;
  namelast: string;
}

export class MyInfo implements IMyInfo {
  
  public myinfokey: string;
  //public dateCreated: number = firebase.database['ServerValue']['TIMESTAMP'];
  public email: string;
  public namefirst: string;
  public namelast: string;

  constructor() {}

}