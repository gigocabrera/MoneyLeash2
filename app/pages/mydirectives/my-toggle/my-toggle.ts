//
// Credit: http://almerosteyn.com/2016/04/linkup-custom-control-to-ngcontrol-ngmodel
//
import {Component, Input, Output, EventEmitter, Provider, forwardRef, Attribute} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, CORE_DIRECTIVES} from "@angular/common";
import {IONIC_DIRECTIVES} from 'ionic-angular';

const noop = () => {};

const CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR = new Provider(
  NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => MyToggle),
    multi: true
  });

@Component({
  selector: 'my-toggle',
  template: `
    <ion-item class="ml-input">
      <i class="{{icon}} ml-fontawesome-left" item-left></i>
      <ion-label>{{title}}</ion-label>
      <ion-toggle secondary [(ngModel)]="_value" [attr.aria-checked]="_checked"></ion-toggle>
    </ion-item>
  `,
  directives: [CORE_DIRECTIVES, IONIC_DIRECTIVES],
  providers: [CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR]
})

export class MyToggle implements ControlValueAccessor{
  
  @Input() title: string = '';
  @Input() icon: string = '';  

  //The internal data model
  private _value: any = '';
  private _checked: boolean = false;
  private _init: boolean;
  private _fn: Function;
  private _activated: boolean = false;
  private _startX: number;

  //Set touched on blur
  onTouched(){}

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this._checked = v;
    }
  }

  //From ControlValueAccessor interface
  writeValue(val: any) {
    this._setChecked(val);
    this._value = val;
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: Function): void {
    this._fn = fn;
    this.onChange = (isChecked: boolean) => {
      console.debug('toggle, onChange', isChecked);
      fn(isChecked);
      this._setChecked(isChecked);
      this.onTouched();
    };
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) { this.onTouched = fn; }


  @Input()
  get checked(): boolean {
    return this._checked;
  }

  set checked(val: boolean) {
    this._setChecked(val);
    this.onChange(this._checked);
  }

  private _setChecked(isChecked: boolean) {
    if (isChecked !== this._checked) {
      this._checked = isChecked;
      if (this._init) {
        console.log("tres");
      }
    }
  }
  
  /**
   * @private
   */
  onChange(isChecked: boolean) {
    // used when this input does not have an ngModel or ngControl
    console.log('toggle, onChange (no ngModel)', isChecked);
    this._setChecked(isChecked);
    this.onTouched();
  }

  ngAfterContentInit() {
    this._init = true;
  }

  /**
   * @private
   */
  ngOnDestroy() {
    
  }


}