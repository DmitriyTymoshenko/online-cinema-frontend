import { useQuery } from 'react-query';

import { ISelectOptions } from '@/components/ui/select/select.interface';

import { ActorService } from '@/services/actor.service';

import { toastError } from '@/utils/toast-error';

export const useAdminActors = () => {
	const queryData = useQuery(
		'Get admin list of actors',
		() => ActorService.getAll(),
		{
			select: ({ data }) =>
				data.map(
					(actor): ISelectOptions => ({
						label: actor.name,
						value: actor._id,
					})
				),
			onError: (error) => {
				toastError(error, 'Actor List');
			},
		}
	);

	return queryData;
};
