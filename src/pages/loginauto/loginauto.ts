import { Component } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';

// app pages
import { LoginPage } from '../login/login';
import { AccountListPage } from '../mymoney/account-list/account-list';

// services
import { UserData } from '../../providers/user-data';

// firebase
declare var firebase: any;

@Component({
  templateUrl: 'loginauto.html'
})

export class LoginAutoPage {

  credentials: any;

  constructor(
    public nav: NavController,
    public loadingController: LoadingController,
    public userData: UserData) {

      let loading = this.loadingController.create({
        content: 'Please wait...'
      });
      loading.present();

      this.credentials = {email: this.userData.getUsernameStorage(),password: this.userData.getPasswordStorage()};
      this.userData.login(this.credentials)
      .then(() => {
          this.nav.setRoot(AccountListPage);
        }        
      )
      .catch(
        (error) => {
          loading.dismiss();     
          this.nav.setRoot(LoginPage);
          loading.dismiss();
        }
      );
    }

}