import Link from 'next/link';
import { FC, Fragment } from 'react';

import { IContentList } from '@/screens/single-movie/Content/content.interface';

import styles from './ContentList.module.scss';

const ContentList: FC<IContentList> = ({ links, name }) => {
	return (
		<div className={styles.list}>
			<div className={styles.name}>{name}</div>
			<div className={styles.links}>
				{links.map((link, i) => (
					<Fragment key={i}>
						<Link href={link.link}>
							<a>{link.title}</a>
						</Link>
						{i + 1 !== links.length ? ', ' : ''}
					</Fragment>
				))}
			</div>
		</div>
	);
};

export default ContentList;
