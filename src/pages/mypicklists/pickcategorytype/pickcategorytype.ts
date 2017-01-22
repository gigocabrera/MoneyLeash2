import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

// services
import { CategoryData } from '../../../providers/category-data';

@Component({
  templateUrl: 'pickcategorytype.html'
})

export class PickCategoryTypePage {
  
  items = [];  
  itemselected: string;
  validationMessage: string;
  showValidationMessage: boolean = false;
   
  constructor(
    public nav: NavController,
    public categoryData: CategoryData) {}

  ionViewDidLoad() {
    this.items.push(
      { text: 'Income', value: 'Income' },
      { text: 'Expense', value: 'Expense' },
    );
    this.itemselected = this.categoryData.getCategoryType();
  }
  
  pickPreference(itemselected) {
    this.categoryData.setReferrer('PickCategoryTypePage');
    this.categoryData.setCategoryType(this.itemselected);
    this.goBack();
  }

  goBack() {
    this.nav.pop();
  }
}