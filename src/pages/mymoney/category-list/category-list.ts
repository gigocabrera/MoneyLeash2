import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

import { FirebaseListObservable } from 'angularfire2';

// app pages
import { CategoryPage } from '../category/category';

// services
import {UserData} from '../../../providers/user-data';

@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html'
})

export class CategoryListPage {

  //groups = [];
  //categories: [];
  incomeCategories: FirebaseListObservable<any>;
  expenseCategories: FirebaseListObservable<any>;
  previousgroup: string;
  previouscategory: string;

  constructor(
      public nav: NavController,
      public alertController: AlertController,
      public userData: UserData) {}
  
  ionViewDidLoad() {    

    this.incomeCategories = this.userData.getAllIncomeCategories();
    this.expenseCategories = this.userData.getAllExpenseCategories();

    /*this.userData.getAllCategories().subscribe(categoryTypes => {
      
      categoryTypes.forEach(category => {

        // Reset categories array
        this.categories = [];

        //Handle first time loop
        if (this.previousgroup === undefined) {
          this.previousgroup = category.key;
        }

        category.forEach(cat => {
          var thiscategory = cat.val();
          var thiscategorykey = cat.key;
          var tempCat = ({
            $key: thiscategorykey,
            categoryname: thiscategory.categoryname,
            categoryparent: thiscategory.categoryparent,
            categorysort: thiscategory.categorysort,
            categorytype: thiscategory.categorytype,
            categorymode: 'Edit'
          });
          this.categories.push({ 'category': tempCat});
        })
        this.groups.push({ 'name': category.key, 'categories': this.categories});
      });
      
    });*/

  }
  
  newCategory() {
    var category = {
          '$key': '',
          'categoryname': '',
          'categoryparent': '',
          'categorysort': '',
          'categorytype': '',
          'mode': 'New'
        }
    this.nav.push(CategoryPage, {paramCategory: category});
  }

  edit(slidingItem, category) {
    this.handleSlidingItems(slidingItem);
    this.nav.push(CategoryPage, {paramCategory: category});
  }

  delete(slidingItem, category) {
    this.handleSlidingItems(slidingItem);
    let alert = this.alertController.create({
      title: 'Delete Category',
      message: 'Are you sure you want to delete ' + category.categoryname + ' and ALL the transactions?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            //console.log('Cancel RemoveUser clicked');
            slidingItem.close();
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.userData.deleteCategory(category);
          }
        }
      ]
    });
    alert.present();
  }

  handleSlidingItems(slidingItem) {
    // Close any open sliding items when the page updates
    slidingItem.close();
  }
  
}