import {Component} from '@angular/core';
import {NavController, Modal} from 'ionic-angular';

// Firebase service
import {FirebaseService} from '../../../providers/firebaseService'

@Component({
  templateUrl: 'build/pages/mysettings/accounttypes/accounttypes.html'
})

export class AccountTypesPage {
  
  public todos: any[] = [];
  
  constructor(private nav: NavController, private db: FirebaseService) {
    let that = this;
    this.db.todos.subscribe((data) => {
      that.todos.push(data);
      //console.log(that.todos)
    }, (err) => {
      console.error(err);
    });
  }
  
}