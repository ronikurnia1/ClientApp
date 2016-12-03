import { Component, Input } from '@angular/core';
/**
 * This class represents the navigation detail
 */
@Component({
  moduleId: module.id,
  selector: 'navbar-detail',
  templateUrl: 'navbar-detail.component.html',
  //styleUrls: ['navbar.component.css'],
})
export class NavbarDetailComponent {

  @Input()
  modules: any[] = [];
  constructor() { }

}
