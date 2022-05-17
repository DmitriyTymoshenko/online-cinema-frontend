import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { useMutation } from 'react-query';

import { useFavorites } from '@/screens/favorites/UseFavorites';

import { useAuth } from '@/hooks/useAuth';

import { UserService } from '@/services/user.service';

import { toastError } from '@/utils/toast-error';

import styles from './FavoriteButton.module.scss';

const FavoriteButton: FC<{ movieId: string }> = ({ movieId }) => {
	const [isSmashed, setIsSmashed] = useState(false);
	const { user } = useAuth();
	const { favoriteMovies, refetch } = useFavorites();

	useEffect(() => {
		if (!favoriteMovies) return;

		const isHasMovie = favoriteMovies.some((m) => m._id === movieId);
		if (isSmashed !== isHasMovie) setIsSmashed(isHasMovie);
	}, [favoriteMovies, isSmashed, movieId]);

	const { mutateAsync } = useMutation(
		'update favorites',
		() => UserService.toggleFavorite(movieId),
		{
			onError: (error) => {
				toastError(error, 'Update Favorites');
			},

			onSuccess: () => {
				setIsSmashed(!isSmashed);
				refetch();
			},
		}
	);

	if (!user) return null;
	return (
		<button
			onClick={() => mutateAsync()}
			className={cn(styles.button, {
				[styles.animate]: isSmashed,
			})}
			style={{ backgroundImage: `url('/heart-animation.png')` }}
		/>
	);
};

export default FavoriteButton;
