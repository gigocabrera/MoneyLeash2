import {Component} from '@angular/core';
import {NavController, Alert, Loading} from 'ionic-angular';
import {UserData} from '../../providers/user-data';
import {AccountListPage} from '../mymoney/account-list/account-list';
import {FirebaseService} from '../../providers/firebaseService'

@Component({
  templateUrl: 'build/pages/signup/signup.html'
})
export class SignupPage {
  
  showValidationMessage: boolean = false;
  submitted = false;
  validationMessage = "";

  constructor(
    private nav: NavController,
    private userData: UserData,
    public fbservice: FirebaseService) {}

  private inputIsValid(credentials) : boolean {
    this.showValidationMessage = false;
    this.validationMessage = '';
    if (credentials.firstname == null) {
      this.showValidationMessage = true;
      this.validationMessage = 'Please enter your first name';
      return false;
    }
    if (credentials.lastname == null) {
      this.showValidationMessage = true;
      this.validationMessage = 'Please enter your last name';
      return false;
    }
    if (credentials.email == null) {
      this.showValidationMessage = true;
      this.validationMessage = 'Please enter your email address';
      return false;
    }
    if (credentials.password == null) {
      this.showValidationMessage = true;
      this.validationMessage = 'Please enter a password';
      return false;
    }
    return true;
  }
  
  doSignup(credentials, _event) {
    _event.preventDefault();
    this.submitted = true;
    if (this.inputIsValid(credentials)) {
      //
      // Save email to localStorage
      this.userData.handleSignup(credentials);
      //
      // Create user
      this.fbservice.createUser(credentials).subscribe(
      (data: any) => {
        console.log("the data", data.email);
        this.SignUpSuccess(credentials);
      },
      (error) => {
        console.log(error)
        this.SignUpError(error)
      });
    }
  }
   
  private SignUpSuccess(credentials): void {
    //
    // User has been created. Now Authenticate user (login) in Firebase
    this.fbservice.login(credentials)
      .subscribe(
      (data: any) => {
        console.log("the data", data.email);
        this.LoginSuccess(credentials);
      },
      (error) => {
        console.log(error);
        this.LoginError();
    });
  }
  
  private LoginSuccess(credentials): void {
    //
    // Save personal data to member node (personal profile)
    this.fbservice.saveUserProfile(credentials);
    this.fbservice.createPreferences();
    this.nav.setRoot(AccountListPage, {}, {animate: true, direction: 'forward'});
  }
  
  private SignUpError(error): void {
    switch (error.code) {
      case "EMAIL_TAKEN":
          this.validationMessage = "The specified email is already in use"
          break;
      case "INVALID_EMAIL":
          this.validationMessage = "The specified email is not a valid email address"
          break;
      default:
          this.validationMessage = "Oops. Something went wrong"
    }
    let alert = Alert.create({
      title: 'Sign Up Failed',
      subTitle: this.validationMessage,
      buttons: ['Ok']
    });
    this.nav.present(alert);
  }
  
  private LoginError(): void {
    let alert = Alert.create({
      title: 'Login Failed',
      subTitle: 'Please check your email and/or password and try again',
      buttons: ['Ok']
    });
    this.nav.present(alert);
  }
  
}