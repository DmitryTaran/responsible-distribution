import { TemplateFieldNames, useTemplateFormContext } from 'entities/templates';
import { useGetPipelines } from 'entities/templates/swr/useGetPipelines';
import React, { ReactNode, useEffect, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { NativeSelect } from 'shared/components/native-select/NativeSelect';
import FormWrapper from 'shared/components/form-wrapper/FormWrapper';


const PipelineStatusSelect = (): JSX.Element => {

	const { getValues } = useTemplateFormContext();

	const { SUCCESS_STATUS_ID, SUCCESS_PIPELINE_ID } = TemplateFieldNames;

	const { data, isLoading } = useGetPipelines();

	const pipelineId = useWatch({ name: SUCCESS_PIPELINE_ID });

	const selectedPipeline = data?._embedded.pipelines.find(pipeline => String(pipeline.id) === String(pipelineId)) || data?._embedded?.pipelines[0];

	const statusesOptions = useMemo<Record<string, ReactNode>>(() =>
			selectedPipeline?._embedded.statuses.reduce((accum, { id, name }) => ({ ...accum, [id]: name }), {}) || {}
		, [ pipelineId, selectedPipeline ]);

	return (
		<>
			{!isLoading &&
                <FormWrapper
                    label={'Выберите успешно завершенный этап'}
                    fieldName={SUCCESS_STATUS_ID}
                    Component={NativeSelect}
                    rules={{
						required: true,
						validate: {
							isRightStatusSelected: (value) => Object.keys(statusesOptions).includes(String(value))
						}
					}}
                    options={statusesOptions}
                    disabled={!pipelineId}
                />
			}
		</>

	);
};

export default PipelineStatusSelect;