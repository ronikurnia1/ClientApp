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
    templateUrl: 'access-group-details.component.html',
    styleUrls: ['access-group-details.component.css']
})
export class AccessGroupDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild(DynamicFormComponent) dynamicInput: DynamicFormComponent;

    public accessGroup: { id: string, name: string, description: string, access: any[] };
    private id: string;
    private sub: any;

    public accessRole: any;
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
        this.dynamicInput.form.value.access = this.accessGroup.access;
        console.log(this.dynamicInput.form.value);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}

