import {Component} from '@angular/core';
import {NavController, Alert, ViewController} from 'ionic-angular';
import {MyInput} from '../../mydirectives/my-input/my-input';

@Component({
  templateUrl: 'build/pages/myinfo/changeemail/changeemail.html',
  directives: [MyInput]
})

export class ChangeEmailPage { 

  user: {
    oldemail?: string,
    newemail?: string,
    password?: string
  } = {};

  constructor(
    private nav: NavController,
    private viewCtrl: ViewController) { }
  
  changeEmail(user) {
    this.dismiss(user);
  }
  
  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
    
}