import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Field } from '../shared/dynamic-form/models/field.interface';
import { DynamicFormComponent } from '../shared/dynamic-form/dynamic-form.component';
import { Validators } from '@angular/forms';

/**
 * This class represents the AdminComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'content',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css']
})
export class AdminComponent implements AfterViewInit {
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
