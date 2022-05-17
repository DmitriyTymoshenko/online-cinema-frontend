import { FC } from 'react';

import Button from '@/ui/form-elements/Button';

import { BaseLayoutProps } from '@/shared/types/global.types';

interface IAdminCreateButton extends BaseLayoutProps {
	onClick: () => void;
}

const AdminCreateButton: FC<IAdminCreateButton> = ({ onClick }) => {
	return <Button onClick={onClick}>Create new</Button>;
};

export default AdminCreateButton;
