import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './expenses.html',
  styleUrls: ['./expenses.scss']
})
export class ExpensesComponent { }
