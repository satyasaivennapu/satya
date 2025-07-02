import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './customers.html',
  styleUrls: ['./customers.scss']
})
export class CustomersComponent { }
