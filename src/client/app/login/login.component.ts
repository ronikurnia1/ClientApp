import { Component, AfterViewInit, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../shared/authentication/index';

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
export class LoginComponent implements AfterViewInit, OnInit {
  model: any = {};
  loading: boolean = false;
  returnUrl: string = "";


  private errorMessage: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authentication: AuthenticationService,
    private elementRef: ElementRef) { }

  login(event: any) {
    this.loading = true;
    this.authentication.login(this.model.username, this.model.password)
      .subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
        console.log("Error:", error);
        //this.alertService.error(error);
        this.loading = false;
      });
  }


  ngOnInit() {
    // reset login status
    this.authentication.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.params['returnUrl'] || 'home';
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
