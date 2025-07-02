import { Component, inject, ViewChild, OnDestroy } from '@angular/core'; // Added ViewChild, OnDestroy
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav'; // Import MatSidenav
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs'; // Import Subscription
import { map, shareReplay, take } from 'rxjs/operators'; // Import take

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule, // Required for routerLink in template
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss']
})
export class LayoutComponent implements OnDestroy { // Implement OnDestroy
  @ViewChild('sidenav') sidenav!: MatSidenav; // Get reference to sidenav

  private breakpointObserver = inject(BreakpointObserver);
  private handsetSubscription: Subscription | undefined;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  // Method to handle sidenav close on click
  handleLinkClick(): void {
    // Subscribe to isHandset$ to get its current value and then close sidenav
    // take(1) ensures the subscription automatically completes after one emission.
    this.handsetSubscription = this.isHandset$.pipe(take(1)).subscribe(isHandset => {
      if (isHandset && this.sidenav) { // Check if sidenav is defined
        this.sidenav.close();
      }
    });
  }

  ngOnDestroy(): void {
    // Clean up the subscription when the component is destroyed
    // This is good practice, though take(1) usually handles its own completion.
    this.handsetSubscription?.unsubscribe();
  }
}
