import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { BackendService } from '../../shared/backend/index';
import { ActivatedRoute } from '@angular/router';

// declare const fabric: any;

@Component({
    moduleId: module.id,
    selector: 'content',
    templateUrl: 'access-group-details.component.html',
    styleUrls: ['access-group-details.component.css']
})
export class AccessGroupDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

    public accessRole: any[];
    private sub: any;
    public id: string;

    constructor(private backendService: BackendService, private route: ActivatedRoute) {
        //this.dateValue 
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id']; 
            // In a real app: dispatch action to load the details here.
        });
    }


    ngAfterViewInit() {

    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}

