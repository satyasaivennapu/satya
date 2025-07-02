import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout'; // your main layout component

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent],
  template: '<app-layout></app-layout>',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'crm-dashboard';

  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }
}
