import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';

import Button from '@/ui/form-elements/Button';
import { ISlide } from '@/ui/slider/slider.interface';

import styles from './Slider.module.scss';

interface ISlideItem {
	slide: ISlide;
	buttonTitle?: string;
}

const SlideItem: FC<ISlideItem> = ({ slide, buttonTitle = 'Watch' }) => {
	const { push } = useRouter();

	return (
		<div className={styles.slide}>
			{slide.bigPoster && (
				<Image
					layout="fill"
					className={styles.image}
					alt={slide.title}
					draggable={false}
					unoptimized
					priority
					src={slide.bigPoster}
				/>
			)}

			<div className={styles.content}>
				<div className={styles.heading}>{slide.title}</div>
				<div className={styles.subHeading}>{slide.subTitle}</div>
				<Button onClick={() => push(slide.link)}>{buttonTitle}</Button>
			</div>
		</div>
	);
};

export default SlideItem;
