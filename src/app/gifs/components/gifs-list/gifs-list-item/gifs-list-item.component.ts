import { Component, input } from '@angular/core';
import Gif from 'src/app/gifs/interfaces/gifs-structure-interfaces/gifs-response-interface';

@Component({
  selector: 'gifs-list-item',
  imports: [],
  templateUrl: './gifs-list-item.component.html',
})
export class GifsListItemComponent {
  public url = input.required<string>();
}
