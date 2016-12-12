import { Injectable } from "@angular/core";
import { FieldDropdown } from "./field-dropdown";
import { FieldBase } from "./field-base";
import { FieldTextbox } from "./field-textbox";
import { FieldDatepicker } from "./field-datepicker";
import { FieldCheckbox } from "./field-checkbox";
import { FieldRadiobutton } from "./field-radiobutton";
import { FieldToggle } from "./field-toggle";

@Injectable()
export class FormDataService {
  // Todo: get from a remote source of question metadata
  // Todo: make asynchronous
  getFields(dataModel: any) {
    let fields: FieldBase<any>[] = [
      new FieldTextbox({
        key: "username",
        label: "Name",
        required: true,
        value: dataModel.username,
        placeholder: "Username",
        order: 1
      }),

      new FieldTextbox({
        key: "email",
        label: "Email",
        type: "email",
        required: false,
        value: dataModel.email,
        placeholder: "Email",
        order: 2
      }),

      new FieldDropdown({
        key: "gender",
        label: "Gender",
        required: true,
        options: [
          { key: "", value: "" },
          { key: "male", value: "Male" },
          { key: "female", value: "Female" },
          { key: "shemale", value: "Shemale" }
        ],
        value: dataModel.gender,
        order: 3
      }),

      new FieldDatepicker({
        key: "birthdate",
        label: "Birthdate",
        type: "date",
        required: true,
        value: dataModel.birthdate,
        placeholder: "Birthdate",
        order: 4
      }),

      new FieldCheckbox({
        key: "active",
        label: "Active",
        required: true,
        value: dataModel.active,
        order: 6
      }),

      new FieldRadiobutton({
        key: "size",
        label: "Size",
        required: true,
        options: [
          { key: "small", value: "Small" },
          { key: "medium", value: "Medium" },
          { key: "large", value: "Large" }
        ],
        value: dataModel.size,
        order: 5
      }),
      new FieldToggle({
        key: "allow-access",
        label: "Allow Access",
        required: true,
        value: dataModel.allow,
        order: 7
      })      
    ];
    return fields.sort((a, b) => a.order - b.order);
  }
}
