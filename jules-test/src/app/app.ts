import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './layout/layout'; // Import the layout component

@Component({
  selector: 'app-root',
  standalone: true, // Ensure it's standalone
  imports: [RouterOutlet, LayoutComponent], // Add LayoutComponent here
  template: '<app-layout></app-layout>', // Use LayoutComponent as the main view
  styleUrl: './app.scss'
})
export class App { // Class name is App
  protected title = 'crm-dashboard';
}
