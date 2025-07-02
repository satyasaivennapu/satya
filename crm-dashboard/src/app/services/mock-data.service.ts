import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface SummaryCardData {
  title: string;
  value: string;
  icon: string;
  color: 'primary' | 'accent' | 'warn' | string; // Allow custom colors if needed
}

export interface ChartDataItem {
  name: string;
  value: number;
}

export interface MultiSeriesChartDataItem {
  name: string;
  series: ChartDataItem[];
}

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor() { }

  getSummaryCardsData(): Observable<SummaryCardData[]> {
    const summaryCards: SummaryCardData[] = [
      { title: 'Total Revenue', value: '$62,750', icon: 'attach_money', color: 'primary' },
      { title: 'Active Customers', value: '1,380', icon: 'people_outline', color: 'accent' },
      { title: 'Pending Tasks', value: '28', icon: 'assignment_late', color: 'warn' },
      { title: 'New Leads This Month', value: '175', icon: 'new_releases', color: 'primary' }
    ];
    return of(summaryCards).pipe(delay(500)); // Simulate API delay
  }

  getMonthlyRevenueData(): Observable<ChartDataItem[]> {
    // Data for ngx-charts bar chart (single series)
    const monthlyRevenue: ChartDataItem[] = [
      { name: 'Jan', value: 6200 },
      { name: 'Feb', value: 7800 },
      { name: 'Mar', value: 5500 },
      { name: 'Apr', value: 9200 },
      { name: 'May', value: 8500 },
      { name: 'Jun', value: 10500 },
      { name: 'Jul', value: 11200 },
    ];
    return of(monthlyRevenue).pipe(delay(700));
  }

  getExpenseDistributionData(): Observable<ChartDataItem[]> {
    // Data for ngx-charts pie chart
    const expenseData: ChartDataItem[] = [
      { name: 'Marketing', value: 3500 },
      { name: 'Salaries', value: 12000 },
      { name: 'Software', value: 1800 },
      { name: 'Office Supplies', value: 900 },
      { name: 'Utilities', value: 1200 }
    ];
    return of(expenseData).pipe(delay(600));
  }

  // Example for a multi-series chart if needed later
  // getSalesVsExpensesData(): Observable<MultiSeriesChartDataItem[]> {
  //   const data: MultiSeriesChartDataItem[] = [
  //     {
  //       name: 'Sales',
  //       series: [
  //         { name: 'Jan', value: 5000 },
  //         { name: 'Feb', value: 5200 },
  //         { name: 'Mar', value: 4800 },
  //       ]
  //     },
  //     {
  //       name: 'Expenses',
  //       series: [
  //         { name: 'Jan', value: 3000 },
  //         { name: 'Feb', value: 3100 },
  //         { name: 'Mar', value: 2900 },
  //       ]
  //     }
  //   ];
  //   return of(data).pipe(delay(800));
  // }
}
