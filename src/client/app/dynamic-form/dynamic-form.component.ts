import { Component, Input, OnInit, AfterViewInit, OnDestroy, ElementRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldBase } from "./field-base";
import { FieldControlService } from "./field-control.service";

declare const fabric: any;

@Component({
    moduleId: module.id,
    selector: "dynamic-form",
    templateUrl: "dynamic-form.component.html",
    providers: [FieldControlService]
})
export class DynamicFormComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input()
    fields: FieldBase<any>[] = [];
    form: FormGroup;
    submitted: boolean;

    pickaDates: any[] = [];
    radioButtons: any[] = [];

    payLoad = "";

    constructor(private fieldService: FieldControlService, private elementRef: ElementRef) {
        this.submitted = false;
    }

    submitButtonClick(): boolean {
        this.submitted = true;
        return true;
    }

    onSubmit() {
        // submit the from
        this.payLoad = JSON.stringify(this.form.value);
    }

    ngOnInit() {
        this.form = this.fieldService.generateFormGroup(this.fields);
    }

    ngAfterViewInit() {
        this.initializeView();
    }

    ngOnDestroy() {
        // PiackaDate
        // remove event callback
        this.pickaDates.forEach(itm => itm.picker.off("close"));
        this.pickaDates = [];

        // Radiobutton
        this.radioButtons.forEach(itm => itm.removeListeners());
        this.radioButtons = [];

    }

    private initializeView(): void {
        // Textbox
        let TextFieldElements = this.elementRef.nativeElement.querySelectorAll(".ms-TextField");
        for (let i = 0; i < TextFieldElements.length; i++) {
            new fabric["TextField"](TextFieldElements[i]);
        }

        // Button
        let ButtonElements = this.elementRef.nativeElement.querySelectorAll(".ms-Button");
        for (let i = 0; i < ButtonElements.length; i++) {
            new fabric["Button"](ButtonElements[i], function () {
                // Insert Event Here
            });
        }

        // Dropdown
        let DropdownElements = this.elementRef.nativeElement.querySelectorAll(".ms-Dropdown");
        for (let i = 0; i < DropdownElements.length; ++i) {
            let Dropdown = new fabric["Dropdown"](DropdownElements[i]);
            //Dropdown.setValue("female");
        }

        // PickaDate 
        this.pickaDates = [];
        let datePicker = this.elementRef.nativeElement.querySelectorAll(".ms-DatePicker");

        for (let i = 0; i < datePicker.length; i++) {
            let self = this;
            // build the PickaDate
            let pickaDate = new fabric["DatePicker"](datePicker[i], { format: "dd-mmm-yyyy" });
            // get id
            let pickerId: string = datePicker[i].querySelectorAll(".ms-DatePicker-input")[0].id;
            // Set default value
            if (self.form.controls[pickerId].value) {
                pickaDate.picker.set("select", self.form.controls[pickerId].value, { format: "dd-mmm-yyyy" });
            }
            // wire-up event callback
            pickaDate.picker.on({
                close: function () {
                    // set the form value since the two-way binding doesn't work on PickaDate
                    self.form.controls[pickerId].setValue(pickaDate.picker.get("select", "dd-mmm-yyyy"));
                    self.form.controls[pickerId].markAsDirty();
                }
            });
            this.pickaDates.push(pickaDate);
        }

        // Checkbox
        let CheckBoxElements = this.elementRef.nativeElement.querySelectorAll(".ms-CheckBox");
        for (let i = 0; i < CheckBoxElements.length; i++) {
            new fabric['CheckBox'](CheckBoxElements[i]);
        }

        // Radiobutton
        this.radioButtons = [];
        let ChoiceFieldGroupElements = this.elementRef.nativeElement.querySelectorAll(".ms-ChoiceFieldGroup");
        for (let i = 0; i < ChoiceFieldGroupElements.length; i++) {
            let self = this;
            let id: string = ChoiceFieldGroupElements[i].id;
            let choiceFiledGroup = new fabric['ChoiceFieldGroup'](ChoiceFieldGroupElements[i], function (value: string) {
                // console.log("Selected:", value);
                self.form.controls[id].setValue(value);
            });
            choiceFiledGroup.setValue(self.form.controls[id].value);
            this.radioButtons.push(choiceFiledGroup);
        }

        // Toggle
        let ToggleElements = this.elementRef.nativeElement.querySelectorAll(".ms-Toggle");
        for (let i = 0; i < ToggleElements.length; i++) {
            new fabric['Toggle'](ToggleElements[i]);
        }
    }
}