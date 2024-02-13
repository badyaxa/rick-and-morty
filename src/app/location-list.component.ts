import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { LocationsListCardComponent } from './location-list-card.component';
import { LocationsService } from './locations.service';

@Component({
    selector: 'app-location-list',
    standalone: true,
    imports: [CommonModule, LocationsListCardComponent],
    template: `
        <h1>Locations</h1>
        <article class="location-list">
            <app-location-list-card
                *ngFor="let location of locationsService.locations"
                [cardLocation]="location"
            ></app-location-list-card>
        </article>
    `,
    styles: [``]
})
export class LocationListComponent {
    constructor(readonly locationsService: LocationsService) {
    }
}
