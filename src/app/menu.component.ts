import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { Endpoints, getEndpoints } from 'rickmortyapi'

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [
        RouterLink, CommonModule, RouterLinkActive
    ],
    template: `
        <nav class="c-menu">
            <b *ngFor="let menuItem of menuItems">
                <a class="c-menu__link" routerLink="{{ menuItem.link }}"
                   routerLinkActive="c-menu__link--active">{{ menuItem.label | uppercase }}</a>
            </b>
        </nav>
    `,
    styles: [`.c-menu__link {
        font-weight: bold;
    }

    .c-menu__link {
        margin: 20px;
    }

    .c-menu {
        display: flex;

        margin-bottom: 20px;
    }

    .c-menu__link--active {
        font-size: 1.2em;
        background-color: #000;
        color: #FFF;
    }
    `]
})

export class MenuComponent implements OnInit {
    menuItems: {
        label: string;
        link: string;
    }[] = [];

    ngOnInit(): void {
        getEndpoints().then((response) => {
            const endpoints: Endpoints = response.data;
            Object.keys(endpoints).forEach(
                (endpoint) => {
                    this.menuItems.push(
                        {
                            label: endpoint,
                            link: `/${endpoint}`
                        }
                    );
                }
            );
        }).catch((error) => {
                console.error('Error fetching endpoints:', error);
            });
    }
}
