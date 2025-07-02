import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips'; // For status tags
import { MatMenuModule } from '@angular/material/menu'; // For task actions
import { MatTooltipModule } from '@angular/material/tooltip';

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'To Do' | 'In Progress' | 'Completed';
  assignee?: string; // Optional
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatMenuModule,
    MatTooltipModule
  ],
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.scss']
})
export class TasksComponent implements OnInit {

  todoTasks: TaskItem[] = [];
  inProgressTasks: TaskItem[] = [];
  completedTasks: TaskItem[] = [];

  mockTasks: TaskItem[] = [
    { id: '1', title: 'Follow up with Client X', description: 'Discuss project proposal and next steps.', dueDate: '2024-07-25', priority: 'High', status: 'To Do', assignee: 'Alice' },
    { id: '2', title: 'Prepare Q3 Financial Report', description: 'Compile all financial data for Q3 review.', dueDate: '2024-07-30', priority: 'High', status: 'In Progress', assignee: 'Bob' },
    { id: '3', title: 'Update Website Homepage', description: 'Implement new hero section design.', dueDate: '2024-07-22', priority: 'Medium', status: 'To Do' },
    { id: '4', title: 'Onboard New Customer - Acme Corp', description: 'Complete onboarding checklist and welcome call.', dueDate: '2024-07-20', priority: 'Medium', status: 'Completed', assignee: 'Alice' },
    { id: '5', title: 'Research New Marketing Tools', description: 'Explore options for email marketing automation.', dueDate: '2024-08-05', priority: 'Low', status: 'To Do', assignee: 'Charlie' },
    { id: '6', title: 'Fix Bug #172 in CRM', description: 'Address customer reported issue with contact form.', dueDate: '2024-07-18', priority: 'High', status: 'Completed', assignee: 'Bob' },
    { id: '7', title: 'Draft Blog Post on Industry Trends', description: 'Content piece for company blog, ~1000 words.', dueDate: '2024-08-01', priority: 'Medium', status: 'In Progress' },
  ];

  constructor() { }

  ngOnInit(): void {
    this.filterTasks();
  }

  filterTasks(): void {
    this.todoTasks = this.mockTasks.filter(task => task.status === 'To Do').sort((a,b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    this.inProgressTasks = this.mockTasks.filter(task => task.status === 'In Progress').sort((a,b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    this.completedTasks = this.mockTasks.filter(task => task.status === 'Completed').sort((a,b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()); // Show newest completed first
  }

  // Placeholder for task actions
  markAsComplete(task: TaskItem): void {
    task.status = 'Completed';
    this.filterTasks();
    // In a real app, update backend
  }

  startProgress(task: TaskItem): void {
    task.status = 'In Progress';
    this.filterTasks();
  }

  moveToToDo(task: TaskItem): void {
    task.status = 'To Do';
    this.filterTasks();
  }

  deleteTask(taskToDelete: TaskItem): void {
    this.mockTasks = this.mockTasks.filter(task => task.id !== taskToDelete.id);
    this.filterTasks();
    // In a real app, update backend
  }

  getPriorityClass(priority: 'High' | 'Medium' | 'Low'): string {
    switch (priority) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return '';
    }
  }
   getPriorityIcon(priority: 'High' | 'Medium' | 'Low'): string {
    switch (priority) {
      case 'High': return 'keyboard_double_arrow_up';
      case 'Medium': return 'keyboard_arrow_up';
      case 'Low': return 'keyboard_arrow_down';
      default: return 'horizontal_rule';
    }
  }
}
