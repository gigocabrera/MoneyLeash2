import { Injectable } from '@angular/core';

// firebase
import { AngularFire, FirebaseAuth } from 'angularfire2';

@Injectable()
export class SignupData {

  public user: any;
  public userdata: any;
  public housedata: any;

  constructor(public af: AngularFire, public auth: FirebaseAuth) {

    /*
    this.userdata = firebase.database().ref('/users/');
    this.housedata = firebase.database().ref('/houses/');
    */

  }

  createUser(credentials) {
    var creds: any = { email: credentials.username, password: credentials.password };
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      this.af.auth.createUser(creds)     
      .then(() => {
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  }

  
  
}