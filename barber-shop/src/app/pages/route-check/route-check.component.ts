import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-route-check',
  imports: [],
  templateUrl: './route-check.component.html',
  styleUrl: './route-check.component.scss'
})
export class RouteCheckComponent {
  private router = inject(Router);

  constructor() {
    if (this.isStandaloneMode()) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/install']);
    }
  }

  private isStandaloneMode(): boolean {
    return ('standalone' in window.navigator) && Boolean((window.navigator as any).standalone);
  }
}
