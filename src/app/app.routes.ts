import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CharactersListComponent} from './characters-list.component';
import {EpisodeListComponent} from "./episode-list.component";
import {LocationListComponent} from "./location-list.component";

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: '/characters'},
    {path: 'characters', component: CharactersListComponent},
    {path: 'character/:id', loadComponent: () => import('./character-detail.component').then(m => m.CharacterDetailComponent)},
    {path: 'episodes', component: EpisodeListComponent},
    {path: 'episode/:id', loadComponent: () => import('./episode-detail.component').then(m => m.EpisodeDetailComponent)},
    {path: 'locations', component: LocationListComponent},
    {path: 'location/:id', loadComponent: () => import('./location-detail.component').then(m => m.LocationDetailComponent)},
    {path: '**', redirectTo: '/characters'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
