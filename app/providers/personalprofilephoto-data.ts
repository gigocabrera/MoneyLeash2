import {Injectable} from '@angular/core';

@Injectable()
export class PersonalProfilePhotoData {

  public user: any;
  public userdata: any;
  public profilepicdata: any;

  constructor() {
    this.user = firebase.auth().currentUser;
    this.userdata = firebase.database().ref('/users/');
    this.profilepicdata = firebase.storage().ref('/profilepics/');
  }

  savePicture(pic): any {
    this.profilepicdata.child(this.user.uid).child('profilepicture.png')
      .put(pic).then((savedpicture) => {
        this.userdata.child(this.user.uid).update({'profilepic' : savedpicture.downloadURL});
      });
  }

}

