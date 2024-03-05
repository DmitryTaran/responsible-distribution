import {
	RedistributionSoundsNames,
	TemplateFieldNames,
} from 'entities/templates';

export const soundEffectsOptions = Object.entries(
	RedistributionSoundsNames
).map(([id, name]) => ({ id, name }));

export const RedistributionSelectSettings = {
	[TemplateFieldNames.SOUND_EFFECT]: {
		options: RedistributionSoundsNames,
		label: 'Звуковое сопровождение',
		name: TemplateFieldNames.SOUND_EFFECT,
		width: '400px',
	},
} as const;

export const SoundEffectSelectObject = {
	options: RedistributionSoundsNames,
	fieldName: TemplateFieldNames.SOUND_EFFECT,
	label: 'Звуковое сопровождение',
};
