import { TitleProps } from '../../../shared/components/title/Title';
import { PagesKeys } from '../../../widgets/sidebar/lib/types';

export type Pages = {
	[key in PagesKeys]: {
		page: JSX.Element,
		title: TitleProps
	}
}