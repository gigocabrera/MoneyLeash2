
// Firebase
declare var firebase: any;

export interface IMyInfo {
  myinfokey: string;
  dateCreated: number;
  email: string;
  fullname: string;
}

export class MyInfo implements IMyInfo {
  
  public myinfokey: string;
  public dateCreated: number = firebase.database['ServerValue']['TIMESTAMP'];
  public email: string;
  public fullname: string;

  constructor() {}

}