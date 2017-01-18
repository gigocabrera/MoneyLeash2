import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

// app pages
import { PickCategoryNamePage } from '../../mypicklists/pickcategoryname/pickcategoryname';
import { PickCategoryTypePage } from '../../mypicklists/pickcategorytype/pickcategorytype';
import { PickCategoryParentPage } from '../../mypicklists/pickcategoryparent/pickcategoryparent';

// services
import { UserData } from '../../../providers/user-data';
import { CategoryData } from '../../../providers/category-data';

@Component({
  templateUrl: 'category.html'
})

export class CategoryPage {

  validationMessage: string;
  showValidationMessage: boolean = false;
  hasDataCategoryName: boolean = false;
  hasDataCategoryType: boolean = false;
  hasDataCategoryParent: boolean = false;
  title: string;
  listheader: string;
  category: any;
  mode: string;

  constructor(
      public nav: NavController,
      public navParams: NavParams,
      public userData: UserData,
      public categoryData: CategoryData) {
    
    this.category = this.navParams.data.paramCategory;
    this.category.categoryparentdisplay = this.category.categoryparent;
    this.mode = this.navParams.data.paramMode;

    if (this.mode === 'New') {
      this.title = 'Create Category';
      this.listheader = 'Enter Category Details';
      this.hasDataCategoryName = false;
      this.hasDataCategoryType = false;
      this.hasDataCategoryParent = false;
      this.categoryData.reset();
    } else {
      this.title = 'Edit Category';
      this.listheader = 'Edit Category Details';

      if (this.category.categoryname != '') {
        this.hasDataCategoryName = true;
      }
      if (this.category.categorytype != '') {
        this.hasDataCategoryType = true;
      }
      if (this.category.categoryparent != '') {
        this.hasDataCategoryParent = true;
      }

      // Prepare services
      this.categoryData.setCategoryName(this.category.categoryname);
      this.categoryData.setCategoryType(this.category.categorytype);
      this.categoryData.setCategoryParent(this.category.categoryparent);
    }    
  }

  ionViewWillEnter() {
    let referrer = this.categoryData.getReferrer();
    switch (referrer) {
      case 'CategoryListPage': {
        break;
      }
      case 'PickCategoryNamePage': {
        this.category.categoryname = this.categoryData.getCategoryName();
        if (this.category.categoryname != '') {
          this.hasDataCategoryName = true;
        }
        break;
      }
      case 'PickCategoryTypePage': {
        this.category.categorytype = this.categoryData.getCategoryType();
        if (this.category.categoryname != '') {
          this.hasDataCategoryType = true;
        }
        break;
      }
      case 'PickCategoryParentPage': {
        this.category.categoryparent = this.categoryData.getCategoryParent();
        this.hasDataCategoryParent = false;
        if (this.category.categoryparent != '') {
          this.hasDataCategoryParent = true;
        }
        break;
      }
    }
  }

  save() {
    
    // Handle category sort
    if (this.category.categoryparent === '') {
      this.category.categorysort = this.category.categoryname;
    } else {
      this.category.categorysort = this.category.categoryparent + ':' + this.category.categoryname; 
    }

    // Is this a new category? 
    if (this.mode === 'New') {
      this.userData.addCategory(this.category);
    } else {
      this.userData.updateCategory(this.category);
    }
    this.nav.pop();
  }

  pickCategoryName() {
    this.showValidationMessage = false;
    this.nav.push(PickCategoryNamePage);
  }

  pickCategoryType() {
    if (!this.hasDataCategoryType) {
      this.showValidationMessage = true;
      this.validationMessage = "Please enter a category name";
      return;
    }
    this.nav.push(PickCategoryTypePage);
  }

  pickCategoryParent() {
    if (!this.hasDataCategoryName) {
      this.showValidationMessage = true;
      this.validationMessage = "Please enter category name";
      return;
    }
    this.nav.push(PickCategoryParentPage);
  }
  
}