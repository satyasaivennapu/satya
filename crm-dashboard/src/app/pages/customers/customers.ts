import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'Active' | 'Inactive' | 'Lead';
  lastContactDate: string;
}

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './customers.html',
  styleUrls: ['./customers.scss']
})
export class CustomersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'company', 'email', 'phone', 'status', 'lastContactDate', 'actions'];
  dataSource: MatTableDataSource<Customer>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  mockCustomers: Customer[] = [
    { id: 'c1', name: 'Alice Wonderland', email: 'alice@example.com', phone: '555-0101', company: 'Wonderland Inc.', status: 'Active', lastContactDate: '2024-07-10' },
    { id: 'c2', name: 'Bob The Builder', email: 'bob@example.com', phone: '555-0102', company: 'BuildIt LLC', status: 'Active', lastContactDate: '2024-07-15' },
    { id: 'c3', name: 'Charlie Brown', email: 'charlie@example.com', phone: '555-0103', company: 'Peanuts Co.', status: 'Inactive', lastContactDate: '2024-03-20' },
    { id: 'c4', name: 'Diana Prince', email: 'diana@example.com', phone: '555-0104', company: 'Themyscira Solutions', status: 'Lead', lastContactDate: '2024-07-18' },
    { id: 'c5', name: 'Edward Scissorhands', email: 'edward@example.com', phone: '555-0105', company: 'Artful Cuts', status: 'Active', lastContactDate: '2024-06-25' },
    { id: 'c6', name: 'Fiona Gallagher', email: 'fiona@example.com', phone: '555-0106', company: 'SouthSide Services', status: 'Lead', lastContactDate: '2024-07-19' },
    { id: 'c7', name: 'George Jetson', email: 'george@example.com', phone: '555-0107', company: 'Spacely Sprockets', status: 'Inactive', lastContactDate: '2023-12-01' },
    { id: 'c8', name: 'Harry Potter', email: 'harry@example.com', phone: '555-0108', company: 'Wizarding World Supplies', status: 'Active', lastContactDate: '2024-07-01' },
  ];

  constructor() {
    this.dataSource = new MatTableDataSource(this.mockCustomers);
  }

  ngOnInit(): void {
    // Data is already loaded in constructor for this mock setup
  }

  // AfterViewInit is better for paginator and sort with ViewChild
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getStatusClass(status: 'Active' | 'Inactive' | 'Lead'): string {
    switch (status) {
      case 'Active': return 'status-active';
      case 'Inactive': return 'status-inactive';
      case 'Lead': return 'status-lead';
      default: return '';
    }
  }

  // Placeholder for actions
  viewCustomerDetails(customer: Customer) {
    console.log('View details for:', customer.name);
    // Navigate to customer detail page or open a dialog
  }

  editCustomer(customer: Customer) {
    console.log('Edit customer:', customer.name);
  }

  deleteCustomer(customer: Customer) {
    console.log('Delete customer:', customer.name);
    // For mock:
    // this.mockCustomers = this.mockCustomers.filter(c => c.id !== customer.id);
    // this.dataSource.data = this.mockCustomers;
  }
}
