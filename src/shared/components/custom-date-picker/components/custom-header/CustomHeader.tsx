import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import LeftArrowSvg from 'shared/components/custom-date-picker/components/custom-header/LeftArrowSvg';
import RightArrowSvg from 'shared/components/custom-date-picker/components/custom-header/RightArrowSvg';
import { capitalizeFirstLetter } from 'shared/utils/helpers';
import cl from './customHeader.module.scss';

const CustomHeader = ({ date, increaseMonth, decreaseMonth }: ReactDatePickerCustomHeaderProps): JSX.Element => {

	const currentMonth = dayjs(date).locale('ru').format('MMMM');

	return (
		<div className={cl.headerContainer}>
			<div className={cl.header}>
				<div
					className={cl.arrow}
					onClick={decreaseMonth}
				>
					<LeftArrowSvg/>
				</div>
				<span className={cl.title}>
                    {capitalizeFirstLetter(currentMonth)}
					{' '}
					{dayjs(date).year()}
                </span>
				<div
					className={cl.arrow}
					onClick={increaseMonth}
				>
					<RightArrowSvg/>
				</div>
			</div>
		</div>
	);
};

export default CustomHeader;