import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../shared/backend/index';
import { ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
import { Field } from '../../shared/dynamic-form/models/field.interface'; import { DynamicFormComponent } from '../../shared/dynamic-form/dynamic-form.component';
import { ToastrService } from 'ngx-toastr';

declare const fabric: any;

@Component({
    moduleId: module.id,
    selector: 'content',
    templateUrl: 'access-group-details.component.html',
    styleUrls: ['access-group-details.component.css']
})
export class AccessGroupDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild(DynamicFormComponent) dynamicInput: DynamicFormComponent;

    public accessGroup: { id: string, name: string, description: string, access: any[] };
    private id: string;
    private sub: any;

    fields: Field[] = [
        {
            key: 'id',
            type: 'hiddenInput',
            name: 'id',
            label: 'id',
            order: 2,
            value: ''
        },
        {
            key: 'name',
            type: 'input',
            label: 'Name',
            name: 'name',
            order: 0,
            placeholder: 'Enter name of Access Group',
            validation: [Validators.required, Validators.minLength(4)]
        },
        {
            key: 'description',
            type: 'input',
            label: 'Description',
            name: 'description',
            order: 1,
            placeholder: 'Enter the description'
        }
    ];

    constructor(
        private backendService: BackendService,
        private elementRef: ElementRef,
        private toastrService: ToastrService,
        private route: ActivatedRoute,
        private router: Router) {
        //this.dateValue 
        this.accessGroup = { id: "", name: "", description: "", access: [] };
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            this.backendService.getAccessGroupById(this.id).subscribe(data => {
                if (data.status == "success") {
                    this.accessGroup = data.payload;

                    this.dynamicInput.setValue('id', this.accessGroup.id);
                    this.dynamicInput.setValue('name', this.accessGroup.name);
                    this.dynamicInput.setValue('description', this.accessGroup.description);

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
            this.dynamicInput.form.value.roles = this.flattenAccessRoles(this.accessGroup.access);
            //console.log("Value:", this.dynamicInput.form.value);
            if (this.id === "new") {
                this.backendService.registerAccessGroup(this.dynamicInput.form.value).subscribe(data => {
                    if (data.status == "success") {
                        this.toastrService.success("Access Group has been registered.", "Register success");
                        this.router.navigate(['/home/settings/access-groups']);
                    } else {
                        this.toastrService.warning(data.message, "Register failed");
                        console.log("Error:", data);
                    }
                }, error => {
                    this.toastrService.warning(error.message, "Register failed");
                    console.log("Error:", error);
                });
            } else {
                this.backendService.updateAccessGroup(this.dynamicInput.form.value).subscribe(data => {
                    if (data.status == "success") {
                        this.toastrService.success("Access Group has been updated.", "Update success");
                        this.router.navigate(['/home/settings/access-groups']);
                    } else {
                        this.toastrService.warning(data.message, "Update failed");
                        console.log("Error:", data);
                    }
                }, error => {
                    this.toastrService.warning(error.message, "Update failed");
                    console.log("Error:", error);
                });
            }

        } else {
            console.log("Data not valid.");
        }
    }

    flattenAccessRoles(roles: any[]): any[] {
        let elements: any[] = [];
        roles.forEach(element => {
            elements.push({
                id: element.id,
                accessGroupId: element.accessGroupId,
                roleId: element.roleId,
                isAccessible: element.isAccessible
            });
            elements = elements.concat(this.flattenAccessRoles(element.children));
        });
        return elements;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}

