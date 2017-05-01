import { Component, OnInit, OnDestroy } from '@angular/core';
import { Navigation } from '../shared/navbar/navbar.model';
import { Router, NavigationEnd } from '@angular/router';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {

  public navigations: Array<Navigation>;
  private routerSubscriber: any;
  /**
   * Creates an instance of the HomeComponent
   */
  constructor(private router: Router) {
  }

  ngOnInit() {
    this.subscribeRouter();
    this.getAppConfiguration();
  }

  getAppConfiguration() {
    // get app modules from localStorage
    let appConfig: any = JSON.parse(localStorage.getItem("appConfig")) || {};
    let navigations: any[] = appConfig.navigations || [];    
    // this.navigations = navigations.filter(itm => itm.hidden === false)
    //   .sort(function (a, b) { return a.order - b.order }).map(this.createNavigation);
    this.navigations = navigations.sort(function (a, b) { return a.order - b.order }).map(this.createNavigation);      
  }

  private createNavigation(item: any): Navigation {
    return new Navigation(item.name, item.displayName, item.path,
      item.longPath, item.order, item.hidden, item.icon, 18, item.children);
  }

  ngOnDestroy() {
    //console.log("unsubscribe");
    this.routerSubscriber.unsubscribe();
  }


  private subscribeRouter(): void {
    // subscribe to Router event: NavigationEnd
    // to determine which navigation should expand/collapse
    //console.log("subscribe:", this);
    this.routerSubscriber = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        //console.log("Route:", event.url);
        // find section based on url
        let path: string = event.url == "/" ? "/home" : event.url;
        this.findUrlOnNavigations(null, this.navigations, path);
      }
    });
  }

  private findUrlOnNavigations(parent: Navigation, navigations: Array<Navigation>, url: string): void {
    navigations.forEach(itm => {
      itm.isExpanded = false;
      if (itm.children.length > 0) {
        this.findUrlOnNavigations(itm, itm.children, url);
      } else {
        if (itm.longPath == url && parent) {
          // console.log("url: " + url + " " + itm.longPath);
          // expand navigation
          parent.isExpanded = true;
          return;
        } 
      }
    });
  }


}
