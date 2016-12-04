import { Component, OnInit } from '@angular/core';
import { NavbarModel } from './navbar.model';

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'aside',
  templateUrl: 'navbar.component.html',
  //styleUrls: ['navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  navbar: NavbarModel;

  ngOnInit() {
    this.getAppModuleGroups();
  }

  getAppModuleGroups() {
    // get app modules from localStorage
    let appConfig: any = JSON.parse(localStorage.getItem("AppConfig")) || {};
    this.navbar = new NavbarModel(appConfig.moduleGroups);
  }

  get sections() {
    return this.navbar.sections;
  }

  collapseAllSection(event: any) {
    this.navbar.collapseAllSection();
  }

}
