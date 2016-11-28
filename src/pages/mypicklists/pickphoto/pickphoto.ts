import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Camera } from 'ionic-native';

// services
import { UserData } from '../../../providers/user-data';
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
      public userData: UserData,
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

  /*takePicture(){
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
      const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          const slice = byteCharacters.slice(offset, offset + sliceSize);
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }
        const blob = new Blob(byteArrays, {type: contentType});
        return blob;
      }
      this.userPictureblob = b64toBlob(imageData, 'image/png');
      this.userPicture = "data:image/jpeg;base64," + imageData;
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }*/
  
}