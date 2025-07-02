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
    .pipe(map(result => result.matches), shareReplay());

  summaryCards$: Observable<SummaryCardData[]> | undefined;
  isLoadingSummary = true;

  monthlyRevenueData$: Observable<ChartDataItem[]> | undefined;
  isLoadingRevenueChart = true;
  expenseDistributionData$: Observable<ChartDataItem[]> | undefined;
  isLoadingExpenseChart = true;

  // Bar Chart Config
  barChartView: [number, number] = [undefined as any, 360];
  barChartColorScheme: Color = {
    name: 'pastel',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#3f51b5', '#00bcd4', '#8bc34a', '#ff9800', '#9c27b0']
  };

  // Pie Chart Config
  pieChartView: [number, number] = [undefined as any, 320];
  pieChartColorScheme: Color = {
    name: 'bright',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#3f51b5', '#00bcd4', '#8bc34a', '#ff9800', '#9c27b0', '#ff4081']
  };
  pieChartGradient = true;
  pieChartShowLegend = true;
  pieChartShowLabels = true;
  pieChartIsDoughnut = true;

  ngOnInit(): void {
    this.loadSummaryCards();
    this.loadMonthlyRevenueChart();
    this.loadExpenseDistributionChart();
  }

  loadSummaryCards(): void {
    this.isLoadingSummary = true;
    this.summaryCards$ = this.mockDataService.getSummaryCardsData()
      .pipe(tap(() => this.isLoadingSummary = false));
  }

  loadMonthlyRevenueChart(): void {
    this.isLoadingRevenueChart = true;
    this.monthlyRevenueData$ = this.mockDataService.getMonthlyRevenueData()
      .pipe(tap(() => this.isLoadingRevenueChart = false));
  }

  loadExpenseDistributionChart(): void {
    this.isLoadingExpenseChart = true;
    this.expenseDistributionData$ = this.mockDataService.getExpenseDistributionData()
      .pipe(tap(() => this.isLoadingExpenseChart = false));
  }
}
