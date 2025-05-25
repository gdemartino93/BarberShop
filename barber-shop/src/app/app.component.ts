import { Component, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InstallButtonComponent } from './features/install-button/install-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InstallButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private translate = inject(TranslateService);
  constructor(

  ) {}

  ngOnInit(): void {
    this.translate.use(navigator.language.startsWith('en') ? 'en' : 'it');
  }

}
