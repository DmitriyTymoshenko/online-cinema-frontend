import { FC } from 'react';

import Heading from '@/ui/heading/Heading';

import Meta from '@/utils/meta/Meta';

const Error500: FC = () => {
	return (
		<Meta title="Internal Server Error">
			<Heading title="500 | Internal Server Error" />
		</Meta>
	);
};

export default Error500;
