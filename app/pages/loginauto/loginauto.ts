import {Component} from '@angular/core';
import {NavController, Alert, LoadingController} from 'ionic-angular';
import {UserData} from '../../providers/user-data';
import {LoginPage} from '../login/login';
import {AccountListPage} from '../mymoney/account-list/account-list';

// Firebase
import {FirebaseAuth} from 'angularfire2';
//import {FirebaseService} from '../../providers/firebaseService'

@Component({
  templateUrl: 'build/pages/loginauto/loginauto.html'
})

export class LoginAutoPage {

  constructor(
    public nav: NavController,
    public loadingController: LoadingController,
    public userData: UserData,
    public auth: FirebaseAuth) {

      let loading = this.loadingController.create({
        content: 'Please wait...'
      });
      loading.present();

      this.userData.autoLoginLocalStorage();

      // Login user with Firebase
      this.auth.login({email: this.userData.username, password: this.userData.userpwd}).then((authData) => {
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
