import {Component, HostListener, Input, OnInit} from '@angular/core';

import { AsyncPipe, NgIf, NgStyle, UpperCasePipe } from '@angular/common';
import {RouterModule} from "@angular/router";
import {Episode} from "rickmortyapi";

@Component({
    selector: 'app-episodes-list-card',
    standalone: true,
    imports: [
        UpperCasePipe, RouterModule, NgStyle, AsyncPipe, NgIf
    ],
    template: `
        <!--      <div class="itemmm">-->
        <a href="/episode/{{cardEpisode.id}}">
<!--            <img src="{{cardEpisode.image}}" loading="lazy" decoding="async" alt="Photo of {{cardEpisode.name}}"-->
<!--                 [ngStyle]="{'max-height': (divider) + 'px'}">-->
            <h5>{{ cardEpisode.id }}. {{ cardEpisode.name }}</h5>
        </a>
            <div *ngIf="cardEpisode.air_date"><strong>Air Date:</strong> {{ cardEpisode.air_date }}</div>
            <div *ngIf="cardEpisode.episode"><strong>Episode:</strong> {{ cardEpisode.episode }}</div>

        <!--      </div>-->


    `,
    styles: [`
        .itemmm {

            /*flex: 1 1 calc(25% - 10px); !* Масштабування блоків на 4 в ряду з відступами 10px *!*/
            /*margin: 5px; !* Відступи між блоками *!*/
            /*box-sizing: border-box; !* Забезпечення, що відступи враховуються у розрахунку ширини *!*/
        }

        a {
            /*text-decoration: none;*/
            /*color: #000;*/

            /*margin: 10 auto;*/
            /*max-height: 30%;*/
            /*width: 15%;*/
            /*height: 10%;*/
        }

        a:hover {
            /*text-decoration: underline;*/

        }

        img {

            /*max-height: innerHeight / 3 px;*/
            /*margin: 10 auto;*/
            /*max-height: 30%;*/
            /*width: 55%;*/
            /*height: auto;*/
        }
    `]
})
export class EpisodesListCardComponent implements OnInit {
    @Input() cardEpisode!: Episode;
    @Input() cardId!: Number;

    protected readonly window = window;
    innerWidth: number = window.innerWidth;
    innerHeight: number = window.innerHeight;
    positionRatio: number = window.innerWidth / window.innerHeight;
    // devicePixelRatio: number = 0;
    divider: number = 300 / 1.5;

    constructor() {
    }

    ngOnInit(): void {

        console.log('app-episodes-list-card ngOnInit() method is called');

        this.innerHeight = window.innerHeight;
        this.innerWidth = window.innerWidth;
        this.positionRatio = window.innerWidth / window.innerHeight;

        // if(window.innerWidth/window.innerHeight > 1) {
        //     this.divider = 300 * (this.innerWidth / 1920);
        // } else{
        //     this.divider = 300 * (this.innerHeight / 919);
        // }
        // console.log('ngOnInit()', this.innerWidth, this.innerHeight);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event): void {
        if (this.innerHeight == window.innerWidth && this.innerWidth == window.innerHeight) {
            this.innerWidth = window.innerWidth;
            this.innerHeight = window.innerHeight;
            // console.log('onResize() if rotate ', this.innerWidth, this.innerHeight);
            // this.isLandscape = window.innerWidth > window.innerHeight;
            // console.log('onResize() Landscape if', this.isLandscape);
            //     this.divider = Math.min(300 * (this.innerWidth / 1920), 300 * (this.innerHeight / 919));
            } else {
            // this.innerWidth= window.innerWidth;
            // this.innerHeight = window.innerHeight;
            // console.log('onResize() else',this.innerHeight,window.innerWidth);
            //     this.divider = Math.min(300 * (this.innerWidth / 919), 300 * (this.innerHeight / 1920));
        }

    }
}
