import { IMenu } from './menu.interface';

export const firstMenu: IMenu = {
	title: 'Menu',
	items: [
		{
			icon: 'MdHome',
			link: '/',
			title: 'Home',
		},
		{
			icon: 'MdOutlineCompassCalibration',
			link: '/genres',
			title: 'Discovery',
		},
		{
			icon: 'MdRefresh',
			link: '/fresh',
			title: 'Fresh Movies',
		},
		{
			icon: 'MdLocalFireDepartment',
			link: '/trending',
			title: 'Trending Now',
		},
	],
};

export const userMenu: IMenu = {
	title: 'General',
	items: [],
};
