import {Component} from '@angular/core';
import {NavController, Alert, ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/myinfo/changeemail/changeemail.html'
})

export class ChangeEmailPage { 
  user: {
    email?: string,
    password?: string
  } = {};
        
  constructor(
      private nav: NavController,
      private viewCtrl: ViewController) {}
  
  changeEmail(user) {
    this.dismiss(user);
  }
  
  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
    
}