import { useQuery } from 'react-query';

import { ISelectOptions } from '@/components/ui/select/select.interface';

import { GenreService } from '@/services/genre.service';

import { toastError } from '@/utils/toast-error';

export const useAdminGenres = () => {
	const queryData = useQuery(
		'Get admin list of genres',
		() => GenreService.getAll(),
		{
			select: ({ data }) =>
				data.map(
					(genre): ISelectOptions => ({
						label: genre.name,
						value: genre._id,
					})
				),
			onError: (error) => {
				toastError(error, 'Genre List');
			},
		}
	);

	return queryData;
};
