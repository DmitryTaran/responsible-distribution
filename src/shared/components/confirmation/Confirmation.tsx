import { Dialog } from '@mui/material';
import classes from './confirm-window.module.scss';
import cn from 'classnames';
import React from 'react';
import CircleCrossSvg from 'shared/svg/circle-cross/CircleCrossSvg';

type DeleteConfirmationProps = {
	open: boolean;
	setOpen: React.Dispatch<boolean>;
	handleYes: () => void;
	text: {
		title: string;
		subtitle: string;
		description: string;
	};
};

const Confirmation = ({
	handleYes,
	open,
	setOpen,
	text,
}: DeleteConfirmationProps): JSX.Element => {
	const handleCloseModal = (): void => setOpen(false);
	const handleConfirm = (): void => {
		handleYes();
		setOpen(false);
	};
	return (
		<Dialog open={open} onClose={handleCloseModal}>
			<div className={classes['confirm__wrapper']}>
				<button
					onClick={handleCloseModal}
					className={classes['confirm__close-btn']}
				>
					<CircleCrossSvg
						className={classes['confirm__close-btn-icon']}
					/>
				</button>
				<div className={classes['confirm__description-wrapper']}>
					<p className={classes['confirm__title']}>{text.title}</p>
					<p className={classes['confirm__description-subtitle']}>
						{text.subtitle}
					</p>
					<p className={classes['confirm__description-subtitle']}>
						{text.description}
					</p>
				</div>
				<div className={classes['confirm__buttons-wrapper']}>
					<button
						onClick={handleConfirm}
						className={cn(
							classes['confirm__button'],
							classes['confirm__button_delete']
						)}
					>
						Подтвердить
					</button>
					<button
						onClick={handleCloseModal}
						className={classes['confirm__button']}
					>
						Отменить
					</button>
				</div>
			</div>
		</Dialog>
	);
};

export default Confirmation;
