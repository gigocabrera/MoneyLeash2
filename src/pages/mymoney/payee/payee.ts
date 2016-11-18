import { Component } from '@angular/core';

import { NavController, ModalController, NavParams } from 'ionic-angular';

// app pages
//import { PickCategoryTypePage } from '../../mypicklists/pickcategorytype/pickcategorytype';
//import { PickCategoryParentPage } from '../../mypicklists/pickcategoryparent/pickcategoryparent';

// services
import { UserData } from '../../../providers/user-data';

@Component({
  templateUrl: 'payee.html'
})

export class PayeePage {

  navbarcolor: string;
  dividercolor: string;
  title: string;
  listheader: string;
  payee: any;

  constructor(
      public nav: NavController,
      public modalController: ModalController,
      public navParams: NavParams,
      public userData: UserData) {

    this.navbarcolor = this.userData.user.navbarcolor;
    this.dividercolor = this.userData.user.dividercolor;

    this.payee = this.navParams.data.paramPayee;
    if (this.payee.mode === 'New') {
      this.title = 'Create Payee';
      this.listheader = 'Enter Payee Details';
    } else {
      this.title = 'Edit Payee';
      this.listheader = 'Edit Payee Details';
    }
    
  }

  save() {
    
    /*// Category sort
    if (this.category.categoryparent === '') {
      this.category.categorysort = this.category.categoryname.toUpperCase();
    } else {
      this.category.categorysort = this.category.categoryparent.toUpperCase() + ':' + this.category.categoryname.toUpperCase(); 
    }

    // Is this a new category? 
    if (this.category.mode === 'New') {
      this.userData.addCategory(this.category);
    } else {
      this.userData.updateCategory(this.category);
    }
    this.nav.pop();*/
  }

  pickCategoryType() {
    /*let modal = this.modalController.create(PickCategoryTypePage, {paramCategoryType: this.category.categorytype});
    modal.present(modal);
    modal.onDidDismiss((data: any[]) => {
      if (data) {
        this.onPickCategoryType(data);
      }
    });*/
  }

  onPickCategoryType(item) {
    //this.category.categorytype = item.text;
  }

  pickCategoryParent() {
    /*let modal = this.modalController.create(PickCategoryParentPage, {paramCategory: this.category});
    modal.present(modal);
    modal.onDidDismiss((data: any[]) => {
      if (data) {
        this.onPickCategoryParent(data);
      }
    });*/
  }

  onPickCategoryParent(item) {
    //this.category.categoryparent = item.text;
  }
  
}