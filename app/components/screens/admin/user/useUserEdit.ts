import { useRouter } from 'next/router';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { UserService } from '@/services/user.service';

import { toastError } from '@/utils/toast-error';

import { getAdminUrl } from '@/config/url.config';

import { IUserEditInput } from './user-edit.interface';

export const useUserEdit = (setValue: UseFormSetValue<IUserEditInput>) => {
	const { push, query } = useRouter();

	const userId = String(query.id);

	const { isLoading } = useQuery(
		['user edit admin', userId],
		() => UserService.getById(userId),
		{
			onSuccess: ({ data }) => {
				setValue('email', data.email);
				setValue('isAdmin', data.isAdmin);
			},

			onError: (e) => {
				toastError(e, 'Get User');
			},
			enabled: !!query.id,
		}
	);

	const { mutateAsync } = useMutation(
		'update user',
		(data: IUserEditInput) => UserService.update(userId, data),
		{
			onError: (e) => {
				toastError(e, 'Update User');
			},

			onSuccess: () => {
				toastr.success('Update User', 'update was successful');
				push(getAdminUrl('users'));
			},
		}
	);

	const onSubmit: SubmitHandler<IUserEditInput> = async (data) => {
		await mutateAsync(data);
	};

	return { onSubmit, isLoading };
};
