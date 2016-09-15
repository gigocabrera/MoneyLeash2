import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {UserInfo} from '../models/userinfo.model';

declare var firebase: any;

@Injectable()
export class SettingsData {

  public user: any;
  public userdata: any;

  constructor() {
    this.user = firebase.auth().currentUser;
    this.userdata = firebase.database().ref('/users/');
  }

  getUserData(): any {
    return this.userdata.child(this.user.uid);
  }

  getUserDataFromObservable(): Observable<UserInfo> {
    return Observable.create(observer => {
      let listener = this.userdata.on('child_added', snapshot => {
        let data = snapshot.val();
        observer.next(new UserInfo(
          snapshot.key(),
          data.datecreated, 
          data.defaultbalance,
          data.defaultdate,
          data.email,
          data.enabletouchid,
          data.fullname,
          data.houseid,
          data.housenumber,
          data.profilepic
        ));
      }, observer.error);

      return () => {
        this.userdata.off('child_added', listener);
      };
    });
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