import { Component, AfterViewInit } from '@angular/core';
import { BackendService } from '../shared/backend/index';

//declare const fabric: any;

@Component({
    moduleId: module.id,
    selector: 'content',
    templateUrl: 'access-group.component.html',
    styleUrls: ['access-group.component.css']
})
export class AccessGroupComponent implements AfterViewInit {

    public accessRoles: any[];

    constructor(private backendService: BackendService) {
        //this.dateValue 
    }


    toggleSelection(accessGroup: any, event: Event) {
        event.preventDefault();
        event.stopPropagation();
        accessGroup.isSelected = !accessGroup.isSelected;
    }

    // openDetails(accessRole: any, event: Event) {
    //     event.preventDefault();
    //     event.stopPropagation();

        
    //     console.log("Access group:", accessRole.Id);
    // }

    ngAfterViewInit() {

        this.backendService.getAccessGroups().subscribe(
            data => {
                //console.log("AccessRole:", data);
                this.accessRoles = data;
            },
            error => {
                console.log("Error:", error);
                //this.alertService.error(error);
                //this.loading = false;
            });

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


}

