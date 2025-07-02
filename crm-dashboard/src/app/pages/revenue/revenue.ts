import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
// MockDataService could be used here if more complex data is needed,
// but for now, simple mock data within the component is fine.

export interface RevenueEntry {
  date: string;
  description: string;
  amount: number;
  category: string;
}

@Component({
  selector: 'app-revenue',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './revenue.html',
  styleUrls: ['./revenue.scss']
})
export class RevenueComponent implements OnInit {
  totalRevenue: number = 0;
  displayedColumns: string[] = ['date', 'description', 'category', 'amount'];
  revenueData: RevenueEntry[] = [];

  mockRevenueEntries: RevenueEntry[] = [
    { date: '2024-07-01', description: 'Invoice #1023 - Client X', amount: 1200.50, category: 'Consulting' },
    { date: '2024-07-03', description: 'Product Sale - Item A (5 units)', amount: 499.95, category: 'Product Sales' },
    { date: '2024-07-05', description: 'Service Subscription - Basic Plan', amount: 49.99, category: 'Recurring' },
    { date: '2024-07-10', description: 'Invoice #1024 - Client Y', amount: 850.00, category: 'Consulting' },
    { date: '2024-07-12', description: 'Affiliate Commission', amount: 120.75, category: 'Other Income' },
    { date: '2024-07-15', description: 'Product Sale - Item B (2 units)', amount: 199.98, category: 'Product Sales' },
  ];

  constructor() { }

  ngOnInit(): void {
    this.revenueData = this.mockRevenueEntries;
    this.totalRevenue = this.revenueData.reduce((sum, entry) => sum + entry.amount, 0);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }
}
