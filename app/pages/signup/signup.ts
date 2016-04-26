import {Page, NavController, MenuController, Alert} from 'ionic-angular';
import {UserData} from '../../providers/user-data';
import {AccountListPage} from '../mymoney/account-list/account-list';

/* Firebase imports */
import {AngularFire} from 'angularfire2';
import {FirebaseAuth, AuthProviders, AuthMethods } from 'angularfire2';

@Page({
  templateUrl: 'build/pages/signup/signup.html'
})
export class SignupPage {
  signup: {username?: string, password?: string} = {};
  submitted = false;
  validationMessage = "";

  constructor(
    private nav: NavController, 
    private userData: UserData, 
    private menu: MenuController,
    public af: AngularFire,
    public auth: FirebaseAuth) {}

  private SignUpSuccess(form): void {
    let credentials = {
      email: form.controls.username.value,
      password: form.controls.password.value
    }
    this.auth.login(credentials, {
      provider: AuthProviders.Password,
      method: AuthMethods.Password})
      .then(() => this.LoginSuccess())
      .catch(() => this.LoginError()
    );
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
  
  private LoginSuccess(): void {
    this.nav.setRoot(AccountListPage);
  }
  
  private LoginError(): void {
    // Will be called if login fails
    let alert = Alert.create({
      title: 'Login Failed',
      subTitle: 'Please check your email and/or password and try again',
      buttons: ['Ok']
    });
    this.nav.present(alert);
  }
  
  onSignup(form) {
    this.submitted = true;
    if (form.valid) {
      let credentials = {
        email: form.controls.username.value,
        password: form.controls.password.value
      }
      this.auth.createUser(credentials)
      .then(() => this.SignUpSuccess(form))
      .catch((error) => this.SignUpError(error));
    }
  }
  
  onPageDidEnter() {
    this.menu.enable(false);
    this.menu.swipeEnable(false);
  }
  
  onPageDidLeave() {
    //this.menu.enable(true);
    //this.menu.swipeEnable(true);
  }
  
}
