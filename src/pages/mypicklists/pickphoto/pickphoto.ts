import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

// services
import { AuthService } from '../../../providers/auth-service';
import { TransactionData } from '../../../providers/transaction-data';

@Component({
  selector: 'page-pickphoto',
  templateUrl: 'pickphoto.html'
})

export class PickPhotoPage {

  public userPhoto: any;
  public userPhotoDisplay: any;

  constructor(
      public nav: NavController,
      private camera: Camera,
      public auth: AuthService,
      public transactionData: TransactionData) {}

  ionViewDidLoad() {
    this.takePicture();
  }

  goBack() {
    this.nav.pop();
  }

  savePicture() {
    this.transactionData.setReferrer('PickPhotoPage');
    this.transactionData.setPhoto(this.userPhoto);
    this.transactionData.setPhotoDisplay(this.userPhotoDisplay);
    this.goBack();
  }

  takePicture(){

    const options : CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType : this.camera.PictureSourceType.CAMERA,
      allowEdit: true,
      targetWidth: 800,
      targetHeight: 800,
      saveToPhotoAlbum: false,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.userPhoto = imageData;
      this.userPhotoDisplay = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.log(err);
    });

  }
  
}