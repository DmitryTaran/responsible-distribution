import { useCallback } from 'react';
import { TemplateFieldNames } from '../consts/templateFieldNames';
import { UserSettingRDO, UserSettingDTO } from '../types';
import { useTemplateFormContext } from './aliases';
import { FieldPath, FieldValues, PathValue, useFormContext } from 'react-hook-form';


type userRecountManagersWeightReturn = {
	resetManagersWeights: (managers: UserSettingDTO[], value?: number) => void
}

export const useResetManagersWeight = <T extends FieldValues>(fieldName: FieldPath<T>): userRecountManagersWeightReturn => {
	const { setValue } = useFormContext<T>();

	const resetManagersWeights = useCallback((managers: UserSettingDTO[], value?: number) => {
		return managers.forEach(({ weight }, index) =>
			setValue(`${fieldName}.${index}.weight` as FieldPath<T>, (value ?? weight) as PathValue<T, FieldPath<T>>),
		);
	}, [ setValue ]);

	return { resetManagersWeights };
};