// angular
import {Component} from '@angular/core';

// ionic
import {Alert, ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/myinfo/changename/changename.html'
})

export class ChangeNamePage { 

  newemail: string = '';

  constructor(
    public viewCtrl: ViewController) {}
  
  changeName(newname) {
    this.dismiss(newname);
  }
  
  dismiss(newname) {
    this.viewCtrl.dismiss(newname);
  }
    
}