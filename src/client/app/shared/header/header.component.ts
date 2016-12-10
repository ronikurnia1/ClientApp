import { Component, AfterViewInit, ElementRef } from '@angular/core';


declare const fabric: any;
/**
 * This class represents the header component.
 */
@Component({
  moduleId: module.id,
  selector: 'header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements AfterViewInit {

  constructor(private element: ElementRef) {

  }
  ngAfterViewInit() {
    // let CommandBarElements = this.element.nativeElement.querySelectorAll(".ms-CommandBar");
    // for (var i = 0; i < CommandBarElements.length; i++) {
    //   new fabric['CommandBar'](CommandBarElements[i]);
    // }


    let ContextualMenuElement = this.element.nativeElement.querySelector(".ms-ContextualMenu-basic .ms-ContextualMenu");
    let ButtonElement = this.element.nativeElement.querySelector(".ms-ContextualMenu-basic .Header-button");
    let contextualMenu = new fabric['ContextualMenu'](ContextualMenuElement, ButtonElement);

  }

}


