import { useRouter } from 'next/router';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { IProfileInput } from '@/screens/profile/profile.interface';

import { UserService } from '@/services/user.service';

import { getKeys } from '@/utils/object/getKeys';
import { toastError } from '@/utils/toast-error';

import { getAdminUrl } from '@/config/url.config';

export const useProfile = (setValue: UseFormSetValue<IProfileInput>) => {
	const { isLoading } = useQuery('Profile', () => UserService.getProfile(), {
		onSuccess: ({ data }) => {
			setValue('email', data.email);
		},

		onError: (e) => {
			toastError(e, 'Get Profile');
		},
	});

	const { mutateAsync } = useMutation(
		'update profile',
		(data: IProfileInput) => UserService.updateProfile(data),
		{
			onError: (e) => {
				toastError(e, 'Update Profile');
			},

			onSuccess: () => {
				toastr.success('Update Profile', 'update was successful');
			},
		}
	);

	const onSubmit: SubmitHandler<IProfileInput> = async (data) => {
		await mutateAsync(data);
	};

	return { onSubmit, isLoading };
};
