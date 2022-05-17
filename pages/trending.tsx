import { GetStaticProps, NextPage } from 'next';

import Catalog from '@/ui/catalog-movies/Catalog';

import { IMovie } from '@/shared/types/movie.types';

import { MovieService } from '@/services/movie.service';

const TrendingPage: NextPage<{ movies: IMovie[] }> = ({ movies }) => {
	return (
		<Catalog
			movies={movies}
			title="Trending Movies"
			description="Trending Movies and series in excellent quality"
		/>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	try {
		const movies = await MovieService.getMostPopularMovies();

		return {
			props: {
				movies,
			},
			revalidate: 60,
		};
	} catch (e) {
		return {
			props: {
				movies: [],
			},
		};
	}
};

export default TrendingPage;
