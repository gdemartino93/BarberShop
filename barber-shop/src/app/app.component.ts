import { isPlatformBrowser, NgIf, NgStyle } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'barber-shop';
  deferredPrompt: any;
  showInstallButton = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      if (this.isIos() && !this.isInStandaloneMode()) {
        this.showInstallButton = true; // O mostra messaggio personalizzato
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
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then(() => {
        this.deferredPrompt = null;
        this.showInstallButton = false;
      });
    }
  }
}
