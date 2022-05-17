import cn from 'classnames';
import { FC } from 'react';

import MaterialIcon from '@/ui/MaterialIcon';
import button from '@/ui/form-elements/Button';

import styles from './SlideArrow.module.scss';

interface ISlideArrow {
	variant: 'left' | 'right';
	clickHandler: () => void;
}

const SlideArrow: FC<ISlideArrow> = ({ variant, clickHandler }) => {
	const isLeft = variant === 'left';

	return (
		<button
			className={cn(styles.arrow, {
				[styles.left]: isLeft,
				[styles.right]: !isLeft,
			})}
			onClick={clickHandler}
			aria-label={isLeft ? 'Slide-left' : 'Slide-right'}
		>
			<MaterialIcon name={isLeft ? 'MdChevronLeft' : 'MdChevronRight'} />
		</button>
	);
};

export default SlideArrow;
