import {Injectable} from '@angular/core';

declare var firebase: any;

@Injectable()
export class SettingsData {

  public user: any;
  public userdata: any;

  constructor() {
    this.user = firebase.auth().currentUser;
    this.userdata = firebase.database().ref('/users/');
  }

  getSettingsData(): any {
    return this.userdata.child(this.user.uid);
  }

  updateDefaultBalance(newdefaultbalance: string): any {
    this.userdata.child(this.user.uid).update({'defaultbalance' : newdefaultbalance});
  }

  updateDefaultDate(newdefaultdate: string): any {
    this.userdata.child(this.user.uid).update({'defaultdate' : newdefaultdate});
  }

  updateTouchID(ischecked: boolean): any {
    this.userdata.child(this.user.uid).update({'enabletouchid' : ischecked});
  }

}