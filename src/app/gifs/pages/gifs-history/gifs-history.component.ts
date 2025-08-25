import { Component, computed, inject, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifsService } from '../../services/gifs.service';
import Gif from '../../interfaces/gifs-structure-interfaces/gifs-response-interface';
import { GifsListComponent } from '../../components/gifs-list/gifs-list.component';

@Component({
  selector: 'gifs-history',
  imports: [GifsListComponent],
  templateUrl: './gifs-history.component.html',
})
export default class GifsHistoryComponent {
  public _service: GifsService = inject(GifsService);
  public query: Signal<any> = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['query']))
  );
  public GetGifByKey: Signal<Gif[]> = computed(() =>
    this._service.GetHistoryGifs(this.query())
  );
}
