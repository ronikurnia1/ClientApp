import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/index';
import { NavbarComponent, NavbarSectionComponent, NavbarItemComponent } from './navbar/index';
import { NameListService } from './name-list/index';
import { AppConfigService } from './app-config/index';
import { AuthCheckerService } from './auth-checker/index';


/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [HeaderComponent, NavbarComponent, NavbarSectionComponent, NavbarItemComponent],
  exports: [HeaderComponent, NavbarComponent, NavbarSectionComponent, NavbarItemComponent,
    CommonModule, FormsModule, RouterModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [NameListService, AppConfigService, AuthCheckerService]
    };
  }
}
