import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EpisodesListCardComponent } from './episode-list-card.component';
import { EpisodesService } from './episodes.service';
import { Episode } from 'rickmortyapi';

@Component({
    selector: 'app-episode-list',
    standalone: true,
    imports: [CommonModule, EpisodesListCardComponent],
    template: `
        <h1 *ngIf="episodesService.episodes.length < 1">Episodes</h1>

        <article class="episode-list">
            <app-episodes-list-card
                *ngFor="let episode of episodesService.episodes"
                [cardEpisode]="episode"
            ></app-episodes-list-card>
        </article>
    `,
    styles: [
        `
            .episode-list {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                /*justify-content: space-between;*/
                /*margin: 0 auto;*/
                /*max-width: 1000px;*/

            }
        `
    ]
})
export class EpisodeListComponent implements OnInit {
    currentPage: number = 2;

    ngOnInit(): void {
        console.log('app-episode-list ngOnInit() method is called');
        this.episodesService.loadEpisodes(this.currentPage);
    }

    constructor(readonly episodesService: EpisodesService) {
    }
}
