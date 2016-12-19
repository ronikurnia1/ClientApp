import { Component, AfterViewInit, ElementRef } from '@angular/core';

declare const fabric: any;

/**
 * This class represents the TransactionAComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'content',
  templateUrl: 'transaction-a.component.html',
  styleUrls: ['transaction-a.component.css']
})
export class TransactionAComponent implements AfterViewInit {

  settings = {
    columns: {
      id: {
        title: 'ID'
      },
      name: {
        title: 'Full Name'
      },
      username: {
        title: 'User Name'
      },
      email: {
        title: 'Email'
      }
    }
  };
  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    let SearchBoxElements = this.elementRef.nativeElement.querySelectorAll(".ms-SearchBox");
    for (let i = 0; i < SearchBoxElements.length; i++) {
      new fabric['SearchBox'](SearchBoxElements[i]);
    }
  }

}
