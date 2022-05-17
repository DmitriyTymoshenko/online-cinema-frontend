import { useRouter } from 'next/router';
import { ChangeEvent, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface';

import { useDebounce } from '@/hooks/useDebounce';

import { ActorService } from '@/services/actor.service';
import { GenreService } from '@/services/genre.service';

import { toastError } from '@/utils/toast-error';

import { getAdminUrl } from '@/config/url.config';

export const useActors = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearch = useDebounce(searchTerm, 500);
	const { push } = useRouter();
	const queryData = useQuery(
		['actors list', debouncedSearch],
		() => ActorService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(actor): ITableItem => ({
						_id: actor._id,
						editUrl: getAdminUrl(`actor/edit/${actor._id}`),
						items: [actor.name, String(actor.countMovies)],
					})
				),
			onError: (error) => {
				toastError(error, 'Actor List');
			},
		}
	);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};
	const { mutateAsync: createAsync } = useMutation(
		'create actor',
		() => ActorService.create(),
		{
			onError: (error) => {
				toastError(error, 'Create actor');
			},
			onSuccess: ({ data: _id }) => {
				push(getAdminUrl(`actor/edit/${_id}`));
			},
		}
	);

	const { mutateAsync: deleteAsync } = useMutation(
		'delete actor',
		(actorid: string) => ActorService.delete(actorid),
		{
			onError: (error) => {
				toastError(error, 'Delete actor');
			},
			onSuccess: () => {
				toastr.success('Delete actor', 'delete was successful');
				queryData.refetch();
			},
		}
	);
	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync,
			createAsync,
		}),
		[queryData, searchTerm, deleteAsync, createAsync]
	);
};
