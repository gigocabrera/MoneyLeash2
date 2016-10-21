import { Component } from '@angular/core';

import { ViewController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'changename.html'
})

export class ChangeNamePage { 

  newname: string = '';

  constructor(
    public viewCtrl: ViewController, public navParams: NavParams) {

      this.newname = this.navParams.data.paramFullName;

    }
  
  changeName(newname) {
    this.viewCtrl.dismiss(newname);
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
    
}