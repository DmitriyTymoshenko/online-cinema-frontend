import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import SingleMovie from '@/screens/single-movie/SingleMovie';

import { IGalleryItem } from '@/ui/gallery/gallery.interface';

import { IMoviePage } from '@/shared/types/movie.types';

import { MovieService } from '@/services/movie.service';

import { getMovieUrl } from '@/config/url.config';

import Error404 from '../404';

const MoviePage: NextPage<IMoviePage> = ({ similarMovies, movie }) => {
	return movie ? (
		<SingleMovie similarMovies={similarMovies || []} movie={movie} />
	) : (
		<Error404 />
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: movies } = await MovieService.getAll();
		const paths = movies.map((m) => ({
			params: { slug: m.slug },
		}));

		return { paths, fallback: 'blocking' };
	} catch (e) {
		return {
			paths: [],
			fallback: false,
		};
	}
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: movie } = await MovieService.getBySlug(String(params?.slug));
		const { data: dataSimilarMovies } = await MovieService.getByGenres(
			movie.genres.map((g) => g._id)
		);

		const similarMovies: IGalleryItem[] = dataSimilarMovies
			.filter((m) => m._id !== movie._id)
			.map((m) => ({
				name: m.title,
				posterPath: m.poster,
				link: getMovieUrl(m.slug),
			}));

		return {
			props: {
				similarMovies,
				movie,
			},
			revalidate: 10,
		};
	} catch (e) {
		return {
			props: {
				movie: null,
			},
		};
	}
};

export default MoviePage;
