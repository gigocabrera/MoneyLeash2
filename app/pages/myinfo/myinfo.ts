import {Page} from 'ionic-angular';
import {AdvancedCard} from '../advanced-card/advanced-card';

@Page({
  templateUrl: 'build/pages/myinfo/myinfo.html',
  directives: [AdvancedCard]
})
export class MyInfoPage {
  contructor() {
  }
}