import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Character } from 'rickmortyapi';
import { map, Observable } from 'rxjs';

import { CharactersService } from './characters.service';

@Component({
    selector: 'app-character-detail',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
        <article class="character-detail" *ngIf="(character$ | async) as character">
            <div *ngIf="character">
                <h2>{{ character.id }}. {{ character.name }}</h2>
                <img [src]="character.image" alt="{{ character.name }} Image">

                <!--                <strong>ID:</strong> {{ character.id }}-->
                <div *ngIf="character.status"><strong>Status:</strong> {{ character.status }}</div>
                <div *ngIf="character.species"><strong>Species:</strong> {{ character.species }}</div>
                <div *ngIf="character.type"><strong>Type:</strong> {{ character.type }}</div>

                <div *ngIf="character.gender"><strong>Gender:</strong> {{ character.gender }}</div>
                <div *ngIf="character.origin.url"><strong>Origin: </strong>
                    <a [href]="transformUrl(character.origin.url)" target="_self">{{ character.origin.name }}</a>
                </div>

                <div *ngIf="character.location.url"><strong>Location: </strong>
                    <a [href]="transformUrl(character.location.url)" target="_self">{{ character.location.name }}</a>
                </div>


                <!--                <div *ngIf="character.location.url">-->
                <!--                    <strong>Location: </strong>-->
                <!--                        <a (click)="navigateToLocation(character)">{{ character.location.name }}</a>-->
                <!--                </div>-->


                <div>
                    <strong>Episodes: </strong>
                    <ng-container *ngIf="character.episode && character.episode.length > 0">
                        <b *ngFor="let episode of character.episode; let last = last">
                            <a [href]="transformUrl(episode)"
                               target="_self">{{ episode.split('/').pop() }}</a>{{ !last ? ' ' : '' }}
                        </b>
                    </ng-container>
                </div>


                <!--            <strong>URL:</strong> <a [href]="character.url" target="_self">{{ character.url }}</a>-->
                <!--            <strong>Created:</strong> {{ character.created }}-->

                <strong>Created:</strong> {{ character.created | date: 'medium' }}

            </div>
        </article>
    `,
    styles: [``]
})
export class CharacterDetailComponent implements OnInit {
    character$!: Observable<Character | undefined>;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private charactersService: CharactersService) {
    }

    ngOnInit(): void {

        console.log('app-character-detail ngOnInit() method is called');
        this.character$ = this.route.paramMap.pipe(map(params => {
            return this.charactersService.characters[Number(params.get('id'))]
        }));
    }

    transformUrl(originalUrl: string): string {
        // Замінити "https://rickandmortyapi.com/api/" на "/"
        return originalUrl.replace('https://rickandmortyapi.com/api/', '/');
    }

    // redirectToEpisode(episodeUrl: string): void {
    // Ваш код для переадресації на сторінку епізоду
    // Наприклад, використовуючи Angular Router:
    // this.route.navigate(['/episode', episodeUrl.split('/').pop()]);
    // }

    // метод для обробки кліку та переходу
    navigateToLocation(character: Character): void {
        if (character.location && character.location.url) {
            const locationUrl = this.transformUrl(character.location.url);
            this.router.navigateByUrl(locationUrl);
        }
    }
}
