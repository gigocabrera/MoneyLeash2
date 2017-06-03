import { Component } from '@angular/core';

import { NavController, ActionSheetController } from 'ionic-angular';

// app pages

// services
import { AuthService } from '../../../providers/auth-service';

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
    public auth: AuthService) {

    if (this.auth.user.fullname != '') {
      this.hasDataProfileFullName = true;
      this.fullname = this.auth.user.fullname;
    }

    if (this.auth.user.nickname != '') {
      this.hasDataProfileNickname = true;
      this.nickname = this.auth.user.nickname;
    }
    
    if (this.auth.user.housename != '') {
      this.hasDataProfileHouseName = true;
      this.housename = this.auth.user.housename;
    }

    if (this.auth.user.housenumber != '') {
      this.hasDataProfileHouseNumber = true;
      this.housenumber = this.auth.user.housenumber;
    }
    
    if (this.auth.user.paymentplay != '') {
      this.hasDataProfilePaymentPlan = true;
      this.paymentplan = this.auth.user.paymentplan;
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