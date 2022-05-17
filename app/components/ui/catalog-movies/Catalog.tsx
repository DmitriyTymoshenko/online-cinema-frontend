import { FC } from 'react';

import { ICatalog } from '@/ui/catalog-movies/catalog.interface';
import GalleryItem from '@/ui/gallery/GalleryItem';
import Description from '@/ui/heading/Description';
import Heading from '@/ui/heading/Heading';

import Meta from '@/utils/meta/Meta';

import { getMovieUrl } from '@/config/url.config';

import styles from './Catalog.module.scss';

const Catalog: FC<ICatalog> = ({ title, description, movies }) => {
	return (
		<Meta title={title} description={description}>
			<Heading title={title} className={styles.heading} />
			{description && (
				<Description text={description} className={styles.description} />
			)}

			<section className={styles.movies}>
				{movies.map((m) => (
					<GalleryItem
						key={m._id}
						item={{
							name: m.title,
							link: getMovieUrl(m.slug),
							posterPath: m.bigPoster,
							content: {
								title: m.title,
							},
						}}
						variant="horizontal"
					/>
				))}
			</section>
		</Meta>
	);
};

export default Catalog;
