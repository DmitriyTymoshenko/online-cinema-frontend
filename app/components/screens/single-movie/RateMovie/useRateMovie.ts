import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { useAuth } from '@/hooks/useAuth';

import { RatingService } from '@/services/rating.service';

import { toastError } from '@/utils/toast-error';

export const useRateMovie = (movieId: string) => {
	const [rating, setRating] = useState(0);
	const [isSend, setIsSend] = useState(false);
	const { user } = useAuth();
	const { refetch } = useQuery(
		['your movie rating', movieId],
		() => RatingService.asyncGetByUserMovie(movieId),
		{
			onSuccess: ({ data }) => {
				setRating(data);
			},

			onError: (e) => {
				toastError(e, 'Get Rating');
			},
			enabled: !!movieId && !!user,
		}
	);

	const { mutateAsync } = useMutation(
		'set rating movie',
		({ value }: { value: number }) => RatingService.setRating(movieId, value),
		{
			onError: (e) => {
				toastError(e, 'Update Rating');
			},

			onSuccess: async () => {
				toastr.success('Update Rating', 'update was successful');
				setIsSend(true);
				await refetch();
				setTimeout(() => {
					setIsSend(false);
				}, 2400);
			},
		}
	);

	const handleClick = async (nextValue: number) => {
		setRating(nextValue);
		await mutateAsync({ value: nextValue });
	};

	return { isSend, handleClick, rating };
};
