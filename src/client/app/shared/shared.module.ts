import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { HeaderComponent } from './header/index';
import { NavbarComponent } from './navbar/index';
import { BackendService } from './backend/index';
import { AuthCheckerService } from './auth-checker/index';
//import { GlobalVarsService } from './global-vars/index';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule, ToastrModule.forRoot()],
  declarations: [HeaderComponent, NavbarComponent],
  exports: [HeaderComponent, NavbarComponent,
    CommonModule, FormsModule, RouterModule, ToastrModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [BackendService, AuthCheckerService]
    };
  }
}
