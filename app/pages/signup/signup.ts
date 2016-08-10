import {Component} from '@angular/core';
import {NavController, Alert, AlertController, Loading, LoadingController} from 'ionic-angular';
import {UserData} from '../../providers/user-data';
import {AccountListPage} from '../mymoney/account-list/account-list';

// Firebase
import {FirebaseAuth} from 'angularfire2';
import {FirebaseService} from '../../providers/firebaseService'

@Component({
  templateUrl: 'build/pages/signup/signup.html'
})
export class SignupPage {
  
  user = {'fullname': '', 'email': '', 'password': ''};
  submitted = false;
  alertMessage = '';

  constructor(
    public nav: NavController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public userData: UserData,
    public db: FirebaseService,
    public auth: FirebaseAuth) { }
  
  doSignup(credentials) {

    let loading = this.loadingController.create({
      content: 'Please wait...'
    });
    loading.present();

    this.auth.createUser(credentials)
    .then((authData) => {
      this.userData.saveLocalStorage(credentials);
      this.db.createInitialSetup(credentials);
      this.nav.setRoot(AccountListPage, {}, {animate: true, direction: 'forward'});
      loading.dismiss();
    })
    .catch((error) => {
        this.SignUpError(error);
        loading.dismiss();
      }
    );
  }
  
  private SignUpError(error): void {
    console.log(error);    
    switch (error.code) {
      case "auth/email-already-in-use":
          this.alertMessage = "The specified email is already in use!"
          break;
      case "auth/invalid-email":
          this.alertMessage = "The specified email is not valid!"
          break;
      case "auth/operation-not-allowed":
          this.alertMessage = "Your account has been disabled. Please contact support!"
          break;
      case "auth/weak-password":
          this.alertMessage = "Your password is not strong enough!"
          break;
    }
    let alert = this.alertController.create({
      title: 'Sign Up Failed',
      subTitle: this.alertMessage,
      buttons: ['Ok']
    });
    alert.present();
  }
  
  private LoginError(): void {
    let alert = this.alertController.create({
      title: 'Login Failed',
      subTitle: 'Please check your email and/or password and try again',
      buttons: ['Ok']
    });
    alert.present();
  }
  
}