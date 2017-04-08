import { Component, AfterViewInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from "../models/form-field";
import { Field } from "../models/field.interface";

declare const fabric: any;

@Component({
    selector: 'form-input',
    template: `
    <div class="ms-DatePicker" [id]="datePickerId">
        <div class="ms-TextField" [formGroup]="group">
            <label class="ms-Label" [class.is-required]="required" [attr.for]="field.key">{{field.label}}</label>
            <i class="ms-DatePicker-event ms-Icon ms-Icon--Event"></i>
            <input class="ms-TextField-field" type="date" [formControlName]="field.name" [id]="field.key" [placeholder]="field.placeholder"
                [required]="required">
            <div *ngIf="invalid" class="ms-TextField-description">{{field.label}} is required</div>
        </div>
        <div class="ms-DatePicker-monthComponents">
            <span class="ms-DatePicker-nextMonth js-nextMonth"><i class="ms-Icon ms-Icon--ChevronRight"></i></span>
            <span class="ms-DatePicker-prevMonth js-prevMonth"><i class="ms-Icon ms-Icon--ChevronLeft"></i></span>
            <div class="ms-DatePicker-headerToggleView js-showMonthPicker"></div>
        </div>
        <span class="ms-DatePicker-goToday js-goToday">Go to today</span>
        <div class="ms-DatePicker-monthPicker">
            <div class="ms-DatePicker-header">
                <div class="ms-DatePicker-yearComponents">
                    <span class="ms-DatePicker-nextYear js-nextYear"><i class="ms-Icon ms-Icon--ChevronRight"></i></span>
                    <span class="ms-DatePicker-prevYear js-prevYear"><i class="ms-Icon ms-Icon--ChevronLeft"></i></span>
                </div>
                <div class="ms-DatePicker-currentYear js-showYearPicker"></div>
            </div>
            <div class="ms-DatePicker-optionGrid">
                <span class="ms-DatePicker-monthOption js-changeDate" data-month="0">Jan</span>
                <span class="ms-DatePicker-monthOption js-changeDate" data-month="1">Feb</span>
                <span class="ms-DatePicker-monthOption js-changeDate" data-month="2">Mar</span>
                <span class="ms-DatePicker-monthOption js-changeDate" data-month="3">Apr</span>
                <span class="ms-DatePicker-monthOption js-changeDate" data-month="4">May</span>
                <span class="ms-DatePicker-monthOption js-changeDate" data-month="5">Jun</span>
                <span class="ms-DatePicker-monthOption js-changeDate" data-month="6">Jul</span>
                <span class="ms-DatePicker-monthOption js-changeDate" data-month="7">Aug</span>
                <span class="ms-DatePicker-monthOption js-changeDate" data-month="8">Sep</span>
                <span class="ms-DatePicker-monthOption js-changeDate" data-month="9">Oct</span>
                <span class="ms-DatePicker-monthOption js-changeDate" data-month="10">Nov</span>
                <span class="ms-DatePicker-monthOption js-changeDate" data-month="11">Dec</span>
            </div>
        </div>
        <div class="ms-DatePicker-yearPicker">
            <div class="ms-DatePicker-decadeComponents">
                <span class="ms-DatePicker-nextDecade js-nextDecade"><i class="ms-Icon ms-Icon--ChevronRight"></i></span>
                <span class="ms-DatePicker-prevDecade js-prevDecade"><i class="ms-Icon ms-Icon--ChevronLeft"></i></span>
            </div>
        </div>
    </div>
    `
})
export class FormDatePickerComponent extends FormField implements AfterViewInit, OnDestroy {

    private datePicker: any;

    constructor(private viewContainer: ViewContainerRef) {
        super();
    }


    ngOnDestroy() {
        // PiackaDate
        // remove event callback
        this.datePicker.picker.off("close");
    }

    ngAfterViewInit() {
        // PickaDate 
        // console.log("DOM:", this.viewContainer.element.nativeElement);
        let rawDatePicker = this.viewContainer.element.nativeElement.querySelector(".ms-DatePicker");
        // build the PickaDate
        this.datePicker = new fabric["DatePicker"](rawDatePicker, { format: "dd-mmm-yyyy" });
        // get id
        let pickerId: string = rawDatePicker.querySelector(".ms-DatePicker-input").id;
        // Set default value
        if (this.group.controls[pickerId].value) {
            this.datePicker.picker.set("select", this.group.controls[pickerId].value, { format: "dd-mmm-yyyy" });
        }
        // wire-up event callback
        this.datePicker.picker.on({
            close: () => {
                // set the form value since the two-way binding doesn't work on PickaDate
                this.group.controls[pickerId].setValue(this.datePicker.picker.get("select", "dd-mmm-yyyy"));
                this.group.controls[pickerId].markAsDirty();
            }
        });
    }

}