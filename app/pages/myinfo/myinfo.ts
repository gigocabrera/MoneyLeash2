import {Page, NavController, MenuController, Alert} from 'ionic-angular';
import {AuthService} from '../../providers/auth-service';

@Page({
  templateUrl: 'build/pages/myinfo/myinfo.html'
})

export class MyInfoPage { 
  user: {
    firstname?: string, 
    lastname?: string, 
    email?: string,
    datecreated?: Date
  } = {};
        
  constructor(
      private nav: NavController,
      private auth: AuthService) {}
  
  onPageDidEnter() {
    this.auth.getUserProfile(this.auth.id)
      .then(thisUser => {
        this.user = thisUser;
      })
  }
  
}