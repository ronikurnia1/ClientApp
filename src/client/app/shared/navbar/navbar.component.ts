import { Component, OnInit } from '@angular/core';
import { ModuleListService } from '../module-list/index';
/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'side-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  errorMessage: string;
  modules: any[] = [];

  constructor(public moduleListService: ModuleListService) { }

  ngOnInit() {
    this.getModules();
  }

  getModules() {
    this.moduleListService.get()
      .subscribe(
      modules => this.modules = modules,
      error => this.errorMessage = <any>error
      );
  }


}
