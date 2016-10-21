import { Injectable } from '@angular/core';

@Injectable()
export class AccountData {

  public user: any;
  public userdata: any;
  public housedata: any;
  public profilepicdata: any;
  public userSettings: any;

  constructor() {

    /*this.user = firebase.auth().currentUser;
    this.userdata = firebase.database().ref('/users/');
    this.housedata = firebase.database().ref('/houses/');
    this.profilepicdata = firebase.storage().ref('/profilepics/');*/

  }

  getAllAccounts(houseid: string): any {
    //return this.housedata.child(houseid + '/memberaccounts');
  }

}