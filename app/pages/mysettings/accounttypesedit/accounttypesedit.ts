// angular
import {Component} from '@angular/core';

// ionic
import {NavController, Alert, ViewController, NavParams} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/mysettings/accounttypesedit/accounttypesedit.html'
})

export class AccountTypesEditPage { 

  public newtype: string;
  public item: any;
  public title: string;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {}
  
  ionViewLoaded() {
    this.item = this.navParams.data.paramItem;
    if (this.item) {
      this.title = 'Edit Account Type';
      this.newtype = this.item.name;
    } else {
      this.title = 'New Account Type';
    }
  }

  save(newtype) {
    this.item.name = newtype;
    this.dismiss(this.item);
  }
  
  dismiss(item) {
    this.viewCtrl.dismiss(item);
  }
    
}