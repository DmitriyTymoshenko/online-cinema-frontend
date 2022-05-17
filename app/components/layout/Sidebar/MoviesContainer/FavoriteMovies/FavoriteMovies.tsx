import dynamic from 'next/dynamic';
import { FC } from 'react';

import NotAuthFavorites from '@/components/layout/Sidebar/MoviesContainer/FavoriteMovies/NotAuthFavorites';

import { useFavorites } from '@/screens/favorites/UseFavorites';

import SkeletonLoader from '@/ui/SkeletonLoader';

import { useAuth } from '@/hooks/useAuth';

import MovieList from '../MovieList';

// const DynamicMovieList = dynamic(() => import('../MovieList'), {
// 	ssr: false,
// });

const FavoriteMovies: FC = () => {
	const { favoriteMovies, isLoading } = useFavorites();
	const { user } = useAuth();

	return (
		<>
			{user ? (
				isLoading ? (
					<div className="mt-11">
						<SkeletonLoader count={3} className="h-28 mb-4" />
					</div>
				) : (
					<MovieList
						link="/favorites"
						movies={favoriteMovies?.slice(0, 3) || []}
						title="Favorites"
					/>
				)
			) : (
				<NotAuthFavorites />
			)}
			;
		</>
	);
};
export default FavoriteMovies;
