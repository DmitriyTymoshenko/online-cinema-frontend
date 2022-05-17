import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { IMovie } from '@/shared/types/movie.types';

import { getMovieUrl } from '@/config/url.config';

import styles from './Favorites.module.scss';

const DynamicFavoriteButton = dynamic(
	() => import('../../screens/single-movie/FavoriteButton/FavoriteButton'),
	{
		ssr: false,
	}
);

const FavoriteItem: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<div className={styles.itemWrapper}>
			<DynamicFavoriteButton movieId={movie._id} />
			<Link href={getMovieUrl(movie.slug)}>
				<a className={styles.item}>
					<Image
						alt={movie.title}
						src={movie.bigPoster}
						layout="fill"
						draggable={false}
						priority
					/>
				</a>
			</Link>
		</div>
	);
};

export default FavoriteItem;
