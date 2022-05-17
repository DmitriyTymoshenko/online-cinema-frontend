import { useRouter } from 'next/router';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { MovieService } from '@/services/movie.service';

import { getKeys } from '@/utils/object/getKeys';
import { toastError } from '@/utils/toast-error';

import { MOVIES_API } from '@/config/constants';
import { getAdminUrl } from '@/config/url.config';

import { IMovieEditInput } from './movie-edit.interface';

export const useMovieEdit = (setValue: UseFormSetValue<IMovieEditInput>) => {
	const { push, query } = useRouter();

	const movieId = String(query.id);

	const { isLoading } = useQuery(
		['movie', movieId],
		() => MovieService.getById(movieId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => {
					setValue(key, data[key]);
				});
			},

			onError: (e) => {
				toastError(e, 'Get Movie');
			},
			enabled: !!query.id,
		}
	);

	const { mutateAsync } = useMutation(
		'update movie',
		(data: IMovieEditInput) => {
			if (!data.videoUrl.includes(MOVIES_API))
				data.videoUrl = `${MOVIES_API}${data.videoUrl}`;
			return MovieService.update(movieId, data);
		},
		{
			onError: (e) => {
				toastError(e, 'Update Movie');
			},

			onSuccess: () => {
				toastr.success('Update Movie', 'update was successful');
				push(getAdminUrl('movies'));
			},
		}
	);

	const onSubmit: SubmitHandler<IMovieEditInput> = async (data) => {
		await mutateAsync(data);
	};

	return { onSubmit, isLoading };
};
