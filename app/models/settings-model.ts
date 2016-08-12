export interface ISettings {
  $key?: string;
  datecreated: number;
  defaultbalance: string;
  defaultdate: string;
  email: string;
  fullname: string;
  houseid: string;
  housenumber: string;
  usetouchid: string;
}

export class MySettings implements ISettings {
  
  public datecreated: number = firebase.database['ServerValue']['TIMESTAMP'];

  constructor(
      public defaultbalance: string,
      public defaultdate: string,
      public email: string,
      public fullname: string,
      public houseid: string,
      public housenumber: string,
      public usetouchid: string
    ) { 
      this.defaultbalance = defaultbalance;
      this.defaultdate = defaultdate;
      this.email = email;
      this.houseid = houseid;
      this.housenumber = housenumber;
      this.usetouchid = usetouchid;
    }
};