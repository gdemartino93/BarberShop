import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-install-page',
  imports: [NgIf],
  templateUrl: './install-page.component.html',
  styleUrl: './install-page.component.scss'
})
export class InstallPageComponent {
  deferredPrompt: any;

  constructor() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
    });
  }

  installPWA() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then(() => {
        this.deferredPrompt = null;
      });
    }
  }

  isIos(): boolean {
    return /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
  }

  isInStandaloneMode(): boolean {
    return ('standalone' in window.navigator) && Boolean((window.navigator as any).standalone);
  }
}
