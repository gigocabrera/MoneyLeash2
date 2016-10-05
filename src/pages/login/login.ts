import { Component } from '@angular/core';

import { NavController, AlertController, MenuController } from 'ionic-angular';

// app pages
import { SignupPage } from '../signup/signup';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { AccountListPage } from '../mymoney/account-list/account-list';

// services
import { UserData } from '../../providers/user-data';

// firebase
declare var firebase: any;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  public fireAuth: any;
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(
    public nav: NavController,
    public menu: MenuController,
    public alertController: AlertController,
    public userData: UserData) {

      this.fireAuth = firebase.auth();

      this.login.username = 'guni@test.com';
      this.login.password = '111111';

    }

  public onLogin(form) {
    this.submitted = true;
    if (form.valid) {
      // Save credentials to localstorage
      this.userData.saveLocalStorage(this.login);
      
      // Login user with Firebase
      this.fireAuth.signInWithEmailAndPassword(this.login.username, this.login.password).then((authData) => {
        this.LoginSuccess();
      }).catch((error) => {
        this.LoginError(error);
      })
    }
  }
  
  LoginSuccess(): void {
    this.userData.getUserData().on('value', (data) => {
      this.userData.userSettings = data.val(); 
      this.nav.setRoot(AccountListPage, {}, {animate: true, direction: 'forward'});
    });
  }
  
  LoginError(error): void {
    let alert = this.alertController.create({
      title: 'Login Failed',
      subTitle: 'Please check your email and/or password and try again',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            //do handler stuff here
          }
        }
      ]
    });
    alert.present();
  }

  onSignup() {
    this.nav.push(SignupPage);
  }
  
  onForgotPassword() {
    this.nav.push(ForgotPasswordPage);
  }

  ionViewDidEnter() {
    this.menu.enable(false);
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
    this.menu.swipeEnable(true);
  }
  
}
