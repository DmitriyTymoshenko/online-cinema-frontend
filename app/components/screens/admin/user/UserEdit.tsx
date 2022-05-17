import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { useUserEdit } from '@/screens/admin/user/useUserEdit';
import { IUserEditInput } from '@/screens/admin/user/user-edit.interface';
import AuthFields from '@/screens/auth/AuthFields';

import SkeletonLoader from '@/ui/SkeletonLoader';
import AdminNavigation from '@/ui/admin-navigation/AdminNavigation';
import Button from '@/ui/form-elements/Button';
import Heading from '@/ui/heading/Heading';

import Meta from '@/utils/meta/Meta';

const UserEdit: FC = () => {
	const { handleSubmit, register, formState, setValue, getValues, control } =
		useForm<IUserEditInput>({
			mode: 'onChange',
		});

	const { isLoading, onSubmit } = useUserEdit(setValue);
	return (
		<Meta title="Edit User">
			<AdminNavigation />
			<Heading title="Edit User" />
			<form onSubmit={handleSubmit(onSubmit)} className="admin-form">
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<AuthFields register={register} formState={formState} />

						<Controller
							control={control}
							name="isAdmin"
							render={({ field }) => (
								<button
									onClick={(e) => {
										e.preventDefault();
										field.onChange(!field.value);
									}}
									className="text-link text-white block mb-7"
								>
									{field.value ? 'Make is regular user' : 'Make it admin'}
								</button>
							)}
						/>

						<Button>Update</Button>
					</>
				)}
			</form>
		</Meta>
	);
};

export default UserEdit;
