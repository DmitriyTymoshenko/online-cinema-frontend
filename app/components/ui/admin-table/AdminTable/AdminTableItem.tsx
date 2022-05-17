import { FC } from 'react';

import AdminActions from '@/ui/admin-table/AdminTable/AdminActoins/AdminActions';
import { IAdminTableItem } from '@/ui/admin-table/AdminTable/admin-table.interface';

import styles from './AdminTable.module.scss';

const AdminTableItem: FC<IAdminTableItem> = ({ removeHandler, tableItem }) => {
	return (
		<div className={styles.item}>
			{tableItem.items.map((val) => (
				<div key={val}>{val}</div>
			))}
			<AdminActions editUrl={tableItem.editUrl} removeHandler={removeHandler} />
		</div>
	);
};

export default AdminTableItem;
