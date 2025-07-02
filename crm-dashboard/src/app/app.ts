import { Component } from '@angular/core';
// RouterOutlet is no longer directly used here, LayoutComponent handles it.
import { LayoutComponent } from './layout/layout'; // Import the layout component

@Component({
  selector: 'app-root',
  standalone: true, // Ensure it's standalone
  imports: [LayoutComponent], // Remove RouterOutlet, LayoutComponent handles its own RouterOutlet
  template: '<app-layout></app-layout>', // Use LayoutComponent as the main view
  styleUrl: './app.scss'
})
export class App { // Class name is App
  protected title = 'crm-dashboard';
}
