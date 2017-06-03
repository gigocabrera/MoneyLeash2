import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { AuthService } from '../../providers/auth-service';

import { MainPage } from '../../pages/pages';
import { LoginPage } from '../../pages/login/login';


// firebase
declare var firebase: any;

@Component({
  selector: 'page-loginauto',
  templateUrl: 'loginauto.html'
})

export class LoginAutoPage {

  pwd: string;
  email: string;
  account: {email: string, password: string} = {
    email: '',
    password: ''
  };

  constructor(public nav: NavController, public auth: AuthService, public storage: Storage) {

      this.auth.LoadingControllerShow();

      storage.ready().then(() => {

        // Get pwd settings
        this.storage.get('option3').then( email => {
          this.email = email;

          // Get pwd settings
          this.storage.get('option2').then( pwd => {
            this.pwd = pwd;
            if (this.email != '' && this.pwd != '') {
              // Auto Login
              this.account = {email: this.email, password: this.pwd};
              this.autoLogin(this.account);
            } else {
              this.LoginFailure();
            }
          })
        })
      })
      .catch(
        (error) => {
          console.log(error);
          this.auth.LoadingControllerDismiss();
        }
      );
    }

    autoLogin(credentials) {
      this.auth.signInWithEmail(credentials)
      .then(() => {
          this.LoginSuccess();
        }        
      )
      .catch(
        (error) => {
          this.LoginFailure();
        }
      );
    }

    LoginSuccess() {
      setTimeout(() => {
        this.nav.setRoot(MainPage, {}, {animate: true, direction: 'forward'});
      }, 1000);
    }

    LoginFailure() {
      this.nav.setRoot(LoginPage);
      this.auth.LoadingControllerDismiss();
    }

}