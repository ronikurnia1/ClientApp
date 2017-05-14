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

    private id: string;
    private sub: any;

    public isNew: boolean = false;
    public user: any = {};
    public fields: Field[] = [
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
            type: 'password',
            label: 'Password',
            name: 'password',
            order: 4,
            placeholder: 'Input password'
        },
        {
            key: 'confirmPassword',
            type: 'password',
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
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            if (this.id == "new") {
                // hide password
                this.isNew = true;
            }
            this.backendService.getUserById(this.id).subscribe(data => {
                if (data.status == "success") {
                    this.user = data.payload;
                    this.dynamicInput.setValue('id', this.user.id);
                    this.dynamicInput.setValue('userName', this.user.userName);
                    this.dynamicInput.setValue('fullName', this.user.fullName);
                    this.dynamicInput.setValue("email", this.user.email);
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

        let checkBoxElements = this.elementRef.nativeElement.querySelectorAll(".ms-CheckBox");
        for (let i = 0; i < checkBoxElements.length; i++) {
            new fabric['CheckBox'](checkBoxElements[i]);
        }

        let previousValid = this.dynamicInput.valid;
        this.dynamicInput.changes.subscribe(() => {
            if (this.dynamicInput.valid !== previousValid) {
                previousValid = this.dynamicInput.valid;
            }
        });
    }

    toggleCheckBox(group: any) {
        group.isAccessible = !group.isAccessible;
    }


    submitForm() {
        if (this.dynamicInput.valid) {
            let userData = { user: this.dynamicInput.value, password: "123RtYtreW43@1" };
            userData.user.accessGroups = this.user.accessGroups;
            if (this.id === "new") {
                this.backendService.registerUser(userData).subscribe(data => {
                    if (data.status == "success") {
                        this.router.navigate(['/home/settings/users']);
                    } else {
                        console.log("Error:", data);
                    }
                }, error => {
                    console.log("Error:", error);
                });
            } else {
                this.backendService.updateUser(userData.user).subscribe(data => {
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

