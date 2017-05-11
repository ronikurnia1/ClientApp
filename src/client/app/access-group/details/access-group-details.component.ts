import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../shared/backend/index';
import { ActivatedRoute } from '@angular/router';

declare const fabric: any;

@Component({
    moduleId: module.id,
    selector: 'content',
    templateUrl: 'access-group-details.component.html',
    styleUrls: ['access-group-details.component.css']
})
export class AccessGroupDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

    public accessGroup: { id: string, name: string, description: string, access: any[] };
    private id: string;
    private sub: any;

    public accessRole: any;

    constructor(
        private backendService: BackendService,
        private elementRef: ElementRef,
        private route: ActivatedRoute,
        private router: Router) {
        //this.dateValue 
        this.accessGroup = { id: "", name: "", description: "", access: [] };
    }

    setCheckbox() {

    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            this.backendService.getAccessGroupById(this.id).subscribe(data => {
                if (data.status == "success") {
                    this.accessGroup = data.payload;
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

        // this.checkBox = new fabric['CheckBox'](this.checkBoxElement.nativeElement);
        // this.realCheckBoxElement.nativeElement.indeterminate = true;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}

