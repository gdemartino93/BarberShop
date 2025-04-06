import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-install-page',
  imports: [NgIf],
  templateUrl: './install-page.component.html',
  styleUrl: './install-page.component.scss'
})
export class InstallPageComponent {
  deferredPrompt: any;
  showInstallButton = false;
  showIosOverlay = false;
  private router = inject(Router);

  constructor() {
    if (this.isInStandaloneMode()) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.isIos() && !this.isInStandaloneMode()) {
      this.showIosOverlay = true;
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallButton = true;
    });
  }

  public closeIosOverlay() {
    this.showIosOverlay = false;
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

  public isIos(): boolean {
    return /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
  }

  public isInStandaloneMode(): boolean {
    return ('standalone' in window.navigator) && Boolean((window.navigator as any).standalone);
  }
}
