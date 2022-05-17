import { FC } from 'react';

import { useActors } from '@/screens/admin/actors/useActors';

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation';
import AdminHeader from '@/ui/admin-table/AdminHeader/AdminHeader';
import AdminTable from '@/ui/admin-table/AdminTable/AdminTable';
import Heading from '@/ui/heading/Heading';

import Meta from '@/utils/meta/Meta';

const ActorList: FC = () => {
	const {
		handleSearch,
		isLoading,
		searchTerm,
		data,
		deleteAsync,
		createAsync,
	} = useActors();
	return (
		<Meta title="Actors">
			<AdminNavigation />
			<Heading title="Actors" />
			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>
			<AdminTable
				tableItems={data || []}
				removeHandler={deleteAsync}
				headerItems={['Name', 'CountMovies']}
				isLoading={isLoading}
			/>
		</Meta>
	);
};

export default ActorList;
