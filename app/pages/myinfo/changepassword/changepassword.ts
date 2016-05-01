import {Page, NavController, Alert, ViewController} from 'ionic-angular';
import {AuthService} from '../../../providers/auth-service';

@Page({
  templateUrl: 'build/pages/myinfo/changepassword/changepassword.html'
})

export class ChangePasswordPage { 
  user: {
    email?: string,
    oldpassword?: string,
    newpassword?: string,
    confirmpassword?: string
  } = {};
        
  constructor(
      private nav: NavController,
      private viewCtrl: ViewController,
      private auth: AuthService) {}  
 
  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
  
  changePassword(user) {
    /*this.auth.ref.child('members').child(this.auth.id).update(this.user);
    let alert = Alert.create({
      title: 'Saved Successfully',
      buttons: [{
        text: 'OK',
        handler: () => {
        }
      }]
    });
    this.nav.present(alert);*/
  }
    
}