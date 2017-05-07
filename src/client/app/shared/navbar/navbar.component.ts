import { Component, Input } from '@angular/core';
import { Navigation } from './navbar.model';

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'aside',
  templateUrl: 'navbar.component.html',
  //styleUrls: ['navbar.component.css'],
})
export class NavbarComponent {
  @Input()
  public navigations: Array<Navigation>;

  constructor() { }


  public toggle(navigation: Navigation): void {
    //console.log("Navigation:", navigation.displayName);
    //this.navigations.filter(nav => nav.name !== navigation.name).forEach(nav => nav.isExpanded = false);
    navigation.isExpanded = !navigation.isExpanded;
  }


}
