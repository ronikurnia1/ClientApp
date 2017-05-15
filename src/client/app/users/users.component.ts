import { Component, AfterViewInit, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from '../shared/backend/index';

declare const fabric: any;

@Component({
    moduleId: module.id,
    selector: 'content',
    templateUrl: 'users.component.html',
    styleUrls: ['users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {


    public users: any[];
    private searchBox: any[] = [];
    private dialogComponent: any;


    constructor(private backendService: BackendService,
        private toastrService: ToastrService,
        private elementRef: ElementRef) {
        //this.dateValue 
    }

    showToast() {
        this.toastrService.success("Hello word!", "Confirmation");
    }

    toggleSelection(user: any, event: Event) {
        event.preventDefault();
        event.stopPropagation();
        user.isSelected = !user.isSelected;
    }

    get isNoSelection(): boolean {
        if (this.users)
            return !this.users.some(a => a.isSelected);
        return true;
    }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.backendService.getUsers().subscribe(
            data => {
                //console.log("AccessRole:", data);
                if (data.status == "success") {
                    this.users = data.payload;
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
                    // delete users
                    if (event.srcElement.innerText.trim() === "Yes") {
                        let userIds: string[] = this.users.filter(itm => itm.isSelected).map(itm => itm.id);
                        this.backendService.unregisterUser(userIds).subscribe(data => {
                            if (data.status === "success") {
                                // refresh list
                                this.toastrService.success("Selected user have been removed.", "Unregister success");
                                this.loadData();
                            } else {
                                this.toastrService.warning(data.message, "Unregister failed");
                            }
                        }, error => {
                            // nottify user
                            this.toastrService.warning(error.message, "Unregister failed");
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

