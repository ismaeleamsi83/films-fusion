import { Routes } from '@angular/router';
import { SectionComponent } from './section/section.component';
import { TopratedComponent } from './toprated/toprated.component';

export const routes: Routes = [
    { path: '', component: SectionComponent },
    { path: 'toprated', component: TopratedComponent },
    // { path: ':parametro', component: SectionComponent }
];
