import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { MockDataService, SummaryCardData, ChartDataItem } from '../../services/mock-data.service';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NgxChartsModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  private mockDataService = inject(MockDataService);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  summaryCards$: Observable<SummaryCardData[]> | undefined;
  isLoadingSummary = true;

  monthlyRevenueData$: Observable<ChartDataItem[]> | undefined;
  isLoadingRevenueChart = true;
  expenseDistributionData$: Observable<ChartDataItem[]> | undefined;
  isLoadingExpenseChart = true;

  // ngx-charts options
  // Let view be undefined for ngx-charts to attempt auto-sizing based on container.
  // Alternatively, provide a default that works well and let CSS handle responsiveness of the container.
  barChartView: [number, number] | undefined = undefined; // Using undefined for auto-sizing attempt
  barChartShowXAxis = true;
  barChartShowYAxis = true;
  barChartGradient = false;
  barChartShowLegend = false;
  barChartShowXAxisLabel = true;
  barChartXAxisLabel = 'Month';
  barChartShowYAxisLabel = true;
  barChartYAxisLabel = 'Revenue (USD)';
  barChartColorScheme: Color = {
    name: 'cool',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  pieChartView: [number, number] | undefined = undefined; // Using undefined for auto-sizing attempt
  pieChartGradient = true;
  pieChartShowLegend = true;
  pieChartShowLabels = true;
  pieChartIsDoughnut = false;
  pieChartColorScheme: Color = {
    name: 'vivid',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#3f51b5', '#ff4081', '#4CAF50', '#FFC107', '#795548', '#00BCD4']
  };

  ngOnInit(): void {
    this.loadSummaryCards();
    this.loadMonthlyRevenueChart();
    this.loadExpenseDistributionChart();
  }

  loadSummaryCards(): void {
    this.isLoadingSummary = true;
    this.summaryCards$ = this.mockDataService.getSummaryCardsData().pipe(
      tap(() => this.isLoadingSummary = false)
    );
  }

  loadMonthlyRevenueChart(): void {
    this.isLoadingRevenueChart = true;
    this.monthlyRevenueData$ = this.mockDataService.getMonthlyRevenueData().pipe(
      tap(() => this.isLoadingRevenueChart = false)
    );
  }

  loadExpenseDistributionChart(): void {
    this.isLoadingExpenseChart = true;
    this.expenseDistributionData$ = this.mockDataService.getExpenseDistributionData().pipe(
      tap(() => this.isLoadingExpenseChart = false)
    );
  }
}
