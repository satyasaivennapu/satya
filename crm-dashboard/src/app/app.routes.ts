import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { RevenueComponent } from './pages/revenue/revenue';
import { ExpensesComponent } from './pages/expenses/expenses';
import { TasksComponent } from './pages/tasks/tasks';
import { CustomersComponent } from './pages/customers/customers';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, title: 'Dashboard' },
  { path: 'revenue', component: RevenueComponent, title: 'Revenue' },
  { path: 'expenses', component: ExpensesComponent, title: 'Expenses' },
  { path: 'tasks', component: TasksComponent, title: 'Tasks' },
  { path: 'customers', component: CustomersComponent, title: 'Customers' },
  // Add a wildcard route for 404 if needed
  // { path: '**', redirectTo: 'dashboard' } // Or a dedicated 404 component
];
