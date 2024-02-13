import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";

import {CharactersService} from "./characters.service";
import {CharactersListCardComponent} from "./characters-list-card.component";

@Component({
    selector: 'app-character-list',
    standalone: true,
    imports: [CommonModule, CharactersListCardComponent],
    template: `
        <h1 *ngIf="charactersService.characters.length < 1">Characters</h1>
        <article class="character-list">
            <app-characters-list-card
                    *ngFor="let character of charactersService.characters"
                    [cardCharacter]="character"
            ></app-characters-list-card>
        </article>
    `,
    styles: [`
        .character-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            /*justify-content: space-between;*/
            /*margin: 0 auto;*/
            /*max-width: 1000px;*/

        }

    `]
})
export class CharactersListComponent implements OnInit {
    constructor(readonly charactersService: CharactersService) {
    }

    ngOnInit(): void {

        console.log('app-character-list ngOnInit() method is called');
    }
}
