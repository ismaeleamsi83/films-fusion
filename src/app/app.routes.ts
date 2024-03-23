import { Routes } from '@angular/router';
import { SectionComponent } from './section/section.component';
import { TopratedComponent } from './toprated/toprated.component';
import { PopularComponent } from './popular/popular.component';

export const routes: Routes = [
    { path: '', component: SectionComponent },
    { path: 'toprated', component: TopratedComponent },
    { path: 'popular', component: PopularComponent },
    // { path: ':parametro', component: SectionComponent }
];
