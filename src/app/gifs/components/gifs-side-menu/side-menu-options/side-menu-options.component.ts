import { Component, computed, inject, signal } from '@angular/core';
import MenuOption from '../../../interfaces/side-menu-interfaces/MenuOptions';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
})
export class GifsSideMenuOptionsComponent {
  public service = inject(GifsService);
  public menuOptions = signal<MenuOption[]>([
    {
      icon: 'fa-solid fa-chart-line text-white',
      label: 'Trending',
      subLabel: 'Gifs Popular',
      routerLink: '/dashboard/trending',
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Search',
      subLabel: 'Search Gifs',
      routerLink: '/dashboard/search',
    },
  ]);
}
