import {Page, NavController, MenuController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {UserData} from '../../providers/user-data';

@Page({
  templateUrl: 'build/pages/signup/signup.html'
})
export class SignupPage {
  signup: {username?: string, password?: string} = {};
  submitted = false;

  constructor(private nav: NavController, private userData: UserData, private menu: MenuController) {}

  onSignup(form) {
    this.submitted = true;

    if (form.valid) {
      this.userData.signup();
      this.nav.push(TabsPage);
    }
  }
  
  onPageDidEnter() {
    this.menu.enable(false);
    this.menu.swipeEnable(false);
  }
  
  onPageDidLeave() {
    this.menu.enable(true);
    this.menu.swipeEnable(true);
  }
  
}
