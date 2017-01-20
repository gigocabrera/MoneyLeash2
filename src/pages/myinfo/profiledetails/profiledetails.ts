import { Component } from '@angular/core';

import { NavController, ActionSheetController } from 'ionic-angular';

// app pages

// services
import { UserData } from '../../../providers/user-data';

// firebase
declare var firebase: any;

@Component({
  selector: 'page-profiledetails',
  templateUrl: 'profiledetails.html'
})

export class ProfileDetailsPage {
  
  fullname: string;
  nickname: string;
  housename: string;
  housenumber: string;
  paymentplan: string;

  hasDataProfileFullName: boolean = false;
  hasDataProfileNickname: boolean = false;
  hasDataProfileHouseName: boolean = false;
  hasDataProfileHouseNumber: boolean = false;
  hasDataProfilePaymentPlan: boolean = false;

  constructor(
    public nav: NavController,
    public actionSheetCtrl: ActionSheetController,
    public userData: UserData) {

    if (this.userData.user.fullname != '') {
      this.hasDataProfileFullName = true;
      this.fullname = this.userData.user.fullname;
    }

    if (this.userData.user.nickname != '') {
      this.hasDataProfileNickname = true;
      this.nickname = this.userData.user.nickname;
    }
    
    if (this.userData.user.housename != '') {
      this.hasDataProfileHouseName = true;
      this.housename = this.userData.user.housename;
    }

    if (this.userData.user.housenumber != '') {
      this.hasDataProfileHouseNumber = true;
      this.housenumber = this.userData.user.housenumber;
    }
    
    if (this.userData.user.paymentplay != '') {
      this.hasDataProfilePaymentPlan = true;
      this.paymentplan = this.userData.user.paymentplan;
    }
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Profile Options',
      buttons: [
        {
          text: 'Change Email',
          handler: () => {
            console.log('email clicked');
          }
        },
        {
          text: 'Change Password',
          handler: () => {
            console.log('pwd clicked');
          }
        },
        {
          text: 'Change Picture',
          handler: () => {
            console.log('picture clicked');
          }
        },
        {
          text: 'Logout',
          handler: () => {
            console.log('logout clicked');
          }
        },
        {
          text: 'Delete all',
          role: 'destructive',
          handler: () => {
            console.log('delete all clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  
}