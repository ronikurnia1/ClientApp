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
    public navbarSection: NavbarSectionModel;
    @Output()
    sectionExpanded: EventEmitter<string> = new EventEmitter();

    toggleExpand(section: string) {
        if (!this.navbarSection.isExpanded) {
            this.sectionExpanded.emit(section);
        } else {
            this.sectionExpanded.emit("");
        }
        //this.navbarSection.isExpanded = !this.navbarSection.isExpanded;
    }

}
