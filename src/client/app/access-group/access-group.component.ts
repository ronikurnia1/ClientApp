import { Component, AfterViewInit, ViewChild, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { BackendService } from '../shared/backend/index';
import { ToastrService } from 'ngx-toastr';

declare const fabric: any;

@Component({
    moduleId: module.id,
    selector: 'content',
    templateUrl: 'access-group.component.html',
    styleUrls: ['access-group.component.css']
})
export class AccessGroupComponent implements OnInit, AfterViewInit, OnDestroy {


    public accessGroups: any[];
    public isAllSelected: boolean;

    private searchBox: any[] = [];
    private dialogComponent: any;

    @ViewChild("ListHeader") listHeader: ElementRef;

    constructor(private backendService: BackendService,
        private toastrService: ToastrService,
        private elementRef: ElementRef) {
        //this.dateValue 
        this.isAllSelected = false;
    }


    toggleAllSelection() {
        // select all
        this.isAllSelected = !this.isAllSelected;
        this.accessGroups.forEach(itm => {
            itm.isSelected = this.isAllSelected;
        });
    }


    toggleSelection(accessGroup: any, event: Event) {
        event.preventDefault();
        event.stopPropagation();
        accessGroup.isSelected = !accessGroup.isSelected;
        // update all selection
        this.isAllSelected = this.accessGroups.every(itm => itm.isSelected);
    }

    get isNoSelection(): boolean {
        if (this.accessGroups)
            return !this.accessGroups.some(a => a.isSelected);
        return true;
    }


    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.backendService.getAccessGroups().subscribe(
            data => {
                //console.log("AccessRole:", data);
                if (data.status == "success") {
                    this.accessGroups = data.payload;
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

        let ListItemElements = this.elementRef.nativeElement.querySelectorAll(".ms-ListItem");
        for (let i = 0; i < ListItemElements.length; i++) {
            new fabric['ListItem'](ListItemElements[i]);
        }
        new fabric['ListItem'](this.listHeader.nativeElement);


        let CommandBarElements = this.elementRef.nativeElement.querySelectorAll(".ms-CommandBar");
        for (let i = 0; i < CommandBarElements.length; i++) {
            new fabric['CommandBar'](CommandBarElements[i]);
        }

        // dialog
        let dialog = this.elementRef.nativeElement.querySelector(".ms-Dialog");
        let actionButtonElements = this.elementRef.nativeElement.querySelectorAll(".ms-Dialog-action");
        let actionButtonComponents = [];
        // Wire up the dialog
        this.dialogComponent = new fabric['Dialog'](dialog);
        // Wire up the buttons
        for (var i = 0; i < actionButtonElements.length; i++) {
            actionButtonComponents[i] = new fabric['Button'](actionButtonElements[i],
                (event: any) => {
                    if (event.srcElement.innerText.trim() === "Yes") {
                        // Delete Access Group
                        let accessGroupIds: string[] = this.accessGroups.filter(itm => itm.isSelected).map(itm => itm.id);
                        this.backendService.unregisterAccessGroup(accessGroupIds).subscribe(data => {
                            if (data.status === "success") {
                                // refresh list
                                this.toastrService.success("Selected Access Group have been removed.", "Unregister success");
                                this.loadData();
                            } else {
                                this.toastrService.warning(data.message, "Unregister failed");
                            }
                        }, error => {
                            // nottify user
                            this.toastrService.error(error.message, "Unregister failed");
                        });
                    }
                });
        }
    }

    // actionHandler(event: any) {
    // }
    openDeleteDialog() {
        // Open the dialog
        this.dialogComponent.open();
    }


    ngOnDestroy() {
        this.searchBox.forEach(sb => sb.setCollapsedListeners());
    }


}

