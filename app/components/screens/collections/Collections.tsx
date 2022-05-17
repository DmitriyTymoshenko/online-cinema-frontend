import { FC } from 'react';

import Description from '@/components/ui/heading/Description';

import CollectionItem from '@/screens/collections/CollectionItem';
import { ICollection } from '@/screens/collections/collections.interface';

import Heading from '@/ui/heading/Heading';

import Meta from '@/utils/meta/Meta';

import styles from './Collections.module.scss';

const Collections: FC<{ collections: ICollection[] }> = ({ collections }) => {
	return (
		<Meta
			title="Discovery"
			description="In this collection you will find all genres on our site"
		>
			<Heading title="Discovery" />
			<Description
				text="In this collection you will find all genres on our site"
				className={styles.heading}
			/>
			<section className={styles.collections}>
				{collections.map((c) => (
					<CollectionItem key={c._id} collection={c} />
				))}
			</section>
		</Meta>
	);
};

export default Collections;
