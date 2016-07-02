import {Component} from '@angular/core';
import {NavController, Alert, ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/myinfo/removeuser/removeuser.html'
})

export class RemoveUserPage { 
  user: {
    passwod?: string
  } = {};
        
  constructor(
      private nav: NavController,
      private viewCtrl: ViewController) {}  
 
  removeUser(user) {
    this.dismiss(user);
  }
  
  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
    
}