import { Injectable, OnInit } from '@angular/core';
import { getLocations, Location } from 'rickmortyapi'

@Injectable({ providedIn: 'root' })
export class LocationsService implements OnInit {
    locations: Location[] = [];

    ngOnInit(): void {
        this.getLocationsByPage(1).then(
            locations => {
                this.locations = locations.data.results == undefined ? [] : locations.data.results;
            }
        ).catch(
            error => {
                console.error(error)
            }
        )
    }

    async getLocationsByPage(page: number) {
        return await getLocations({ page: page })
            .then(
                locations => {
                    return locations
                }
            )
    }
}
