import { Component, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
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

    constructor(private backendService: BackendService,
        private elementRef: ElementRef,
        private route: ActivatedRoute) {
        //this.dateValue 
        this.accessGroup = { id: "", name: "", description: "", access: [] };
    }

    setCheckbox() {
        let rawCheckBoxs = this.elementRef.nativeElement.querySelectorAll(".ms-CheckBox");
        for (let i = 0; i < rawCheckBoxs.length; i++) {
            new fabric['CheckBox'](rawCheckBoxs[i]);
        }
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
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}

