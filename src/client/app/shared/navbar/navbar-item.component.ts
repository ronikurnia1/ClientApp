import { Component, Input } from '@angular/core';
import { NavbarItemModel } from './navbar.model';

/**
 * This class represents the navigation item.
 */
@Component({
    moduleId: module.id,
    selector: 'navbar-item',
    templateUrl: 'navbar-item.component.html'
})
export class NavbarItemComponent {
    @Input()
    item: NavbarItemModel;

    get displayName(): string {
        return this.item.displayName;
    }
    get path(): string {
        return this.item.path;
    }
}
