import { Injectable, OnInit } from '@angular/core';
import { ApiResponse, Episode, EpisodeFilter, getEpisode, getEpisodes } from 'rickmortyapi'
import { catchError, from, mergeMap, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EpisodesService {
    episodes: Episode[] = [];
    currentPage: number = 1;
    

    async loadEpisodes(page: number): Promise<void> {
        try {
            this.episodes = await this.getEpisodesByPage(page);
        } catch (error) {
            console.error('Error loading episodes:', error);
        }
    }

    getEpisodeObservable = <T extends number | number[]>(id: T): Observable<Episode | undefined> => {
        return from(getEpisode(id)).pipe(
            mergeMap((response: ApiResponse<T extends number ? Episode : Episode[]>) => {
                if (Array.isArray(response.data)) {
                    // Handle the case when an array is returned (you may need to adjust this based on your API response structure)
                    return of(undefined);
                } else {
                    // Handle the case when a single episode is returned
                    return of(response.data as Episode);
                }
            }),
            catchError((error) => {
                // Handle errors if needed
                console.error('Error fetching episode:', error);
                return of(undefined);
            })
        );
    };

    getEpisodeById = async (id: number) => {
        getEpisode(id).then(
            response => {
                if (response.status === 200) {
                    return response.data;
                } else {
                    console.error('Error fetching episode:', response.statusMessage);
                    return null;
                }
            }
        ).catch(
            error => {
                console.error('Exception while fetching episode:', error);
                return null;
            }
        )
    }

    getEpisodesByPage = async (page: number): Promise<Episode[]> => {
        try {
            // Assuming getEpisodes method is from your API library
            const filters: EpisodeFilter = { page: page }; // Set the page filter
            const response = await getEpisodes(filters);
            console.log(response.status)
            console.log(response.statusMessage)
            console.log(response.data)
            // Check if the API response is successful
            if (response.status === 200) {
                // Extract episodes from the response and return them
                return response.data?.results || [];
            } else {
                // Handle error, throw an exception, or return an empty array
                console.error('Error fetching episodes:', response.statusMessage);
                return [];
            }
        } catch (error) {
            // Handle exceptions, log the error, and return an empty array
            console.error('Exception while fetching episodes:', error);
            return [];
        }
    };
}
