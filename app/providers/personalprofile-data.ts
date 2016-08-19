import {Injectable} from '@angular/core';

declare var firebase: any;

@Injectable()
export class PersonalProfileData {

  public user: any;
  public userdata: any;
  public housedata: any;

  constructor() {
    this.user = firebase.auth().currentUser;
    this.userdata = firebase.database().ref('/users/');
    this.housedata = firebase.database().ref('/houses/');
  }

  updateEmailNode(newemail): any {
    this.userdata.child(this.user.uid).update({'email' : newemail});
  }

  updateName(newname: string) {
    this.userdata.child(this.user.uid).update({'fullname' : newname});
  }

  updateEmail(newEmail: string) {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      let user = firebase.auth().currentUser;
      user.updateEmail(newEmail)
      .then(function() {
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  }

  updatePassword(newPassword: string) {    
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      let user = firebase.auth().currentUser;
      user.updatePassword(newPassword)
      .then(function() {
        resolve();
      }).catch(function(error) {
        reject(error);
      });
    });
  }

  deleteData(houseid) {
    //
    // Delete ALL user data
    this.housedata.child(houseid).remove();
    this.userdata.child(this.user.uid).remove();
  }

  deleteUser() {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      let user = firebase.auth().currentUser;
      user.delete()
      .then(function() {
        resolve();
      }).catch(function(error) {
        reject(error);
      });
    });
  }

}

