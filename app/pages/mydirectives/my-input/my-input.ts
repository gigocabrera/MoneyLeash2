//
// Credit: http://almerosteyn.com/2016/04/linkup-custom-control-to-ngcontrol-ngmodel
//
import {Component, Input, Provider, forwardRef, Attribute} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, CORE_DIRECTIVES} from "@angular/common";
import {IONIC_DIRECTIVES} from 'ionic-angular';

const noop = () => {};

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = new Provider(
  NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => MyInput),
    multi: true
  });

//TODO: readonly property in ion-input not working at the moment. come back once fixed
//https://github.com/driftyco/ionic/issues/6408

@Component({
  selector: 'my-input',
  template: `
    <ion-item class="ml-input">
      <i class="{{icon}} ml-fontawesome-left" item-left></i>
      <ion-label stacked *ngIf="_value != undefined">{{title}}</ion-label>
      <ion-input [type]="type" [placeholder]="placeholder" [(ngModel)]="_value" [readonly]="isReadOnly ? 'true' : null" [class.extramargin]="_value == undefined"></ion-input>
      <ion-icon name="arrow-forward" item-right class="ml-chevron-right"></ion-icon>
    </ion-item>
  `,
  directives: [CORE_DIRECTIVES, IONIC_DIRECTIVES],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class MyInput implements ControlValueAccessor {
  
  @Input() title: string = '';
  @Input() placeholder: string = '';
  @Input() icon: string = '';
  @Input() type: string = 'text';
  @Input() isReadOnly:boolean = true;

  constructor() {}

  //The internal data model
  private _value: any = '';

  //Placeholders for the callbacks
  private _onTouchedCallback: () => void = noop;
  
  private _onChangeCallback: (_:any) => void = noop;

  //get accessor
  get value(): any { 
    return this._value; 
  };

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this._onChangeCallback(v);
    }
  }
  
  //Set touched on blur
  onTouched(){
    this._onTouchedCallback();
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    this._value = value;
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

}