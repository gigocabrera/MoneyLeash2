import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

// services
import { AuthService } from '../../../providers/auth-service';
import { TransactionData } from '../../../providers/transaction-data';

@Component({
  selector: 'page-pickcategory',
  templateUrl: 'pickcategory.html'
})

export class PickCategoryPage {

  searchTerm: string = '';
  transaction;
  categoryList: any;
  loadedCategoryList: any;
  incomeCategories: {};
  expenseCategories: {};
  type: string;
   
  constructor(
      public nav: NavController,
      public auth: AuthService,
      public transactionData: TransactionData) {}

  ionViewDidLoad() {
    
    this.type = this.transactionData.getTransactionType();

    this.auth.getIncomeCategories().on('value', (incomecategories) => {
      let rawList= [];
      incomecategories.forEach( spanshot => {
        var cat = spanshot.val();
        rawList.push({
          $key: spanshot.key,
          categoryname: cat.categoryname,
          categorytype: cat.categorytype,
          categoryparent: cat.categoryparent,
          categorysort: cat.categorysort
        });
      });
      this.incomeCategories = rawList;
    });

    this.auth.getExpenseCategories().on('value', (expensecategories) => {
      let rawList= [];
      expensecategories.forEach( spanshot => {
        var cat = spanshot.val();
        rawList.push({
          $key: spanshot.key,
          categoryname: cat.categoryname,
          categorytype: cat.categorytype,
          categoryparent: cat.categoryparent,
          categorysort: cat.categorysort
        });
      });
      this.expenseCategories = rawList;
    });

    this.auth.LoadingControllerDismiss();

  }

  selectCategory(category) {
    this.transactionData.setReferrer('PickCategoryPage');
    this.transactionData.setCategoryName(category.categoryname);
    this.transactionData.setCategoryID(category.$key);
    this.goBack();
  }

  goBack() {
    this.nav.pop();
  }

}