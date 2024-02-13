import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Episode } from 'rickmortyapi';
import { map, Observable } from 'rxjs';

import { EpisodesService } from './episodes.service';

@Component({
    selector: 'app-episode-detail',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
        <article class="episode-detail" *ngIf="(episode$ | async) as episode">
            <div *ngIf="episode">
                <h2>{{ episode.id }}. {{ episode.name }}</h2>
                <div *ngIf="episode.air_date"><strong>Air Date:</strong> {{ episode.air_date }}</div>
                <div *ngIf="episode.episode"><strong>Episode:</strong> {{ episode.episode }}</div>
                <div *ngIf="episode.characters"><strong>Characters:</strong> {{ episode.characters }}</div>
            </div>
        </article>`,
    styles: [``]
})
export class EpisodeDetailComponent implements OnInit {
    episode$!: Observable<Episode | undefined>;

    constructor(private readonly route: ActivatedRoute,
                private readonly router: Router,
                private readonly episodesService: EpisodesService) {
    }

    ngOnInit(): void {
        console.log('app-episode-detail ngOnInit')
    }
}
