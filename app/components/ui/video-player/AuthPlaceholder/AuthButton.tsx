import Link from 'next/link';
import { FC } from 'react';

import Button from '@/ui/form-elements/Button';

import { getMovieUrl } from '@/config/url.config';

import styles from './AuthPlaceholder.module.scss';

const AuthButton: FC<{ slug: string }> = ({ slug }) => {
	return (
		<Link href={`/auth/?redirect=${getMovieUrl(slug)}`}>
			<Button className={styles.btn}>Sign in</Button>
		</Link>
	);
};

export default AuthButton;
