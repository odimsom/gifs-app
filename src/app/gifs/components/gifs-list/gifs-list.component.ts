import { Component, input, InputSignal } from '@angular/core';
import { GifsListItemComponent } from './gifs-list-item/gifs-list-item.component';
import Gif from '../../interfaces/gifs-structure-interfaces/gifs-response-interface';

@Component({
  selector: 'gifs-list',
  imports: [GifsListItemComponent],
  templateUrl: './gifs-list.component.html',
})
export class GifsListComponent {
  public gifsImageUrls = input.required<Gif[]>();
}
