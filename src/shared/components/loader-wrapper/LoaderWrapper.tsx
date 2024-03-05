import React, { ReactNode } from 'react';

type LoaderWrapperProps = {
	isLoading: boolean;
	preloader: ReactNode;
	children: ReactNode
};

const LoaderWrapper = ({ isLoading, preloader, children }: LoaderWrapperProps): ReactNode => {
	if (isLoading) {
		return preloader;
	}
	return (
		<>{children}</>
	);
};

export default LoaderWrapper;
