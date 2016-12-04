import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavbarSectionModel, NavbarItemModel } from './navbar.model'
/**
 * This class represents the navigation section.
 */
@Component({
    moduleId: module.id,
    selector: 'navbar-section',
    templateUrl: 'navbar-section.component.html'
})
export class NavbarSectionComponent {
    @Input()
    navbarSection: NavbarSectionModel;
    @Output()
    sectionExpanded: EventEmitter<any> = new EventEmitter();

    get displayName(): string {
        return this.navbarSection.displayName;
    }
    get items(): Array<NavbarItemModel> {
        return this.navbarSection.items;
    }

    get isExpanded(): boolean{
        return this.navbarSection.isExpanded;
    }
    set isExpanded(value: boolean){
        this.navbarSection.isExpanded = value;
    }

    toggleExpand(event: any) {
        if (!this.isExpanded) {
            this.sectionExpanded.emit(event);
        }
        this.isExpanded = !this.isExpanded;
    }

}
