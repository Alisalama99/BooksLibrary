import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Home } from './pages/home/home';
import { Register } from './pages/register/register';

export const routes: Routes = [
  {
    path: 'about',
    component: About,
  },
  {
    path: '',
    component: Home,
  },
  {
    path: 'register',
    component: Register,
  },
];
