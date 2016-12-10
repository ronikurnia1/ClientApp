import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarModel } from './navbar.model';
import { Router, NavigationEnd } from '@angular/router';

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'aside',
  templateUrl: 'navbar.component.html',
  //styleUrls: ['navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  public navbar: NavbarModel;
  sub: any;

  constructor(router: Router) {
    this.sub = router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        //console.log("Route:", event.url);
        // find section based on url
        let path: string = event.url == "/" ? "/home" : event.url;
        //console.log("Route:", path);
        this.navbar.sections.forEach(sec => {
          if (sec.items.some(itm => itm.longPath == path)) {
            this.navbar.expandSection(sec.displayName);
            return;
          }
        });
      }
    });
  }

  ngOnInit() {
    this.getAppModuleGroups();
  }

  ngOnDestroy() {
    //ßconsole.log("unsubscribe");
    this.sub.unsubscribe();
  }

  getAppModuleGroups() {
    // get app modules from localStorage
    let appConfig: any = JSON.parse(localStorage.getItem("appConfig")) || {};
    this.navbar = new NavbarModel(appConfig.moduleGroups);
  }

}
