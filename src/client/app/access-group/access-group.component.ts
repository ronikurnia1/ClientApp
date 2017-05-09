import { Component, AfterViewInit, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { BackendService } from '../shared/backend/index';

declare const fabric: any;

@Component({
    moduleId: module.id,
    selector: 'content',
    templateUrl: 'access-group.component.html',
    styleUrls: ['access-group.component.css']
})
export class AccessGroupComponent implements OnInit, AfterViewInit, OnDestroy {

    public accessRoles: any[];
    private searchBox: any[] = [];


    constructor(private backendService: BackendService, private elementRef: ElementRef) {
        //this.dateValue 
    }


    toggleSelection(accessGroup: any, event: Event) {
        event.preventDefault();
        event.stopPropagation();
        accessGroup.isSelected = !accessGroup.isSelected;
    }

    get isNoSelection(): boolean {
        if (this.accessRoles)
            return !this.accessRoles.some(a => a.isSelected);
        return true;
    }

    registerNewAccessGroup(): void {
        event.stopPropagation();
        event.preventDefault();

    }

    ngOnInit() {
        this.backendService.getAccessGroups().subscribe(
            data => {
                //console.log("AccessRole:", data);
                if (data.status == "success") {
                    this.accessRoles = data.payload;
                }
                else {
                    // display message

                }
            },
            error => {
                console.log("Error:", error);
                //this.alertService.error(error);
                //this.loading = false;
            });
    }

    ngAfterViewInit() {

        let SearchBoxElements = this.elementRef.nativeElement.querySelectorAll(".ms-SearchBox");
        for (let i = 0; i < SearchBoxElements.length; i++) {
            this.searchBox.push(new fabric['SearchBox'](SearchBoxElements[i]));
        }

        // let ListElements = this.elementRef.nativeElement.querySelectorAll(".ms-List");
        // for (let i = 0; i < ListElements.length; i++) {
        //   new fabric['List'](ListElements[i]);
        // }

        let ListItemElements = this.elementRef.nativeElement.querySelectorAll(".ms-ListItem");
        for (let i = 0; i < ListItemElements.length; i++) {
            new fabric['ListItem'](ListItemElements[i]);
        }

        // // Checkbox
        // let CheckBoxElements = this.elementRef.nativeElement.querySelectorAll(".ms-CheckBox");
        // for (let i = 0; i < CheckBoxElements.length; i++) {
        //   new fabric['CheckBox'](CheckBoxElements[i]);
        // }

        let CommandBarElements = this.elementRef.nativeElement.querySelectorAll(".ms-CommandBar");
        for (let i = 0; i < CommandBarElements.length; i++) {
            new fabric['CommandBar'](CommandBarElements[i]);
        }


        // let datePicker = this.elementRef.nativeElement.querySelectorAll(".ms-DatePicker");
        // for (var i = 0; i < datePicker.length; i++) {
        //   this.picker = new fabric['DatePicker'](datePicker[i]);
        // }
        // //this.picker.picker.set('select', [2016, 1, 20]);

        // let buttons = this.elementRef.nativeElement.querySelectorAll(".ms-Button");
        // for (var i = 0; i < buttons.length; i++) {
        //   new fabric['Button'](buttons[i]);
        // }
    }

    ngOnDestroy() {
        this.searchBox.forEach(sb => sb.setCollapsedListeners());
    }


}

