import { isPlatformBrowser, NgIf } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-install-button',
  standalone: true,
  imports: [TranslateModule, NgIf],
  templateUrl: './install-button.component.html',
  styleUrls: ['./install-button.component.scss']
})
export class InstallButtonComponent {

  title = 'barber-shop';
  deferredPrompt: any;
  showInstallButton = false;
  showIosInstallOverlay = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService){
  }
  ngOnInit(): void {
    this.translate.use(navigator.language.startsWith('en') ? 'en' : 'it');
    if (isPlatformBrowser(this.platformId)) {
      if (this.isIos() && !this.isInStandaloneMode()) {
        this.showInstallButton = true;
      } else {
        window.addEventListener('beforeinstallprompt', (e) => {
          e.preventDefault();
          this.deferredPrompt = e;
          this.showInstallButton = true;
        });
      }
    }
  }

  public isIos(): boolean {
    return /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
  }

  public isInStandaloneMode(): boolean {
    return ('standalone' in window.navigator) && Boolean((window.navigator as any).standalone);
  }

  public installPWA() {
    if (this.isIos()) {
      this.showIosInstallOverlay = true;
    } else if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then(() => {
        this.deferredPrompt = null;
        this.showInstallButton = false;
      });
    }
  }

  public closeOverlay() {
    this.showIosInstallOverlay = false;
  }
}
