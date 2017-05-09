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
    this.accessRole.isCollapsed = !this.accessRole.isCollapsed;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    new fabric['CheckBox'](this.checkBoxElement.nativeElement);
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
