import {Page, NavController, MenuController, Alert} from 'ionic-angular';
import {AdvancedCard} from '../advanced-card/advanced-card';
import {AboutPage} from '../about/about';
import {AuthService} from '../../providers/auth-service';

@Page({
  templateUrl: 'build/pages/myinfo/myinfo.html',
  directives: [AdvancedCard]
})

export class MyInfoPage {
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(
      private nav: NavController,
      private auth: AuthService) {}
      
  private openAbout(): void {
    this.nav.push(AboutPage);
    console.log(this.auth.authenticated);
  }
  
  private logout(): void {
    this.auth.signOut();
    console.log("firebase auth signout");
  }
  
}