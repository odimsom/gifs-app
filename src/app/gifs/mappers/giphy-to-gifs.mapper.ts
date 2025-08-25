import Gif from '../interfaces/gifs-structure-interfaces/gifs-response-interface';
import { GiphyItem } from '../interfaces/giphy.interfaces/giphy.interfaces';
export default class GifMapper {
  public static MapGiphyToGif = (GiphyItem: GiphyItem): Gif => {
    return {
      id: GiphyItem.id,
      title: GiphyItem.title,
      url: GiphyItem.images.original.url,
    };
  };

  public static MapGiphysToGifs = (GiphyItem: GiphyItem[]): Gif[] => {
    return GiphyItem.map(this.MapGiphyToGif);
  };
}
