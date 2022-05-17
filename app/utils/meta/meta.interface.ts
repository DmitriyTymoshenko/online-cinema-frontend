import { BaseLayoutProps } from '@/shared/types/global.types';

export interface ISeo extends BaseLayoutProps {
	title: string;
	description?: string;
	image?: string;
}
