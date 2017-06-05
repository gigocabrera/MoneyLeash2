import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

// services
import { AuthService } from '../../../providers/auth-service';
import { CategoryData } from '../../../providers/category-data';

@Component({
  templateUrl: 'pickcategoryparent.html'
})

export class PickCategoryParentPage {
  
  items: {};
  itemselected: any;
  validationMessage: string;
  showValidationMessage: boolean = false;
   
  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public auth: AuthService,
    public categoryData: CategoryData) {
      
    this.itemselected = navParams.get('type');

  }

  ionViewDidLoad() {
    this.auth.getParentCategories(this.itemselected).on('value', (categories) => {
      let rawList= [];
      //Add default option for <None>
      rawList.push({
        $key: '',
        categoryname: '< None >',
        categorytype: '',
        categoryparent: '',
        categorysort: ''
      });
      // Add parent category from firebase
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
    this.categoryData.setReferrer('PickCategoryParentPage');
    this.categoryData.setCategoryParent(this.itemselected);
    this.goBack();
  }

  goBack() {
    this.nav.pop();
  }

}