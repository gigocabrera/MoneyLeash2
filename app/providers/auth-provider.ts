//
// https://github.com/r-park/todo-angular2-firebase
//
import {provide} from '@angular/core';
import {FIREBASE_URL} from './firebase-urls';
import {AuthService} from './auth-service';

export const AuthProvider: any[] = [
  provide(AuthService, {
    useFactory: (): AuthService => {
      return new AuthService(new Firebase(FIREBASE_URL));
    }
  })
];
