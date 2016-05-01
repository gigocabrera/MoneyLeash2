import {Page, NavController, Alert, ViewController} from 'ionic-angular';
import {AuthService} from '../../../providers/auth-service';

@Page({
  templateUrl: 'build/pages/myinfo/resetpassword/resetpassword.html'
})

export class ResetPasswordPage { 
  user: {
    email?: string
  } = {};
        
  constructor(
      private nav: NavController,
      private viewCtrl: ViewController,
      private auth: AuthService) {}  
 
  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
  
  resetPassword(user) {
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