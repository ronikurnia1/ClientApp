import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '../app-config/index';
import { NavbarDetailComponent } from './navbar-detail.component';
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

  moduleGroups: any[] = [];
  isExpanded: boolean = false;

  constructor(public appConfigService: AppConfigService) { }

  ngOnInit() {
    this.getAppModuleGroups();
  }

  getAppModuleGroups() {
    // get app modules from localStorage
    let appConfig: any = JSON.parse(localStorage.getItem("AppConfig")) || {};
    this.moduleGroups = appConfig.moduleGroups;
  }
  
  toggleExpand(event: any){
    this.isExpanded = !this.isExpanded;
  }

}
