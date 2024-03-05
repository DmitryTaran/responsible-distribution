import { useFormContext } from 'react-hook-form';
import { WorkSchedule } from 'entities/work-schedule';
import { useConditionalForm } from 'shared/hooks/useConditionalForm';
import { WorkScheduleDTO } from 'entities/work-schedule/types';

export const useWorkScheduleFormContext = useFormContext<WorkScheduleDTO>;

export const useWorkScheduleConditionalForm = useConditionalForm<WorkSchedule>;