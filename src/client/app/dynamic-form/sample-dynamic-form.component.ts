import { Component } from "@angular/core";
import { FormDataService } from "./form-data.service";
declare const fabric: any;


@Component({
    moduleId: module.id,
    selector: "content",
    templateUrl: "sample-dynamic-form.component.html",
    styleUrls: ["sample-dynamic-form.component.css"],
    providers: [FormDataService]
})
export class SampleDynamicFormComponent {
    title = "Dynamic Form";
    fields: any[];

    constructor(private service: FormDataService) {
        this.fields = service.getFields({
            size: "large",
            username: "Roni Kurniawan",
            email: "roniku@gmail.com",
            gender: "male",
            birthdate: "21-Dec-2016",
            active: true,
            allow: true
        });
    }

}