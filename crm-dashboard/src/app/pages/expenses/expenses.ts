import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // Required for MatDatepicker
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // For potential "Add Expense" form

export interface ExpenseEntry {
  date: string;
  description: string;
  amount: number;
  category: string;
  receipt?: string; // Optional link to a receipt
}

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './expenses.html',
  styleUrls: ['./expenses.scss']
})
export class ExpensesComponent implements OnInit {
  totalExpenses: number = 0;
  displayedColumns: string[] = ['date', 'description', 'category', 'amount', 'actions'];
  expenseData: ExpenseEntry[] = [];
  showAddExpenseForm = false;
  expenseForm: FormGroup;

  mockExpenseEntries: ExpenseEntry[] = [
    { date: '2024-07-02', description: 'Software Subscription - IDE', amount: 29.99, category: 'Software' },
    { date: '2024-07-04', description: 'Office Supplies - Pens, Paper', amount: 45.50, category: 'Office Supplies' },
    { date: '2024-07-06', description: 'Marketing Campaign - Social Media Ads', amount: 250.00, category: 'Marketing' },
    { date: '2024-07-08', description: 'Travel - Client Meeting', amount: 75.20, category: 'Travel' },
    { date: '2024-07-11', description: 'Utilities - Internet Bill', amount: 80.00, category: 'Utilities' },
  ];

  constructor(private fb: FormBuilder) {
    this.expenseForm = this.fb.group({
      date: [new Date(), Validators.required],
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.expenseData = this.mockExpenseEntries;
    this.calculateTotalExpenses();
  }

  calculateTotalExpenses(): void {
    this.totalExpenses = this.expenseData.reduce((sum, entry) => sum + entry.amount, 0);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }

  toggleAddExpenseForm(): void {
    this.showAddExpenseForm = !this.showAddExpenseForm;
    if (!this.showAddExpenseForm) {
      this.expenseForm.reset({ date: new Date() }); // Reset form if hiding
    }
  }

  onAddExpense(): void {
    if (this.expenseForm.valid) {
      const newEntry: ExpenseEntry = {
        date: new Date(this.expenseForm.value.date).toISOString().split('T')[0], // Format date
        description: this.expenseForm.value.description,
        amount: parseFloat(this.expenseForm.value.amount),
        category: this.expenseForm.value.category
      };
      this.expenseData = [newEntry, ...this.expenseData]; // Add to top of the list
      this.calculateTotalExpenses();
      this.toggleAddExpenseForm(); // Hide form after adding
    }
  }

  deleteExpense(entryToDelete: ExpenseEntry): void {
    this.expenseData = this.expenseData.filter(entry => entry !== entryToDelete);
    this.calculateTotalExpenses();
    // In a real app, call a service to delete from backend
  }
}
