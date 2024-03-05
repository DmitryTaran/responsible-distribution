import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDebounce } from 'shared/hooks/useDebounce';
import CustomPopper from 'shared/components/custom-popper/CustomPopper';
import { normalizeString } from 'shared/utils/helpers';
import { ManagerDTO } from 'entities/managers';
import zIndex from '@mui/material/styles/zIndex';
import classes from './userSelectorSearch.module.scss';


type UserSelectorSearchProps = {
	selectableManagers: ManagerDTO[]
	onManagersAppend: (managers: ManagerDTO[]) => void
}

const UserSelectorSearch = ({ selectableManagers, onManagersAppend }: UserSelectorSearchProps): JSX.Element => {

	const [ search, setSearch ] = useState('');

	const debouncedSearch = useDebounce(normalizeString(search), 500);

	const searchedSelectableManagers = useMemo(() => {
		return debouncedSearch
			? selectableManagers.filter(({ userName }) => normalizeString(userName).includes(debouncedSearch))
			: [];
	}, [ debouncedSearch, selectableManagers ]);


	useEffect(() => {
		debouncedSearch
			? setAnchor(inputRef.current)
			: setAnchor(null);
	}, [ debouncedSearch ]);

	const [ anchor, setAnchor ] = useState<null | HTMLInputElement>(null);

	const inputRef = useRef<null | HTMLInputElement>(null);

	const handleSearchFocus = (): void => {
		if (debouncedSearch) {
			setAnchor(inputRef.current);
		}
	};

	const handleSelectItemClick = (manager: ManagerDTO) => {
		onManagersAppend([ manager ])
		setAnchor(null)
		setSearch('')
	}

	return (
		<>
			<input
				ref={inputRef}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder={'Поиск'}
				className={classes['search-input']}
				type="text"
				onFocus={handleSearchFocus}
			/>
			<CustomPopper
				anchor={anchor}
				setAnchor={setAnchor}
				placement={'bottom'}
				zIndex={zIndex.drawer + 1}
				disablePortal
			>
				<div className={classes['select']} style={{ width: inputRef.current?.offsetWidth }}>
					{searchedSelectableManagers.map((manager) =>
						<div
							key={manager.id}
							className={classes['select-item']}
							onClick={() => handleSelectItemClick(manager)}
						>
							{manager.userName}
						</div>
					)}
				</div>
			</CustomPopper>
		</>
	);
};

export default UserSelectorSearch;