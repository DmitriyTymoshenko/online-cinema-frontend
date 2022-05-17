import { FC } from 'react';
import { useForm } from 'react-hook-form';

import AuthFields from '@/screens/auth/AuthFields';
import { IProfileInput } from '@/screens/profile/profile.interface';
import { useProfile } from '@/screens/profile/useProfile';

import SkeletonLoader from '@/ui/SkeletonLoader';
import Button from '@/ui/form-elements/Button';
import Heading from '@/ui/heading/Heading';

import Meta from '@/utils/meta/Meta';

import styles from './Profile.module.scss';

const ProfilePage: FC = () => {
	const { handleSubmit, register, formState, setValue } =
		useForm<IProfileInput>({
			mode: 'onChange',
		});

	const { onSubmit, isLoading } = useProfile(setValue);

	return (
		<Meta title="Profile">
			<Heading title="Profile" className="mb-6" />
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				{isLoading ? (
					<SkeletonLoader count={2} />
				) : (
					<AuthFields formState={formState} register={register} />
				)}
				<Button>Update Profile</Button>
			</form>
		</Meta>
	);
};

export default ProfilePage;
