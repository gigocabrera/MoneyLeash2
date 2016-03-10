import {Component, Input} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';

@Component({
  selector: 'advanced-card',
  templateUrl: 'build/pages/advanced-card/advanced-card.html',
  directives: [IONIC_DIRECTIVES]
})
export class AdvancedCard {
  
  @Input() mytitle: string;
  
  constructor() {
    
  }
}