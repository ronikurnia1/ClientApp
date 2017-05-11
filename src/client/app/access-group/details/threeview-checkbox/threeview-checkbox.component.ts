import {
  Component, ViewChild, Input, ElementRef,
  AfterViewInit, OnInit, AfterViewChecked
} from '@angular/core';

declare const fabric: any;

@Component({
  moduleId: module.id,
  selector: 'three-view',
  templateUrl: 'threeview-checkbox.component.html',
  styleUrls: ['threeview-checkbox.component.css'],
})
export class ThreeviewCheckboxComponent implements OnInit, AfterViewInit {
  @Input()
  public accessRole: any;
  @Input()
  public parentAccessRole: any;

  @ViewChild("CheckBox") checkBoxElement: ElementRef;

  private checkBox: any;

  constructor() { }

  public toggleExpansion(): void {
    event.stopPropagation();
    event.preventDefault();
    this.accessRole.isCollapsed = !this.accessRole.isCollapsed;
  }

  public toggleSelection(oldValue: boolean): void {
    event.stopPropagation();
    event.preventDefault();
    this.accessRole.isAccessible = !oldValue;
    console.log(this.accessRole.name + " selection:", this.accessRole.isAccessible);
    // sync children if any
    let children: any[] = this.accessRole.children || [];
    children.forEach(itm => {
      itm.isAccessible = !oldValue;
    });

    // sync parent if any
    if (this.parentAccessRole) {
      let parentChildren: any[] = this.parentAccessRole.children || [];
      this.parentAccessRole.isAccessible = parentChildren.every(itm => itm.isAccessible);
      if (!this.parentAccessRole.isAccessible) {
        if (parentChildren.some(itm => itm.isAccessible)) {
          this.parentAccessRole.isAccessible = null;
        }
      }
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.checkBox = new fabric['CheckBox'](this.checkBoxElement.nativeElement);
    if (this.accessRole.isAccessible == null) {
      this.checkBox.indeterminate();
    }
  }



}
