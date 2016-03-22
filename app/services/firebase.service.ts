import {Injectable} from 'angular2/core'
import * as Firebase from 'firebase'

@Injectable()
export default class FirebaseService {
  rootRef;
  constructor() {
    this.rootRef = new Firebase('https://brilliant-inferno-1044.firebaseio.com')
  }
}