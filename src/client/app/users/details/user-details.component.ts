import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../shared/backend/index';
import { ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
import { Field } from '../../shared/dynamic-form/models/field.interface'; import { DynamicFormComponent } from '../../shared/dynamic-form/dynamic-form.component';
declare const fabric: any;

@Component({
    moduleId: module.id,
    selector: 'content',
    templateUrl: 'user-details.component.html',
    styleUrls: ['user-details.component.css']
})
export class UserDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild(DynamicFormComponent) dynamicInput: DynamicFormComponent;

    public user: any;
    private id: string;
    private sub: any;

    public accessGroup: any;
    fields: Field[] = [
        {
            key: 'id',
            type: 'hiddenInput',
            name: 'id',
            label: 'id',
            order: 0,
            value: ''
        },
        {
            key: 'userName',
            type: 'input',
            label: 'User Name',
            name: 'userName',
            order: 1,
            placeholder: 'Enter user name',
            validation: [Validators.required, Validators.minLength(4)]
        },
        {
            key: 'fullName',
            type: 'input',
            label: 'Full Name',
            name: 'fullName',
            order: 2,
            placeholder: 'Enter the user full name'
        },
        {
            key: 'email',
            type: 'input',
            label: 'Email Address',
            name: 'email',
            order: 3,
            placeholder: 'Enter valid email address'
        },
        {
            key: 'password',
            type: 'input',
            label: 'Password',
            name: 'password',
            order: 4,
            placeholder: 'Input password'
        },
        {
            key: 'confirmPassword',
            type: 'input',
            label: 'Confirm Password',
            name: 'confirmPassword',
            order: 5,
            placeholder: 'Input password confirm'
        }
    ];

    constructor(
        private backendService: BackendService,
        private elementRef: ElementRef,
        private route: ActivatedRoute,
        private router: Router) {
        //this.dateValue 
        this.accessGroup = {};
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            this.backendService.getUserById(this.id).subscribe(data => {
                if (data.status == "success") {
                    this.user = data.payload;

                    this.dynamicInput.setValue('id', this.user.id);
                    this.dynamicInput.setValue('userName', this.user.userName);
                    this.dynamicInput.setValue('fullName', this.user.fullName);

                }
                else {
                    //notify user
                    this.router.navigate(["/home/page-not-found"]);
                }
            }, err => {
                // notify user
            });
        });
    }


    ngAfterViewInit() {
        let CommandBarElements = this.elementRef.nativeElement.querySelectorAll(".ms-CommandBar");
        for (let i = 0; i < CommandBarElements.length; i++) {
            new fabric['CommandBar'](CommandBarElements[i]);
        }

        let previousValid = this.dynamicInput.valid;
        this.dynamicInput.changes.subscribe(() => {
            if (this.dynamicInput.valid !== previousValid) {
                previousValid = this.dynamicInput.valid;
                //this.form.setDisabled('submit', !previousValid);
            }
        });
        //this.form.setDisabled('submit', true);
    }


    submitForm() {
        if (this.dynamicInput.valid) {
            //console.log("Value:", this.dynamicInput.form.value);
            if (this.id === "new") {
                this.backendService.registerUser(this.dynamicInput.form.value).subscribe(data => {
                    if (data.status == "success") {
                        this.router.navigate(['/home/settings/users']);
                    } else {
                        console.log("Error:", data);
                    }
                }, error => {
                    console.log("Error:", error);
                });
            } else {
                this.backendService.updateUser(this.dynamicInput.form.value).subscribe(data => {
                    if (data.status == "success") {
                        this.router.navigate(['/home/settings/users']);
                    } else {
                        console.log("Error:", data);
                    }
                }, error => {
                    console.log("Error:", error);
                });
            }

        } else {
            console.log("Data not valid.");
        }
    }


    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}

