import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import {
  Application,
  ApplicationSettings
} from '@nativescript/core'

interface Vehicle {
  id: number
  make: string
  model: string
  year: number
  mileage: number
}

@Component({
  standalone: false,
  selector: 'Featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss'],
})
export class FeaturedComponent implements OnInit {

  vehicles: Vehicle[] = []

  make = ''
  model = ''
  year = ''
  mileage = ''

  editingId: number | null = null

  ngOnInit(): void {
    this.loadVehicles()
  }

  loadVehicles(): void {
    const saved = ApplicationSettings.getString('carcare_vehicles', '')

    if (saved) {
      try {
        this.vehicles = JSON.parse(saved) as Vehicle[]
      } catch {
        this.vehicles = []
      }
    }

    // First launch: create the default Porsche
    if (this.vehicles.length === 0) {
      this.vehicles = [
        {
          id: Date.now(),
          make: 'Porsche',
          model: 'Macan',
          year: 2024,
          mileage: 28450
        }
      ]

      this.saveVehicles()
    }
  }

  addOrUpdateVehicle(): void {
    const vehicleYear = Number(this.year)
    const vehicleMileage = Number(this.mileage)

    if (
      !this.make.trim() ||
      !this.model.trim() ||
      !Number.isFinite(vehicleYear) ||
      vehicleYear < 1900 ||
      !Number.isFinite(vehicleMileage) ||
      vehicleMileage < 0
    ) {
      alert('Please enter valid vehicle information.')
      return
    }

    if (this.editingId !== null) {
      const vehicle = this.vehicles.find(
        item => item.id === this.editingId
      )

      if (vehicle) {
        vehicle.make = this.make.trim()
        vehicle.model = this.model.trim()
        vehicle.year = vehicleYear
        vehicle.mileage = vehicleMileage
      }
    } else {
      this.vehicles.unshift({
        id: Date.now(),
        make: this.make.trim(),
        model: this.model.trim(),
        year: vehicleYear,
        mileage: vehicleMileage
      })
    }

    this.saveVehicles()
    this.resetForm()
  }

  editVehicle(vehicle: Vehicle): void {
    this.editingId = vehicle.id

    this.make = vehicle.make
    this.model = vehicle.model
    this.year = vehicle.year.toString()
    this.mileage = vehicle.mileage.toString()
  }

  deleteVehicle(id: number): void {
    this.vehicles = this.vehicles.filter(
      vehicle => vehicle.id !== id
    )

    this.saveVehicles()

    if (this.editingId === id) {
      this.resetForm()
    }
  }

  resetForm(): void {
    this.make = ''
    this.model = ''
    this.year = ''
    this.mileage = ''
    this.editingId = null
  }

  saveVehicles(): void {
    ApplicationSettings.setString(
      'carcare_vehicles',
      JSON.stringify(this.vehicles)
    )
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
}