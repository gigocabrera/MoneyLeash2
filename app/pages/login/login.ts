// angular
import {Component} from '@angular/core';

// ionic
import {NavController, Alert, AlertController, Loading, LoadingController, MenuController} from 'ionic-angular';

// pages
import {SignupPage} from '../signup/signup';
import {ForgotPasswordPage} from '../forgot-password/forgot-password';
import {AccountListPage} from '../mymoney/account-list/account-list';

// services
import {UserData} from '../../providers/user-data';

// firebase
declare var firebase: any;

@Component({
  templateUrl: 'build/pages/login/login.html'
})

export class LoginPage {

  public fireAuth: any;
  public houseid: string;
  user = {'email': '', 'password': ''};

  constructor(
    public nav: NavController,
    public menu: MenuController,
    public alertController: AlertController,
    public userData: UserData,
    public loadingController: LoadingController) {

      this.fireAuth = firebase.auth();

    }

  public doLogin(credentials) {
    
    let loading = this.loadingController.create({
      content: 'Please wait...'
    });
    loading.present();
    
    // Save credentials to localstorage
    this.userData.saveLocalStorage(credentials);
    
    // Login user with Firebase
    this.fireAuth.signInWithEmailAndPassword(credentials.email, credentials.password).then((authData) => {
      this.LoginSuccess(loading);
    }).catch((error) => {
      this.LoginError(error, loading);
    })
  }
  
  private LoginSuccess(loading): void {
    loading.dismiss();
    
    this.userData.loadUserPreferences();
    this.settingsData.getUserData().on('value', (data) => {
      this.userSettings = data.val();
      this.houseid = this.userSettings.houseid;
    });


    this.nav.setRoot(AccountListPage, {}, {animate: true, direction: 'forward'});
  }
  
  private LoginError(error, loading): void {
    let alert = this.alertController.create({
      title: 'Login Failed',
      subTitle: 'Please check your email and/or password and try again',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            loading.dismiss();
          }
        }
      ]
    });
    alert.present();
  }

  doSignup() {
    this.nav.push(SignupPage);
  }
  
  doForgotPassword() {
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
