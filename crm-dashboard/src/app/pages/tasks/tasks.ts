import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.scss']
})
export class TasksComponent { }
