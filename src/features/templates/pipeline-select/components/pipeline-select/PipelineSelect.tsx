import {
	DistributionTypes,
	SUCCESS_STATUS_ID_VALUE,
	TemplateFieldNames,
	useTemplateFormContext
} from 'entities/templates';
import { useGetPipelines } from 'entities/templates/swr/useGetPipelines';
import React, { ReactNode, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import CollapsableText from 'shared/components/collapsable-text/CollapsableText';
import Title from 'shared/components/title/Title';
import FormCardLayout from 'widgets/templates/template-form/components/form-card-layout/FormCardLayout';
import {
	PipelineSelectHint,
	SubtitleHiddenText,
	SubtitlePreviewText
} from 'features/templates/pipeline-select/lib/consts';
import PipelineStatusSelect
	from 'features/templates/pipeline-select/components/pipeline-status-select/PipelineStatusSelect';
import classes from './pipelineSelect.module.scss';
import FormWrapper from 'shared/components/form-wrapper/FormWrapper';
import { NativeSelect } from 'shared/components/native-select/NativeSelect';

export const PipelineSelect = (): JSX.Element => {

	const { SUCCESS_PIPELINE_ID, DISTRIBUTION_TYPE, SUCCESS_STATUS_ID } = TemplateFieldNames;

	const { setValue } = useTemplateFormContext();

	const distributionType = useWatch({ name: DISTRIBUTION_TYPE });

	const { data: pipelineData, isLoading } = useGetPipelines();

	const pipelinesOptions = useMemo<Record<string, ReactNode>>(() => {
		const pipelines = pipelineData?._embedded?.pipelines;
		return pipelines?.reduce((accum, { id, name }) => {
			return { ...accum, [id]: name };
		}, {}) || {};
	}, [ pipelineData ]);

	return (
		<>
			{distributionType === DistributionTypes.CONVERSION &&
                <FormCardLayout
                    styles={{ card: { paddingRight: '112px' } }}
                    title={
						<Title
							text={'Параметры расчета конверсии'}
							subtitle={<CollapsableText
								textPreview={SubtitlePreviewText}
								textHidden={SubtitleHiddenText}
							/>}
						/>}
                >
					{!isLoading &&
                        <>
                            <FormWrapper
                                label={'Выберите воронку'}
                                fieldName={SUCCESS_PIPELINE_ID}
                                Component={NativeSelect}
                                rules={{ required: true }}
                                options={pipelinesOptions}
                                additionalFormChange={() => {
									setValue(SUCCESS_STATUS_ID, SUCCESS_STATUS_ID_VALUE);
								}}
                            />
                            <PipelineStatusSelect/>
                        </>
					}
                    <div className={classes.hint}>
						{PipelineSelectHint}
                    </div>
                </FormCardLayout>
			}
		</>
	);
};
