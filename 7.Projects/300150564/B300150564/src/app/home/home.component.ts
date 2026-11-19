
import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'

@Component({
  standalone: false,
  selector: 'Home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  // Vehicle information
  vehicleName = 'Porsche Macan'
  vehicleYear = 2024
  mileage = 28450

  // Maintenance information
  nextService = 'Oil Change'
  serviceDueKm = 30000
  remainingKm = 0

  // Expenses information
  monthlyExpenses = 428.75
  lastExpense = 'Fuel - $72.40'

  constructor() {}

  ngOnInit(): void {
    this.remainingKm = this.serviceDueKm - this.mileage
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
}
