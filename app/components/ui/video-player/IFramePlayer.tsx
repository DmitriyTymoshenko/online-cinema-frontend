import cn from 'classnames';
import { FC } from 'react';

import AuthPlaceholder from '@/ui/video-player/AuthPlaceholder/AuthPlaceholder';

import { useAuth } from '@/hooks/useAuth';

import { IMovie } from '@/shared/types/movie.types';

import styles from './VideoPlayer.module.scss';

const IFramePlayer: FC<{ movie: IMovie }> = ({ movie }) => {
	const { user } = useAuth();
	return (
		<div
			className={cn('flex justify-center mt-12', styles.wrapper, {
				'h-96': !user,
			})}
		>
			{user ? (
				<iframe
					src={movie.videoUrl}
					width="640"
					height="480"
					frameBorder="0"
					allowFullScreen
				/>
			) : (
				<AuthPlaceholder slug={movie.slug} />
			)}
		</div>
	);
};

export default IFramePlayer;
