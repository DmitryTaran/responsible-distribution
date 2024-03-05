import cn from 'classnames';
import React, { useState } from 'react';
import SmallFilterInput from 'shared/components/small-filter-input/SmallFilterInput';
import classes from 'shared/components/table-filter-menu/lib/styles/filter.module.scss';
import { FilterInputProps } from 'shared/components/table-filter-menu/lib/types/FilterInputProps';

const FilterInput = ({ matchValue, onChange, handleConfirm, handleCancel }: FilterInputProps<string>): JSX.Element => {

	return (
		<div className={classes['filter-container']}>
			<SmallFilterInput
				value={matchValue}
				handleCrossClick={handleCancel}
				onChange={onChange}
			/>
			<div
				className={cn(
					classes['confirm-text'],
					Boolean(matchValue) && classes['confirm-text-active'],
				)}
				onClick={() => handleConfirm(matchValue)}
			>
				Применить
			</div>
		</div>
	);
};

export default FilterInput;