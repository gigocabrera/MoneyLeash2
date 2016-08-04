import {Component} from '@angular/core';
import {NavController, Alert} from 'ionic-angular';
import {UserData} from '../../providers/user-data';
import {LoginPage} from '../login/login';
import {AccountListPage} from '../mymoney/account-list/account-list';

// Firebase service
import {AngularFire, AuthProviders, AuthMethods} from 'angularfire2';
import {FirebaseService} from '../../providers/firebaseService'

@Component({
  templateUrl: 'build/pages/loginauto/loginauto.html'
})

export class LoginAutoPage {

  constructor(
    private nav: NavController,
    private userData: UserData,
    private db: FirebaseService,
    private af: AngularFire) {}

    onPageWillEnter() {
      this.userData.autoLoginLocalStorage();
      this.doautologin();
    }

    doautologin() {
      this.af.auth.login({email: this.userData.username, password: this.userData.userpwd}, {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
      }).then((authData) => {
        this.db.getMyPreferences();
        this.nav.setRoot(AccountListPage);
      }).catch((error) => {
        // There was a problem with auto login. Redirect to login page
          // (a) account deleted; (b) account disabled; (c) loss connection to firebase; (d) etc.
          this.nav.setRoot(LoginPage);
      });      
    }

}
