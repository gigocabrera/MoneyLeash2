import { Component } from '@angular/core';

import { ViewController, NavParams } from 'ionic-angular';

// services
import { UserData } from '../../../providers/user-data';

@Component({
  templateUrl: 'pickcategoryparent.html'
})

export class PickCategoryParentPage {
  
  items: {};
  itemselected: any;
   
  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public userData: UserData) {}

  ionViewDidLoad() {    
    this.itemselected = this.navParams.data.paramCategory;
    console.log(this.navParams.data.paramCategory);
    this.userData.getParentCategories(this.itemselected.categorytype).on('value', (categories) => {
      let rawList= [];
      categories.forEach( spanshot => {
        var cat = spanshot.val();
        if (cat.categoryparent === "") {
          rawList.push({
            $key: spanshot.key,
            categoryname: cat.categoryname,
            categorytype: cat.categorytype,
            categoryparent: cat.categoryparent,
            categorysort: cat.categorysort
          });
        }
      });
      this.items = rawList;
    });
  }
  
 pickPreference(itemselected) {
    this.viewCtrl.dismiss(itemselected);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}