import { FC } from 'react';

import Menu from '@/components/layout/Navigation/MenuContainer/Menu';
import { UsePopularGenres } from '@/components/layout/Navigation/MenuContainer/genres/usePopularGenres';

import SkeletonLoader from '@/ui/SkeletonLoader';

const GenreMenu: FC = () => {
	const { isLoading, data } = UsePopularGenres();
	return isLoading ? (
		<SkeletonLoader count={5} className="h-7 mt-6" />
	) : (
		<Menu menu={{ title: 'Popular Genres', items: data || [] }} />
	);
};

export default GenreMenu;
