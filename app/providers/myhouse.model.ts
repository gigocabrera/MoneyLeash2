
// Firebase
declare var firebase: any;

export interface IMyHouse {
  //dateCreated: number;
  houseid: string;
  housejoincode: string;
  housenumber: number;
}

export class MyHouse implements IMyHouse {
  
  //public dateCreated: number = firebase.database['ServerValue']['TIMESTAMP'];  
  public houseid: string;
  public housejoincode: string;
  public housenumber: number;

  constructor() {}

}