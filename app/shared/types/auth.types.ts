import { NextPage } from 'next';

import { BaseLayoutProps } from './global.types';

export type TypeRoles = {
	isOnlyAdmin?: boolean;
	isOnlyUser?: boolean;
};

export type NextPageAuth<P = {}> = NextPage<P> & TypeRoles;

export type TypeComponentAuthFields = {
	Component: TypeRoles;
} & BaseLayoutProps;
