import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { Field } from '../shared/dynamic-form/models/field.interface';
import { DynamicFormComponent } from '../shared/dynamic-form/dynamic-form.component';

@Component({
  moduleId: module.id,
  selector: 'content',
  styleUrls: ["dynamic-form-sample.component.css"],
  templateUrl: 'dynamic-form-sample.component.html'
})
export class DynamicFormSampleComponent implements AfterViewInit {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  fields: Field[] = [
    {
      key: 'fullName',
      type: 'input',
      label: 'Full name',
      name: 'name',
      order: 0,
      value: 'Roni Kurniawan',
      placeholder: 'Enter your name',
      validation: [Validators.required, Validators.minLength(4)]
    },
    {
      key: 'datepicker',
      type: 'datepicker',
      label: 'Date of birth',
      name: 'datepicker',
      order: 1,
      placeholder: 'Date of birth',
      validation: [Validators.required]
    },
    {
      key: 'dropdown',
      order: 2,
      type: 'dropdown',
      label: 'Favourite Food',
      name: 'food',
      options: [{ key: 'key0', value: 'Pizza', selected: false },
      { key: 'key1', value: 'Cofee', selected: false },
      { key: 'key2', value: 'Pasta', selected: true },
      { key: 'key3', value: 'Noddle', selected: false }],
      placeholder: 'Select an option',
      validation: [Validators.required]
    },
    {
      key: 'checkbox',
      type: 'checkbox',
      label: 'Is Active',
      name: 'active',
      order: 3,
      placeholder: '',
      value: true
    },
    {
      key: 'radiobutton',
      type: 'radiobutton',
      label: 'Size',
      name: 'size',
      order: 4,
      options: [{ key: 'small', value: 'Small', selected: false },
      { key: 'medium', value: 'Medium', selected: false },
      { key: 'large', value: 'Large', selected: true },
      { key: 'extra-large', value: 'Extra Large', selected: false }],
      placeholder: '',
      value: 'large'
    },
    {
      key: 'toggle',
      type: 'toggle',
      label: 'Subscription',
      name: 'subscription',
      order: 5,
      placeholder: '',
      value: true
    },
    {
      key: 'submitButton',
      order: 5,
      label: 'Submit',
      name: 'submit',
      type: 'button'
    }
  ];

  ngAfterViewInit() {
    let previousValid = this.form.valid;
    this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        this.form.setDisabled('submit', !previousValid);
      }
    });

    this.form.setDisabled('submit', true);
    //this.form.setValue('name', 'Todd Motto');
  }

  submit(value: { [name: string]: any }) {
    console.log(JSON.stringify(value));
  }
}