import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { AuthService } from '../../../providers/auth-service';

@Component({
  templateUrl: 'personalprofilephoto.html'
})

export class PersonalProfilePhotoPage {

  public displayPhoto: string;
  public savePhoto: any;

  constructor(
    private camera: Camera,
    public nav: NavController,
    public auth: AuthService) { }
  
  ionViewDidLoad() {
    this.takePhoto();
  }

  dismiss() {
    this.nav.pop();
  }

  savePicture() {
    this.auth.saveProfilePicture(this.savePhoto);
    this.dismiss();
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 75,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this
      .camera
      .getPicture(options)
      .then((imageData) => {
        this.savePhoto = imageData;
        this.displayPhoto = "data:image/jpeg;base64," + imageData;
      }, (err) => {
        console.log(err);
      });
  }
  
}