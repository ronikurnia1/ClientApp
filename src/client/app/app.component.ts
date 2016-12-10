import { Component, OnInit } from '@angular/core';
import { Config } from './shared/index';
import './operators';

/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'app',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  constructor() {
    console.log('Environment config', Config);
  }

  ngOnInit() {
    
  }

}
