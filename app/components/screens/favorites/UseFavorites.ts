import { useQuery } from 'react-query';

import { useAuth } from '@/hooks/useAuth';

import { IMovie } from '@/shared/types/movie.types';

import { UserService } from '@/services/user.service';

export const useFavorites = () => {
	const { user } = useAuth();
	const {
		isLoading,
		data: favoriteMovies,
		refetch,
	} = useQuery('favorite movies', () => UserService.getFavorites(), {
		select: ({ data }: { data: IMovie[] }) => data,
		enabled: !!user,
	});

	return {
		isLoading,
		favoriteMovies,
		refetch,
	};
};
