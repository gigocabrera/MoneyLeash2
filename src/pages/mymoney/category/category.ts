import { Component } from '@angular/core';

import { NavController, ModalController, NavParams } from 'ionic-angular';

// app pages
//import { PickAccountTypePage } from '../../mypicklists/pickaccounttype/pickaccounttype';

// services
import { UserData } from '../../../providers/user-data';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})

export class CategoryPage {

  title: string;
  listheader: string;
  category: any;

  constructor(
      public nav: NavController,
      public modalController: ModalController,
      public navParams: NavParams,
      public userData: UserData) {

    this.category = this.navParams.data.paramCategory;
    console.log(this.category);
    if (this.category.mode === 'New') {
      this.title = 'Create Category';
      this.listheader = 'Enter Category Details';
    } else {
      this.title = 'Edit Category';
      this.listheader = 'Edit Category Details';
    }
  }

  save(category) {
    if (this.category.mode === 'New') {
      this.userData.addCategory(category);
    } else {
      this.userData.updateCategory(category);
    }
    this.nav.pop();
  }

  /*pickAccountType() {
    let modal = this.modalController.create(PickAccountTypePage, {paramType: this.account.type});
    modal.present(modal);
    modal.onDidDismiss((data: any[]) => {
      if (data) {
        this.onPickAccountType(data);
      }
    });
  }*/

  onPickAccountType(item) {
    this.category.type = item.name;
  }

  pickCategoryType() {

  }

  pickCategoryParent() {

  }
  
}