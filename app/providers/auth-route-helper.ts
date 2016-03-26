//
// https://github.com/r-park/todo-angular2-firebase
//
import {NavController} from 'ionic-angular';
import {Injectable} from 'angular2/core';
import {AuthService} from './auth-service';
import {LoginPage} from '../pages/login/login';

/**
 * This is an ugly workaround until `CanActivate` supports DI
 * @see https://github.com/angular/angular/issues/4112
 */

@Injectable()
export class AuthRouteHelper {
  static nav: NavController;
  static auth: AuthService;

  static requireAuth(): boolean {
    console.log("here route helper");
    const { auth, nav } = AuthRouteHelper;
    if (!auth.authenticated) this.nav.push(LoginPage);
    return auth.authenticated;
  }

  constructor(auth: AuthService) {
    AuthRouteHelper.auth = auth;
  }
}