import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

// app pages
import { PickCategoryTypePage } from '../../mypicklists/pickcategorytype/pickcategorytype';
import { PickCategoryParentPage } from '../../mypicklists/pickcategoryparent/pickcategoryparent';

// services
import { AuthService } from '../../../providers/auth-service';
import { CategoryData } from '../../../providers/category-data';

@Component({
  templateUrl: 'category.html'
})

export class CategoryPage {

  title: string;
  listheader: string;
  validationMessage: string;
  showValidationMessage: boolean = false;
  mode: string = '';
  key: string = '';
  categorytype: string = '';
  category: {categoryname: string, categoryparent: string, categoryparentdisplay: string, categorysort: string, categorytype: string} = {
    categoryname: '',
    categoryparent: '',
    categoryparentdisplay: '',
    categorysort: '',
    categorytype: ''
  }

  constructor(
      public nav: NavController,
      public navParams: NavParams,
      public auth: AuthService,
      public categoryData: CategoryData) {
    
    this.key = navParams.get('key');
    this.categorytype = navParams.get('categorytype');

    if (this.key === '0') {
      this.title = 'Create Category';
      this.listheader = 'Enter Category Details';
      this.categoryData.reset();
      this.mode = 'New';
    } else {
      this.title = 'Edit Category';
      this.listheader = 'Edit Category Details';
      if (this.categorytype === 'Income') {
        this.auth.getIncomeCategory(this.key).once('value').then(snapshot => {
          this.category = snapshot.val();
          this.title = 'Edit ' + ' ' + this.category.categoryname;
          this.mode = 'Edit';
        });
      } else {
        this.auth.getExpenseCategory(this.key).once('value').then(snapshot => {
          this.category = snapshot.val();
          this.title = 'Edit ' + ' ' + this.category.categoryname;
          this.mode = 'Edit';
        });
      }
    }

  }

  ionViewWillEnter() {
    let referrer = this.categoryData.getReferrer();
    switch (referrer) {
      case 'CategoryListPage': {
        break;
      }
      case 'PickCategoryTypePage': {
        this.category.categorytype = this.categoryData.getCategoryType();
        break;
      }
      case 'PickCategoryParentPage': {
        this.category.categoryparent = this.categoryData.getCategoryParent();
        break;
      }
    }
  }

  save() {

    // Validate form before saving
    if (!this.isValidName()) {
      return;
    }
    if (!this.isValidType()) {
      return;
    }

    // Handle category sort
    if (this.category.categoryparent === '') {
      this.category.categorysort = this.category.categoryname;
    } else {
      this.category.categorysort = this.category.categoryparent + ':' + this.category.categoryname; 
    }

    // Save category 
    if (this.mode === 'New') {
      this.auth.addCategory(this.category);
    } else {
      this.auth.updateCategory(this.category, this.key);
    }
    this.nav.pop();
  }

  pickCategoryType() {
    if (!this.isValidName()) {
      return;
    }
    this.nav.push(PickCategoryTypePage, { type: this.category.categorytype });
  }

  pickCategoryParent() {
    if (!this.isValidName()) {
      return;
    }
    if (!this.isValidType()) {
      return;
    }
    this.nav.push(PickCategoryParentPage, { type: this.category.categorytype });
  }

  isValidName(): boolean {
    if (this.category.categoryname === '') {
      this.showValidationMessage = true;
      this.validationMessage = "Please enter a category name";
      return false;
    } else {
      this.showValidationMessage = false;
      this.validationMessage = '';
      return true;
    }
  }

  isValidType(): boolean {
    if (this.category.categorytype === '') {
      this.showValidationMessage = true;
      this.validationMessage = "Please select a category type";
      return false;
    } else {
      this.showValidationMessage = false;
      this.validationMessage = '';
      return true;
    }
  }
  
}