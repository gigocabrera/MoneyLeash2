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

  public fireAuth: any;

  constructor(
    public nav: NavController,
    public loadingController: LoadingController,
    public userData: UserData) {

      this.fireAuth = firebase.auth();

      let loading = this.loadingController.create({
        content: 'Please wait...'
      });
      loading.present();

      // Login user with Firebase
      this.fireAuth.signInWithEmailAndPassword({email: this.userData.username, password: this.userData.userpwd}).then((authData) => {
        //this.db.getMyPreferences();
        loading.dismiss();
        this.nav.setRoot(AccountListPage);
      }).catch((error) => {
        // There was a problem with auto login. Redirect to login page
        // (a) account deleted; (b) account disabled; (c) loss connection to firebase; (d) etc.
        this.nav.setRoot(LoginPage);
        loading.dismiss();
      })
    }

}