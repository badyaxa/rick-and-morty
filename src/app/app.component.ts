import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {MenuComponent} from "./menu.component";
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, MenuComponent],
    template: `
        <h1>Welcome to {{ title }}!</h1>
        <app-menu></app-menu>
        <router-outlet></router-outlet>
    `,
    styles: [
        `
            h1 {
                font-family: Calibri, sans-serif;
            }
        `
    ],
})
export class AppComponent {
    title = 'rick-and-morty';
}
