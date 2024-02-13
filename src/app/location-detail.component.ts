import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-location-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <p>
      location-detail works!
    </p>
  `,
    styles: [``]
})
export class LocationDetailComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }

}
