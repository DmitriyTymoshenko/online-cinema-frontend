import dynamic from 'next/dynamic';
import { FC } from 'react';

import SubHeading from '@/components/ui/heading/SubHeading';

import Content from '@/screens/single-movie/Content/Content';
import { useUpdateCountOpened } from '@/screens/single-movie/useUpdateCountOpened';

import Banner from '@/ui/banner/Banner';
import Gallery from '@/ui/gallery/Gallery';

import { IMoviePage } from '@/shared/types/movie.types';

import Meta from '@/utils/meta/Meta';

const DynamicIFramePlayer = dynamic(
	() => import('@/ui/video-player/IFramePlayer'),
	{
		ssr: false,
	}
);

const DynamicRating = dynamic(() => import('./RateMovie/RateMovie'), {
	ssr: false,
});
const SingleMovie: FC<IMoviePage> = ({ movie, similarMovies }) => {
	useUpdateCountOpened(movie.slug);

	return (
		<Meta title={movie.title} description={`Watch ${movie.title}`}>
			<Banner
				image={movie.bigPoster}
				Detail={() => <Content movie={movie} />}
			/>

			<DynamicIFramePlayer movie={movie} />

			<div className="mt-12">
				<SubHeading title="Similar movies" />
				<Gallery items={similarMovies} />
			</div>

			<DynamicRating slug={movie.slug} movieId={movie._id} />
		</Meta>
	);
};

export default SingleMovie;
