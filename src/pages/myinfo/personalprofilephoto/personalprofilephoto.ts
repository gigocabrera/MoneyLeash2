import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Camera } from 'ionic-native';

// services
import { UserData } from '../../../providers/user-data';

@Component({
  templateUrl: 'personalprofilephoto.html'
})

export class PersonalProfilePhotoPage {

  public userPhoto: any;
  public userPhotoDisplay: any;

  constructor(
      public nav: NavController,
      public userData: UserData) {}

  ionViewDidLoad() {
    this.takePicture();
  }

  dismiss() {
    this.nav.pop();
  }

  savePicture() {
    this.userData.savePicture(this.userPhoto);
    this.dismiss();
  }

  takePicture(){
    Camera.getPicture({
      quality : 95,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: Camera.EncodingType.PNG,
      targetWidth: 800,
      targetHeight: 800,
      saveToPhotoAlbum: false
    }).then(imageData => {
      this.userPhoto = imageData;
      this.userPhotoDisplay = "data:image/jpeg;base64," + imageData;
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }
  
}