import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

// services
import { CategoryData } from '../../../providers/category-data';

@Component({
  templateUrl: 'pickcategoryname.html'
})

export class PickCategoryNamePage {
  
  categoryname;
  validationMessage: string;
  showValidationMessage: boolean = false;
   
  constructor(
      public nav: NavController,
      public categoryData: CategoryData) {}

  ionViewDidLoad() {
    this.categoryname = this.categoryData.getCategoryName();
  }

  pickPreference() {
    if (this.categoryname === '' || this.categoryname === undefined) {
      this.showValidationMessage = true;
      this.validationMessage = "Please enter an account name";
      return;
    }
    this.categoryData.setReferrer('PickCategoryNamePage');
    this.categoryData.setCategoryName(this.categoryname);
    this.goBack();
  }

  goBack() {
    this.nav.pop();
  }

}