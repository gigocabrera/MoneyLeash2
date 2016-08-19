import {Component} from '@angular/core';
import {NavController, Alert, AlertController, Loading, LoadingController, MenuController} from 'ionic-angular';
import {UserData} from '../../providers/user-data';
import {SignupPage} from '../signup/signup';
import {ForgotPasswordPage} from '../forgot-password/forgot-password';
import {AccountListPage} from '../mymoney/account-list/account-list';

// Firebase
import {FirebaseAuth} from 'angularfire2';

@Component({
  templateUrl: 'build/pages/login/login.html'
})

export class LoginPage {

  public loading: Loading;
  submitted = false;
  user = {'email': '', 'password': ''};

  constructor(
    public nav: NavController,
    public menu: MenuController,
    public alertController: AlertController,
    public userData: UserData,
    public loadingController: LoadingController,
    public auth: FirebaseAuth) {}

  public doLogin(credentials) {
    //
    // Show loading control in case of network latency
    //this.showLoading();
    //
    // Save credentials to localstorage and flag form as submitted
    this.userData.saveLocalStorage(credentials);
    this.submitted = true;
    //
    // Login user with Firebase
    this.auth.login(credentials).then((authData) => {
      //this.loading.dismiss();
      this.LoginSuccess();
    }).catch((error) => {
      this.LoginError(error);
    })
  }

  showLoading() {
    let loading = this.loadingController.create({
      content: 'Please wait...'
    });
    loading.present();
  }
  
  private LoginSuccess(): void {
    //this.db.getMyPreferences();
    //this.db.getMyHouse();
    this.nav.setRoot(AccountListPage, {}, {animate: true, direction: 'forward'});
    //this.loading.dismiss();
  }
  
  private LoginError(error): void {
    //this.loading.dismiss();
    let alert = this.alertController.create({
      title: 'Login Failed',
      subTitle: 'Please check your email and/or password and try again',
      buttons: ['Ok']
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
