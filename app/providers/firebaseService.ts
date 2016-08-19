import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs/ReplaySubject';

// Firebase
declare var firebase: any;

@Injectable()
export class FirebaseService {

  public fireAuth: any;

  constructor() {
    this.fireAuth = firebase.auth();
  }

  uid() {
    return firebase.auth().currentUser.uid;
  }
  currentUser() {
    return firebase.auth().currentUser
  }
  logout() {
    return this.fireAuth.signOut();
  }
  
  getText(valueKey: string, arr) {
    if (valueKey === undefined || valueKey === '') {
      return '';
    } else {
      for (var i=0; i < arr.length; i++) {
        if (arr[i].value === valueKey) {
          return arr[i].text;
        }
      }
    }
  }

}