import { ChangeEvent, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface';

import { useDebounce } from '@/hooks/useDebounce';

import { UserService } from '@/services/user.service';

import { convertMongoDate } from '@/utils/date/converMongoDbDate';
import { toastError } from '@/utils/toast-error';

import { getAdminUrl } from '@/config/url.config';

export const useUsers = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearch = useDebounce(searchTerm, 500);

	const queryData = useQuery(
		['users list', debouncedSearch],
		() => UserService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(user): ITableItem => ({
						_id: user._id,
						editUrl: getAdminUrl(`/user/edit/${user._id}`),
						items: [
							user.email,
							convertMongoDate(user.createdAt),
							String(user.isAdmin),
						],
					})
				),
			onError: (error) => {
				toastError(error, 'User List');
			},
		}
	);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const { mutateAsync: deleteAsync } = useMutation(
		'delete user',
		(userid: string) => UserService.deleteUser(userid),
		{
			onError: (error) => {
				toastError(error, 'Delete user');
			},
			onSuccess: () => {
				toastr.success('Delete user', 'delete was successful');
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
		}),
		[queryData, searchTerm, deleteAsync]
	);
};
