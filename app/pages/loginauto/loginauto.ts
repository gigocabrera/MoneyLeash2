import {Component} from '@angular/core';
import {NavController, Alert} from 'ionic-angular';
import {UserData} from '../../providers/user-data';
import {LoginPage} from '../login/login';
import {AccountListPage} from '../mymoney/account-list/account-list';

// Firebase service
import {FirebaseService} from '../../providers/firebaseService'

@Component({
  templateUrl: 'build/pages/loginauto/loginauto.html'
})

export class LoginAutoPage {

  constructor(
    private nav: NavController,
    private userData: UserData,
    private db: FirebaseService) {}

    onPageWillEnter() {
      this.userData.autoLoginLocalStorage();
      this.doautologin();
    }

    doautologin() {
      this.db.loginauto(this.userData.username, this.userData.userpwd).then(() => {
          this.db.getMyPreferences();
          this.nav.setRoot(AccountListPage);
        }).catch(
        (error) => {
          // There was a problem with auto login. Redirect to login page
          // (a) account deleted; (b) account disabled; (c) loss connection to firebase; (d) etc.
          this.nav.setRoot(LoginPage);
        }
      );
    }

}
