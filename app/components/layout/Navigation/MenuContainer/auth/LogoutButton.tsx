import { FC } from 'react';

import MaterialIcon from '@/ui/MaterialIcon';

import { useActions } from '@/hooks/useActions';

const LogoutButton: FC = () => {
	const { logout } = useActions();

	const handleLogout = (e: any) => {
		e.preventDefault();
		logout();
	};
	return (
		<li>
			<a onClick={handleLogout}>
				<MaterialIcon name="MdLogout" />
				<span>Logout</span>
			</a>
		</li>
	);
};

export default LogoutButton;
