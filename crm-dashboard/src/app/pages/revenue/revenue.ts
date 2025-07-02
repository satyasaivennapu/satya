import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-revenue',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './revenue.html',
  styleUrls: ['./revenue.scss']
})
export class RevenueComponent { }
