import { Component, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InstallButtonComponent } from './features/install-button/install-button.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  isStandaloneMode = false;
  private translate = inject(TranslateService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  constructor() {
    const platformId = inject(PLATFORM_ID);
    if (isPlatformBrowser(platformId)) {
      this.isStandaloneMode = ('standalone' in navigator && (navigator as any).standalone)
        || window.matchMedia('(display-mode: standalone)').matches;
    }
  }

  ngOnInit(): void {
    this.translate.use(navigator.language.startsWith('en') ? 'en' : 'it');
    if (!isPlatformBrowser(this.platformId)) return;
    const isStandalone =
    (window.matchMedia('(display-mode: standalone)').matches) ||
    ((window.navigator as any).standalone === true); // iOS
    const current = this.router.url;
    if (isStandalone && current === '/') {
      this.router.navigateByUrl('/home');
    } else if (!isStandalone && current === '/') {
      this.router.navigateByUrl('/install');
    }
  }

}
