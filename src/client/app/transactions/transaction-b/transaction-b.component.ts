import { Component, ElementRef, AfterViewInit } from '@angular/core';

declare const fabric: any;

/**
 * This class represents the TransactionBComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'content',
  templateUrl: 'transaction-b.component.html',
  styleUrls: ['transaction-b.component.css']
})
export class TransactionBComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef) {

  }
  displayConfig(event: any) {
    let config = JSON.parse(localStorage.getItem("appConfig")) || {};
    let sections: any[] = config.navigations;
    sections.forEach(itm => alert(itm.displayName));
  }

  ngAfterViewInit() {
    let PersonaCardElement = this.elementRef.nativeElement.querySelectorAll(".ms-PersonaCard");
    for (var i = 0; i < PersonaCardElement.length; i++) {
      new fabric.PersonaCard(PersonaCardElement[i]);
    }
  }
}
