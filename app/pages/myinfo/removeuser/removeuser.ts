import {Component} from '@angular/core';
import {NavController, Alert, ViewController} from 'ionic-angular';
import {AuthService} from '../../../providers/auth-service';

@Component({
  templateUrl: 'build/pages/myinfo/removeuser/removeuser.html'
})

export class RemoveUserPage { 
  user: {
    passwod?: string
  } = {};
        
  constructor(
      private nav: NavController,
      private viewCtrl: ViewController,
      private auth: AuthService) {}  
 
  removeUser(user) {
    this.dismiss(user);
  }
  
  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
    
}