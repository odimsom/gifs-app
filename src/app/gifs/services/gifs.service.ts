import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces/giphy.interfaces';
import Gif from '../interfaces/gifs-structure-interfaces/gifs-response-interface';
import GifMapper from '../mappers/giphy-to-gifs.mapper';
import { map, Observable, tap } from 'rxjs';
import LocalStorageHelper from './helpers/local-storage-helper';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private Http = inject(HttpClient);
  public TrendingGifs = signal<Gif[]>([]);
  public TrendingGifsGroup = computed<Gif[][]>(() => {
    const groups = [];
    for (let i = 0; i < this.TrendingGifs().length; i += 3) {
      groups.push(this.TrendingGifs().slice(i, i + 3));
    }
    return groups;
  });
  public TrendingGifsLoading = signal(false);
  public SearchHistoryKeys = signal<string[]>(Object.keys(localStorage));
  private TrendingPage = signal(0);

  constructor() {
    this.LoadTrendingGifs();
  }

  public LoadTrendingGifs = (): void => {
    if (this.TrendingGifsLoading()) return;

    this.TrendingGifsLoading.set(true);

    this.Http.get<GiphyResponse>(`${environment.GiphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.GiphyApiKey,
        limit: 20,
        offset: this.TrendingPage() * 20,
      },
    })
      .pipe(
        tap(() => {
          this.TrendingPage.update((current) => (current += 1));
        })
      )
      .subscribe((res) => {
        const gifs = GifMapper.MapGiphysToGifs(res.data);
        this.TrendingGifs.update((currentGifs) => [...currentGifs, ...gifs]);
        this.TrendingGifsLoading.set(false);
      });
  };

  public SearchByQuery = (query: string): Observable<Gif[]> => {
    return this.Http.get<GiphyResponse>(`${environment.GiphyUrl}/gifs/search`, {
      params: {
        api_key: environment.GiphyApiKey,
        limit: 20,
        q: query,
      },
    }).pipe(
      map(({ data }) => GifMapper.MapGiphysToGifs(data)),

      //History
      tap((res) => {
        LocalStorageHelper.SaveToLocalStorage(query, res);
        this.SearchHistoryKeys.update((current) => [...current, query]);
      })
    );
  };

  public GetHistoryGifs = (query: string): Gif[] => {
    return LocalStorageHelper.LoadFromLocalStorage(query);
  };
}
