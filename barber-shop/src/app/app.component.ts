import { isPlatformBrowser, NgIf, NgStyle } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf, NgStyle],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'barber-shop';
  deferredPrompt: any;
  showInstallButton = false;
  showIosInstallOverlay = false;
  touchStartY: number = 0;
  touchCurrentY: number = 0;
  dragTransform: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
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

  public onTouchStart(event: TouchEvent) {
    this.touchStartY = event.touches[0].clientY;
    this.dragTransform = '';
  }

  public onTouchMove(event: TouchEvent) {
    this.touchCurrentY = event.touches[0].clientY;
    const deltaY = this.touchCurrentY - this.touchStartY;
    if (deltaY > 0) {
      this.dragTransform = `translateY(${deltaY}px)`;
    }
  }

  public onTouchEnd(event: TouchEvent) {
    const deltaY = this.touchCurrentY - this.touchStartY;
    if (deltaY > 100) {
      this.closeOverlay(); // Swipe down = chiudi
    } else {
      this.dragTransform = 'translateY(0)'; // Ritorna alla posizione originale
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
