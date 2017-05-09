import {
  Component, ViewChild, Input, ElementRef,
  AfterViewInit, OnInit, AfterViewChecked, AfterContentInit
} from '@angular/core';

declare const fabric: any;

@Component({
  moduleId: module.id,
  selector: 'three-view',
  templateUrl: 'threeview-checkbox.component.html',
  styleUrls: ['threeview-checkbox.component.css'],
})
export class ThreeviewCheckboxComponent implements OnInit, AfterViewInit, AfterContentInit {
  @Input()
  public accessRole: any;
  @ViewChild("CheckBox") checkBoxElement: ElementRef;

  constructor() { }

  public toggle(): void {
    event.stopPropagation();
    event.preventDefault();
    this.accessRole.isCollapsed = !this.accessRole.isCollapsed;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    new fabric['CheckBox'](this.checkBoxElement.nativeElement);

    // Bug: not working at first click
    // Bug workaround: need to click to make it working at
    // the first click
    let clickEvent = new MouseEvent("click", {
      "view": window, bubbles: true,
      cancelable: false
    });
    let element = this.checkBoxElement.nativeElement.querySelector(".ms-CheckBox-field");
    element.dispatchEvent(clickEvent);
    // collapse it
    this.accessRole.isCollapsed = true;
    element = this.checkBoxElement.nativeElement.querySelector(".ms-Label");
    element.dispatchEvent(clickEvent);
  }


  ngAfterContentInit() {
  }

  get isAccessible(): boolean {
    return this.accessRole.isAccessible
  }

  set isAccessible(value: boolean) {
    this.accessRole.isAccessible = value;
  }


}
