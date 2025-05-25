import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';



@NgModule({
  declarations: [
    LanguageSwitcherComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    TranslateModule,
    TranslateService
    LanguageSwitcherComponent
  ]
})
export class SharedModule { }
