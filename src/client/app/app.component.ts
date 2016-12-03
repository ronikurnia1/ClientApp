import { Component, OnInit } from '@angular/core';
import { Config, AppConfigService } from './shared/index';
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

  errorMessage: string;

  constructor(private appConfigService: AppConfigService) {
    console.log('Environment config', Config);
  }

  ngOnInit() {
    this.getAppConfig();
  }

  getAppConfig() {
    this.appConfigService.getConfig()
      .subscribe(
      // TODO: put this when login
      config => localStorage.setItem("AppConfig", JSON.stringify(config)),
      error => this.errorMessage = <any>error
      );
  }


}
