import { GetStaticProps, NextPage } from 'next';

import Catalog from '@/ui/catalog-movies/Catalog';

import { IMovie } from '@/shared/types/movie.types';

import { MovieService } from '@/services/movie.service';

const FreshPage: NextPage<{ movies: IMovie[] }> = ({ movies }) => {
	return (
		<Catalog
			movies={movies}
			title="Fresh Movies"
			description="New movies and series in excellent quality"
		/>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: movies } = await MovieService.getAll();

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

export default FreshPage;
