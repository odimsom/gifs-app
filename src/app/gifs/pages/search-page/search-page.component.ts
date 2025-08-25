import { Component, inject, signal } from '@angular/core';
import { GifsListComponent } from '../../components/gifs-list/gifs-list.component';
import { GifsService } from '../../services/gifs.service';
import Gif from '../../interfaces/gifs-structure-interfaces/gifs-response-interface';
import GifMapper from '../../mappers/giphy-to-gifs.mapper';

@Component({
  selector: 'app-search-page',
  imports: [GifsListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {
  public _service = inject(GifsService);
  public gifs = signal<Gif[]>([]);
  public onSearch = (query: string) => {
    this._service.SearchByQuery(query).subscribe((res) => {
      this.gifs.set(res);
    });
  };
}
