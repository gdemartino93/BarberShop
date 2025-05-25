import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-redirect-page',
  imports: [],
  templateUrl: './redirect-page.component.html',
  styleUrl: './redirect-page.component.scss'
})
export class RedirectPageComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const isStandalone =
      ('standalone' in navigator && (navigator as any).standalone) ||
      window.matchMedia('(display-mode: standalone)').matches;

    // Evita loop: se sei già su /install o /home non reindirizzare
    const current = this.router.url;
    if (isStandalone && current !== '/home') {
      this.router.navigateByUrl('/home');
    } else if (!isStandalone && current !== '/install') {
      this.router.navigateByUrl('/install');
    }
  }

}
