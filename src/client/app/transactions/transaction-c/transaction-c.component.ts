import { Component, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';


declare const fabric: any;

/**
 * This class represents the TransactionCComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'content',
  templateUrl: 'transaction-c.component.html',
  styleUrls: ['transaction-c.component.css']
})
export class TransactionCComponent implements AfterViewInit, OnDestroy {
  private searchBox: any[] = [];

  constructor(private elementRef: ElementRef) { }

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

    let PanelExamples = this.elementRef.nativeElement.getElementsByClassName("ms-PanelExample");

    for (let i = 0; i < PanelExamples.length; i++) {
      (function () {
        let PanelExampleButton = PanelExamples[i].querySelector(".ms-Button");
        let PanelExamplePanel = PanelExamples[i].querySelector(".ms-Panel");
        PanelExampleButton.addEventListener("click", function (i: any) {
          new fabric['Panel'](PanelExamplePanel);
        });
      } ());
    }

  }

  ngOnDestroy() {
    this.searchBox.forEach(sb => sb.setCollapsedListeners());
  }

}
