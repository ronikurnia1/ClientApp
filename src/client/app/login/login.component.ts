import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

declare const fabric: any;

/**
 * This class represents the AdminComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements AfterViewInit {

  constructor(private router: Router, private elementRef: ElementRef) {

  }

  login(event: any) {
    this.router.navigate(["home"]);
  }

  ngAfterViewInit() {
    let TextFieldElements = this.elementRef.nativeElement.querySelectorAll(".ms-TextField");
    for (var i = 0; i < TextFieldElements.length; i++) {
      new fabric['TextField'](TextFieldElements[i]);
    }

    let ButtonElements = this.elementRef.nativeElement.querySelectorAll(".ms-Button");
    for (var i = 0; i < ButtonElements.length; i++) {
      new fabric['Button'](ButtonElements[i], function () {
        // Insert Event Here
      });
    }
  }

}
