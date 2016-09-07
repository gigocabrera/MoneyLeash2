import {Component} from '@angular/core';
import {NavController, Alert, AlertController, ActionSheet, Modal, ModalController, Loading, LoadingController, NavParams} from 'ionic-angular';
import {Camera} from 'ionic-native';

// Services
import {PersonalProfilePhotoData} from '../../../providers/personalprofilephoto-data';

@Component({
  templateUrl: 'build/pages/myinfo/personalprofilephoto/personalprofilephoto.html',
  providers: [PersonalProfilePhotoData]
})

export class PersonalProfilePhotoPage {
  
  public userSettings: any;
  public userPicture: any;
  public userPictureblob: any;

  constructor(
      public nav: NavController,
      public modalController: ModalController,
      public alertController: AlertController,
      public loadingController: LoadingController,
      public personalprofilephotoData: PersonalProfilePhotoData) {

        // Initialize camera on load
        this.takePicture();
  }

  dismiss() {
    this.nav.pop();
  }

  savePicture() {
    this.personalprofilephotoData.savePicture(this.userPictureblob);
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
  }
  
}