import { ISlide } from '@/components/ui/slider/slider.interface';

import { IGalleryItem } from '@/ui/gallery/gallery.interface';

import { IActor } from '@/shared/types/movie.types';

export interface IHome {
	slides: ISlide[];
	trendingMovies: IGalleryItem[];
	actors: IGalleryItem[];
}
