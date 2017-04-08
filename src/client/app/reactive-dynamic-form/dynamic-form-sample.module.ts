import { NgModule } from "@angular/core";

import { DynamicFormSampleComponent } from "./dynamic-form-sample.component";
import { DynamicFormSampleRoutingModule } from "./dynamic-form-sample-routing.module";
import { DynamicFormModule } from "../shared/dynamic-form/dynamic-form.module";

@NgModule({
    imports: [DynamicFormSampleRoutingModule, DynamicFormModule],
    declarations: [DynamicFormSampleComponent],
    exports: [DynamicFormSampleComponent]
})
export class DynamicFormSampleModule {

}
