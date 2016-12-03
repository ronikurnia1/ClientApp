import { Component } from '@angular/core';

/**
 * This class represents the AdminComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'content',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css']
})
export class AdminComponent {

  displayConfig(event: any) {
    let config = JSON.parse(localStorage.getItem("AppConfig")) || {};
    let sections: any[] = config.moduleGroups;
    sections.forEach(itm => alert(itm.displayName));
  }
}
